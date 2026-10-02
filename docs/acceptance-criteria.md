# Nexa — Acceptance Criteria & Quality Benchmarks

This document specifies the non-negotiable acceptance criteria, performance latency targets, accessibility standards, security safety requirements, and UX benchmarks for **Nexa**.

---

## 1. AI Accuracy & Fidelity Criteria

| Metric / Aspect | Standard | Verification Benchmark |
|---|---|---|
| **Meaning Preservation** | Source meaning must be strictly preserved during rewrites and summaries. | 0% unprompted factual divergence from source context. |
| **Hallucination Prevention** | The AI must never invent dates, names, decisions, or numbers not present in source text. | 100% grounding check against source text in action extraction. |
| **Insufficient Context** | When asked questions outside the document context, the AI must explicitly state lack of context. | AI returns explicit insufficient context message rather than guessing. |
| **Action Fidelity** | Output must strictly match the selected action (e.g., "Summarize" yields a summary, not a rewrite). | Selected mode schema enforced via prompt templates. |
| **Format Compliance** | Requested output structures (Markdown tables, JSON checklists, bullet lists) must strictly conform to schema. | Validated via Zod parser or Markdown structure validator. |
| **Benchmark Target** | Overall prompt accuracy across standard test suite. | **≥ 90%** of test prompts correctly follow requested task and preserve critical source information. |

---

## 2. System Latency & Performance Targets

```text
┌───────────────────────────┬───────────────────────────┬───────────────────────────┐
│ Metric                    │ Target Benchmark          │ Maximum Acceptable Threshold│
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ UI Acknowledgment         │ < 300 ms                  │ 500 ms                    │
│ Initial Streamed Token    │ < 3.0 s                   │ 5.0 s (Provider dependent)│
│ Request Completion (Standard) │ < 15.0 s              │ 30.0 s (Large files)      │
│ File Parsing (10MB TXT/PDF)│ < 2.0 s                  │ 4.0 s                     │
└───────────────────────────┴───────────────────────────┴───────────────────────────┘
```

- **Optimistic UI:** Every button click (e.g. action trigger, tab change) provides visual acknowledgment within **<300ms** (disabling action button, showing loading indicator).
- **Streaming Response:** Text generation utilizes SSE streaming so users begin reading text within **<3 seconds** of submitting the prompt.

---

## 3. Accessibility Standards (WCAG 2.1 AA Compliance)

1. **Semantic Structure:**
   - HTML5 landmark tags used exclusively (`<main>`, `<header>`, `<nav>`, `<aside>`, `<article>`, `<section>`).
   - Exactly one `<h1>` per page with logical heading depth (`<h2>`, `<h3>`).
2. **Keyboard Navigation:**
   - Every interactive element (buttons, dropdowns, editor tabs, action pills) must be reachable via `Tab` key.
   - Focus rings must be visible (`ring-2 ring-indigo-500 ring-offset-2`).
3. **Contrast Ratios:**
   - All body text and label text meets or exceeds WCAG AA **4.5:1** contrast ratio against its background.
   - High-contrast visual borders separate preview panels and editor zones.
4. **Non-Color Status Indicators:**
   - Error, success, and warning states use text labels and distinct icons (e.g. `AlertCircle`, `CheckCircle`), never color alone.
5. **Screen Reader Support:**
   - Active AI generation state is bound to an `aria-live="polite"` region so screen readers announce generation status changes.
   - Form controls have explicit `<label>` elements or `aria-label` attributes.

---

## 4. Safety & Security Criteria

1. **Secret Isolation:**
   - Zero API keys (`OPENAI_API_KEY`, Supabase service keys) present in client bundles or public repositories.
   - Verified via automated secret scanner during build (`npm run lint`).
2. **Input & Payload Validation:**
   - All server API routes enforce strict **Zod** schema parsing. Unrecognized keys are stripped.
3. **File Upload Security:**
   - Uploaded files validated client-side and server-side against type whitelist (`.txt`, `.md`, `.pdf`).
   - File size capped at **10MB**.
4. **Human Review Enforcement:**
   - AI outputs remain in transient state until explicitly saved by user.
   - Database writes require authenticated user session matching `workspace_id` ownership.
5. **Error Masking:**
   - Server errors returned to client map to standard safe envelopes (`PROVIDER_TIMEOUT`, `INVALID_FILE_TYPE`).
   - Internal stack traces and database errors are suppressed from API responses.

---

## 5. User Experience (UX) Quality Benchmarks

Users must never experience ambiguity regarding system state:
- **Processing State:** Clear animation showing AI is working, with option to cancel streaming.
- **Active Action Feedback:** The currently executing action pill (e.g. "Summarizing...") is visually highlighted.
- **Review Controls:** Pending suggestions render with prominent `Accept`, `Edit`, `Regenerate`, and `Reject` buttons.
- **Draft Preservation:** Network errors or rejected suggestions preserve original editor content with zero loss of user input.
- **Saved Feedback:** Toast notifications confirm persistence actions ("Saved to Workspace Outputs").
