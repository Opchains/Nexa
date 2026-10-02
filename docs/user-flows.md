# Nexa — Detailed User & System Interaction Flows

This document details all primary user journeys, interactive flows, human review loops, failure recovery modes, and state transitions within **Nexa**.

---

## 1. Main Workspace Flow

The Main Workspace flow is the core entry point where users supply content and initialize AI operations.

```text
User Opens Nexa Application
            ↓
  [Workspace View Rendered]
            ↓
┌──────────────────────────────────────┐
│  Has Active Workspace Selected?      │
└──────────────────┬───────────────────┘
         ┌─────────┴─────────┐
        YES                  NO
         │                   │
         ▼                   ▼
 Load Workspace      Create New Workspace /
 Content & State     Prompt Content Entry
         │                   │
         └─────────┬─────────┘
                   ↓
┌──────────────────────────────────────┐
│     User Provides Source Content     │
├──────────────────┬───────────────────┤
│ Option A: Paste  │ Option B: Drag &  │
│ Raw Text         │ Drop Supported    │
│ Into Editor      │ File (PDF/TXT/MD) │
└──────────────────┴───────────────────┘
                   ↓
      Client-Side Content Validation
 (Non-empty, character limit check, format check)
                   ↓
      Content Ready in Workspace State
                   ↓
┌──────────────────────────────────────┐
│     User Triggers AI Operation       │
├──────────────────────────────────────┤
│ 1. Select Assistive Action (Summarize│
│    Explain, Rewrite, Extract, etc.) │
│ 2. OR Type Question in Chat Input    │
└──────────────────┬───────────────────┘
                   ↓
    Server Processes & Streams AI Output
                   ↓
   Generated Suggestion Appears in Preview
                   ↓
      Human Review & Approval Loop
   (Accept / Edit / Regenerate / Reject)
                   ↓
       Save Finalized Result to State
```

---

## 2. AI Chat Flow (Document-Grounded Q&A)

Nexa distinguishes between document-grounded conversation and general Q&A.

```text
User Focuses Chat Panel in Workspace
                 ↓
┌──────────────────────────────────────────────┐
│       Is Document Content Available?         │
└──────────────────────┬───────────────────────┘
           ┌───────────┴───────────┐
          YES                      NO
           │                       │
           ▼                       ▼
 Attach Active Document    Set Context to General
 Context to Payload        Assistant Mode
           │                       │
           └───────────┬───────────┘
                       ↓
            User Submits Question
                       ↓
  Client Renders Optimistic User Message Bubble
  Sets AI Generation State to `submitting`
                       ↓
  HTTPS POST `/api/chat` with Context Payload
                       ↓
  Server Validates Session & Token Budget
                       ↓
  Server Constructs Grounded Prompt System Message
                       ↓
  Stream Token Stream via Vercel AI SDK
                       ↓
  Client State Transitions to `streaming`
  Renders Markdown Chunk-by-Chunk
                       ↓
  Stream Closes → State Transitions to `completed`
                       ↓
┌──────────────────────────────────────────────┐
│            User Review Options               │
├──────────────────────────────────────────────┤
│ - Copy Answer                                │
│ - Save Answer to Workspace Notes             │
│ - Ask Follow-Up Question                     │
└──────────────────────────────────────────────┘
```

---

## 3. Assistive Action Flow (Summarize, Explain, Rewrite, Extract)

Assistive actions operate on either the entire active workspace text or a user-selected text snippet.

```text
User Highlights Text or Selects Full Document
                      ↓
User Selects Action Pill from AI Action Bar
  [Summarize | Explain | Rewrite | Extract Actions | Simplify]
                      ↓
┌──────────────────────────────────────────────┐
│      Action Options Modal / Sub-menu         │
├──────────────────────────────────────────────┤
│ - Tone / Length selection (e.g. Concise)     │
│ - Custom prompt overlay (Optional)           │
└──────────────────────┬───────────────────────┘
                       ↓
             User Confirms Action
                       ↓
Client sends Request:
Payload: { action: "rewrite", text: selectedText, options: { tone: "professional" } }
                       ↓
Server Constructs Guardrailed Prompt Schema
                       ↓
AI Provider Returns Structured or Streamed Response
                       ↓
Suggested Result Appears in AI Suggestion Card
```

---

## 4. Human Review & Approval Flow

This flow enforces the core **Human-in-the-Loop** architectural rule.

