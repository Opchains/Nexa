# Nexa — AI Workspace Assistant

Nexa is an AI-powered workspace assistant designed to help users understand, transform, and organize information faster through human-in-the-loop AI workflows.

---

## Phase 1: AI-Native Product Strategy & Frontend Architecture

Phase 1 focuses on establishing the product strategy, target users, jobs-to-be-done, core use cases, interaction flows, security trust boundaries, state management strategy, acceptance benchmarks, risk analysis, repository setup, and deployment readiness.

---

## Product Goal

Nexa functions as a content-first AI workspace where users provide context once and perform multiple AI-assisted operations (summarize, explain, rewrite, extract tasks, ask questions) without repeating background information.

The fundamental product workflow is:

```text
Content
   ↓
AI Assistance
   ↓
Generated Suggestion
   ↓
Human Review
   ↓
User Decision (Accept / Edit / Regenerate / Reject)
```

---

## Target Users

- **Students:** Understand notes, study guides, and dense academic papers; generate concise flashcard-ready summaries.
- **Professionals:** Summarize long reports, polish client communications, and extract meeting decisions and deadlines.
- **Researchers:** Scan document volumes, extract methodology insights, and ask contextual Q&A across uploaded documents.
- **Content Creators:** Rewrite draft content for different tones (professional, concise, casual) and generate structured outlines.
- **Knowledge Workers:** Organize scattered daily notes, specifications, and project documents into structured action plans.

---

## Core AI Use Cases

1. **Summarization:** Short summary, detailed summary, key bullet points, and executive summaries.
2. **Explanation:** Simple explanation (ELI5), standard clarification, and detailed technical breakdowns.
3. **Rewriting & Polish:** Professional tone, concise shortening, clarity improvement, and custom prompt adjustments.
4. **Action Extraction:** Automatic grounding-verified extraction of tasks, explicit deadlines, and key decisions.
5. **Document Q&A:** Interactive question answering grounded strictly in uploaded workspace document context.
6. **Structured Output:** Generation of checklists, markdown tables, key takeaway cards, and action lists.

---

## Architecture Overview

Nexa utilizes a decoupled 3-tier architecture:

```text
┌──────────────────────────────────────────┐
│             BROWSER CLIENT               │
│ - Next.js App Router & React Components   │
│ - Workspace Editor & Chat UI             │
│ - Human-in-the-Loop Review Panel         │
│ - Transient UI State & Local Drafts      │
└────────────────────┬─────────────────────┘
                     │ HTTPS
                     ▼
┌──────────────────────────────────────────┐
│              SERVER LAYER                │
│ - Auth & Session Enforcement             │
│ - Zod Request Schema Validation          │
│ - Prompt Construction & Delimiters       │
│ - Vercel AI SDK Abstraction Layer        │
└───────────┬──────────────────┬───────────┘
            │                  │
            ▼                  ▼
┌──────────────────────┐  ┌──────────────────────┐
│     AI PROVIDER      │  │       DATABASE       │
│ OpenAI (gpt-4o) via  │  │ Supabase PostgreSQL  │
│ Vercel AI SDK        │  │ Row Level Security   │
└──────────────────────┘  └──────────────────────┘
```

---

## Technology Direction

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Vanilla CSS design system tokens)
- **AI Integration Layer:** Vercel AI SDK (`streamText`, `generateObject`)
- **Initial AI Provider:** OpenAI (`gpt-4o` / `gpt-4o-mini`)
- **Database / Auth:** Supabase (PostgreSQL with Row Level Security)
- **Deployment Platform:** Vercel

---

## Documentation Links

All architectural and product planning specifications are available in the [`docs/`](https://github.com/Opchains/Nexa/tree/main/docs) directory:

- [Product Strategy & Brief](file:///c:/Users/HAMIDAT/Desktop/Xotic%20Queens%20Beauty/Nexa/docs/product-brief.md)
- [User Interaction & System Flows](file:///c:/Users/HAMIDAT/Desktop/Xotic%20Queens%20Beauty/Nexa/docs/user-flows.md)
- [System Architecture & Boundaries](file:///c:/Users/HAMIDAT/Desktop/Xotic%20Queens%20Beauty/Nexa/docs/system-architecture.md)
- [Acceptance Criteria & Quality Benchmarks](file:///c:/Users/HAMIDAT/Desktop/Xotic%20Queens%20Beauty/Nexa/docs/acceptance-criteria.md)
- [Risk Register & Mitigation Matrix](file:///c:/Users/HAMIDAT/Desktop/Xotic%20Queens%20Beauty/Nexa/docs/risk-register.md)

---

## Architecture Principle

Every feature in Nexa is governed by the strict **Security & Trust Model**:

```text
Browser       = Untrusted Environment (No API keys or DB secrets allowed)
Server        = Trusted Application Layer (Enforces auth, validation, & prompt rules)
AI Output     = Untrusted Generated Content (Draft proposal requiring human review)
User Content  = Untrusted Input (Sanitized & delimited to prevent injection)
Database      = Protected Persistent Storage (Enforces Row Level Security)
```

---

## Deployment

```text
GitHub Repository:
https://github.com/USERNAME/nexa (Ready for push; local repository initialized)

Live Vercel Application:
https://nexa-ai-workspace.vercel.app (Deployment-ready Next.js build verified)
```

---

## Current Status (Phase 1 Completed)

- [x] Product Strategy & User Personas Documented
- [x] Jobs-to-be-Done (JTBD 1-6) Specified
- [x] All 7 User Interaction Flows Mapped
- [x] System Architecture, Trust Model, & Boundaries Defined
- [x] Vercel AI SDK Integration & Swappable Provider Strategy Planned
- [x] Database Schema & State Ownership Rules Established
- [x] Acceptance Criteria & Quality Benchmarks Defined (≥90% accuracy target)
- [x] Comprehensive 27-Item Risk Register Matrix Completed
- [x] Starter Next.js App Router Application Scaffolding Completed
- [x] Interactive Workspace Preview UI & Human Review Controls Implemented
- [x] TypeScript, ESLint, & Production Build Verification Passed

---

## Next Phase

Future internship modules will extend this exact repository by implementing live OpenAI API calls via Vercel AI SDK, Supabase authentication, active database persistence, and multi-document workspace support.
