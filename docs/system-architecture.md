# Nexa — System Architecture & Component Boundaries

This document defines the high-level system architecture, component boundaries, trust security model, state ownership rules, database schemas, and integration patterns for **Nexa**.

---

## 1. High-Level Architecture Diagram

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                             BROWSER (CLIENT)                             │
│                                                                          │
│  Next.js 15 (React 19 / App Router)                                      │
│  - Workspace Editor UI        - AI Action Toolbar & Controls             │
│  - Chat Drawer UI             - Human-in-the-Loop Review Panel           │
│  - File Upload Handler        - Transient UI State (Unsaved Drafts)      │
│  - Stream Rendering Engine    - Accessible Error & Loading States        │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │ HTTPS / WSS (TLS 1.3)
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                            SERVER (API LAYER)                            │
│                                                                          │
│  Next.js Server / API Routes & Edge Runtime                              │
│  - Session Authentication         - Prompt Construction & Guardrails     │
│  - Authorization / RLS Enforcer  - Vercel AI SDK Provider Abstraction     │
│  - Input Sanitization & Zod       - File Extraction (PDF/TXT Parsing)    │
│  - Token Rate Limiting            - Output Schema Validation             │
└───────────────────┬──────────────────────────────────┬───────────────────┘
                    │                                  │
                    ▼                                  ▼
┌───────────────────────────────────────┐  ┌───────────────────────────────┐
│              AI PROVIDER              │  │           DATABASE            │
│                                       │  │                               │
│ Vercel AI SDK → OpenAI (gpt-4o)       │  │ Supabase / PostgreSQL         │
│ (Swappable: Anthropic / Gemini /      │  │ - Row Level Security (RLS)    │
│ Self-hosted models)                   │  │ - Users & Profiles            │
│                                       │  │ - Workspaces & Documents      │
│ - Summarization & Rewriting           │  │ - Conversations & Messages    │
│ - Action Item & Task Extraction       │  │ - AI Outputs & Audits         │
│ - Grounded Q&A Streaming              │  │ - User Preferences            │
└───────────────────────────────────────┘  └───────────────────────────────┘
```

---

## 2. Component Boundaries & Responsibilities

### A. Browser (Client Layer)
**Responsibilities:**
- Rendering interactive UI components, animations, and typography.
- Managing local transient state (active tab, expanded drawers, form inputs).
- Capturing user actions and text highlighting.
- Managing client-side stream consumption (`useChat`, `useCompletion` from Vercel AI SDK).
- Handling optimistic UI updates and local draft preservation.
- Performing preliminary client validation (file extension, file size limits).

**STRICT FORBIDDEN LIST (Must NEVER exist in the Browser):**
- OpenAI, Anthropic, or LLM API keys.
- Supabase Service Role Keys or database credentials.
- Private service credentials or secrets.
- Trusted authorization checks (client-side boolean checks are UI hints only).
- Raw backend stack traces or internal server error details.

---

## 3. Trust Model & Security Guardrails

Every interaction crossing a boundary must respect the **Nexa Trust Model**:

```text
Browser       = Untrusted Environment (User can manipulate any JS state/payload)
Server        = Trusted Application Layer (Enforces rules, secrets, & permissions)
User Content  = Untrusted Input (May contain prompt injection attempts)
AI Output     = Untrusted Generated Content (May hallucinate or contain invalid formatting)
Database      = Protected Persistent Storage (Enforces Row Level Security)
```

### Trust Boundary Rules
1. **Never trust client payloads:** All parameters (`workspaceId`, `documentText`, `actionType`) received by API routes must be parsed and validated using **Zod** schemas.
2. **Never trust AI model output:** Model output must be parsed via Zod or validated before persistence. AI outputs must never execute raw HTML/JS (prevent stored XSS).
3. **Prompt Injection Defense:** User-supplied document text is demarcated inside system prompts using strict delimiters (e.g. `<document_context>...</document_context>`) accompanied by system instructions explicitly directing the model to ignore inline commands within the document text.
4. **Server-Side Secret Isolation:** All API keys are loaded via standard `process.env` in server contexts only. No `NEXT_PUBLIC_` prefix is ever used for private credentials.

---

## 4. Server Layer Architecture & Vercel AI SDK Integration

The server orchestrates AI calls using the **Vercel AI SDK** as an abstraction layer:

```text
Nexa API Route (`/api/ai/action`)
            ↓
    Zod Input Validation
            ↓
  Session Auth Check (Supabase Auth)
            ↓
  Context Assembly & System Prompting
            ↓
  Vercel AI SDK Abstraction Layer (`streamText` / `generateObject`)
            ↓