```text
AI Generates Output Suggestion
              ↓
Render Suggestion Card in "Pending Review" State
Original Content Remains Completely Unaltered
              ↓
┌─────────────────────────────────────────────────────────────┐
│                   Human Review Actions                      │
└──────────────────────────────┬──────────────────────────────┘
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
     [ACCEPT]               [EDIT]            [REGENERATE]
          │                    │                    │
          │             Open Inline Text     Attach Feedback
          │             Editor for User      & Request New
          │             Adjustments          Suggestion
          │                    │                    │
          └────────────────────┼────────────────────┘
                               ↓
                         [SAVE RESULT]
                               ↓
            Persist to Document / Saved Output Log
```

---

## 5. File Upload Flow & Edge Cases

The file upload flow validates files strictly on both client and server before extracting context.

```text
User Drag-and-Drops File into Upload Zone
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                 Client-Side File Validation                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Extension check (.txt, .md, .pdf, .docx, .json)          │
│ 2. File size check (Max 10MB)                               │
└──────────────────────────────┬──────────────────────────────┘
           ┌───────────────────┴───────────────────┐
         PASS                                    FAIL
           │                                       │
           ▼                                       ▼
  Send File via POST                      Show Instant Error:
  `/api/workspace/upload`                 "Invalid Format / Size"
           │                                       │
           ▼                                       └──── [End]
  Server Validation & Sanitization
           │
 ┌─────────┴────────────────────────────────────────┐
 │            Server Processing Checks              │
 ├───────────┬──────────────┬──────────────┬────────┤
 │ Corrupted │ Unsupported  │ Exceeds Size │ Valid  │
 │ File      │ Format       │ Limit        │ File   │
 └─────┬─────┴──────┬───────┴──────┬───────┴───┬────┘
       │            │              │           │
       ▼            ▼              ▼           ▼
  Return 400   Return 415     Return 413   Extract Text &
  "Corrupted"  "Unsupported"  "Too Large"  Clean Metadata
       │            │              │           │
       └────────────┴──────┬───────┘           │
                           ▼                   ▼
                   Display Safe Error     Return Extracted
                   Message with Reset     Text to Workspace
                   Control                State
```

---

## 6. Failure & Fallback Flows

Nexa is resilient to network glitches, provider outages, and invalid output structures.

### A. Network Failure Flow
```text
User Triggers AI Request
          ↓
Network Connection Drops / Timeout
          ↓
Client Catches Fetch Exception
          ↓
Transition AI State: `generating` → `error`
          ↓
Preserve User Input & Editor State Intact
          ↓
Display Banner: "Network disconnected. Your input is preserved."
          ↓
Provide [Retry Request] Button
```

### B. AI Provider Failure Flow
```text
Server Calls OpenAI / Vercel AI SDK
          ↓
Provider Returns 500 / 429 Rate Limit / Timeout
          ↓
Server Catches Provider Error
  (Logs internal stack trace securely to server logger)
          ↓
Server Returns Standard Safe Error Envelope:
  { status: "error", code: "PROVIDER_TIMEOUT", message: "AI service is temporarily busy. Please retry." }
          ↓
Client Receives Safe Error (No API keys or stack traces exposed)
          ↓
Displays Retry UI with Exponential Backoff Suggestion
```

### C. Invalid AI Output Flow (Structured Extraction Failure)
```text
Server Requests Structured Output (e.g. JSON Action List)
          ↓
AI Model Output Fails Zod Schema Validation
          ↓
Server Attempts Single Automatic Repair Retry with Strict Schema Prompt
          ↓
┌─────────────────────────────────────────────────┐
│            Validation Retest Success?           │
└────────────────────────┬────────────────────────┘
            ┌────────────┴────────────┐
           YES                        NO
            │                         │
            ▼                         ▼
   Return Validated JSON    Fallback to Markdown
   to Client                Formatter Envelope with
                            User Warning Badge
```

---

## 7. Save Flow (Separation of Generation & Persistence)

Generation and Persistence are intentionally decoupled to prevent dirty database writes.

```text
[AI Generation Complete] → Suggestion rendered in local transient state
                                    ↓
                       User Reviews & Click [Save]
                                    ↓
                     Client sends POST `/api/outputs/save`
                     Payload: { workspaceId, title, content, actionType }
                                    ↓
                     Server Authentication & Authorization Check
                     (Verify active user owns workspaceId)
                                    ↓
                     Input Sanitization & DB Insert into `ai_outputs`
                                    ↓
                     Return 201 Created Response
                                    ↓
                     Client Updates Saved Outputs List & Clears Preview Drawer
```