┌───────────────────────────────────────────────────────┐
│               Configured AI Model Adapter             │
├───────────────────────────────────────────────────────┤
│ Primary: openai('gpt-4o-mini')                        │
│ Fallback: anthropic('claude-3-5-sonnet-20240620')     │
└───────────────────────────┬───────────────────────────┘
                            ↓
             Streamed Server Response to Client
```

### Why Vercel AI SDK?
- **Provider Agnostic:** Changing providers requires updating only the backend configuration parameter without modifying any client components.
- **Built-in Streaming:** Standardized SSE (Server-Sent Events) streaming protocols out of the box.
- **Structured Outputs:** Seamless integration with Zod schemas via `generateObject` for deterministic task extraction.

---

## 5. Database Schema & Persistence Strategy

Nexa uses PostgreSQL (via Supabase) with **Row Level Security (RLS)** enabled on all tables.

```text
       User (auth.users)
          │
          ├── Profiles (1:1)
          │
          ├── Workspaces (1:N)
          │      │
          │      ├── Documents (1:N)
          │      │
          │      ├── Conversations (1:N)
          │      │      └── Messages (1:N)
          │      │
          │      └── AI_Outputs (1:N)
          │
          └── Preferences (1:1)
```

### Core Entity Definitions

#### `workspaces`
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key -> auth.users)
- `title` (text)
- `description` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `documents`
- `id` (uuid, primary key)
- `workspace_id` (uuid, foreign key -> workspaces)
- `title` (text)
- `content` (text)
- `file_type` (text, e.g. 'txt', 'pdf', 'pasted')
- `created_at` (timestamp)

#### `conversations` & `messages`
- `conversations`: `id`, `workspace_id`, `title`, `created_at`
- `messages`: `id`, `conversation_id`, `sender` ('user' | 'assistant'), `content` (text), `created_at`

#### `ai_outputs` (Saved Human-Approved Suggestions)
- `id` (uuid, primary key)
- `workspace_id` (uuid, foreign key -> workspaces)
- `action_type` (text, e.g. 'summarize', 'extract_tasks')
- `original_text_snippet` (text)
- `generated_content` (text)
- `user_edited_content` (text, nullable)
- `status` ('approved' | 'edited' | 'archived')
- `created_at` (timestamp)

---

## 6. State-Management Architecture

State in Nexa is governed by strict ownership rules:

```text
Does the state only affect current UI display (modals, tabs, drawer states)?
  └─► REACT LOCAL STATE (`useState`, `useReducer`)

Is it fetched from or saved to the backend (workspaces, documents, saved outputs)?
  └─► SERVER STATE (TanStack Query / Server Components)

Does it control active user session or authentication?
  └─► AUTH CONTEXT (Supabase Auth Listener)

Is it an actively generating AI stream?
  └─► AI GENERATION STATE MACHINE (`idle` → `submitting` → `generating` → `streaming` → `completed`)
```

### AI Generation State Machine

```text
              [ User Action ]
                    │
                    ▼
                 ( IDLE )
                    │
           Submit Request Payload
                    │
                    ▼
             ( SUBMITTING )
                    │
            Server Connection Established
                    │
                    ▼
             ( GENERATING )
                    │
           First Stream Token Received
                    │
                    ▼
              ( STREAMING )
                    │
       ┌────────────┴────────────┐
       ▼                         ▼
 Stream Completed          Error Occurred / Cancelled
       │                         │
       ▼                         ▼
  ( COMPLETED )               ( ERROR )
       │                         │
   Human Review              User Clicks Retry
   (Accept/Edit/Reject)          │
       │                         │
       └─────────────────────────┘
```
