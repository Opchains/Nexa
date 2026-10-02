# Nexa — Risk Register & Mitigation Strategy

This document provides a comprehensive risk analysis for **Nexa**, categorizing risk items by Likelihood, Impact, Mitigation Strategy, and Priority Classification.

---

## 1. Risk Register Matrix

| Risk Item | Likelihood | Impact | Mitigation Strategy | Priority |
|---|---|---|---|---|
| **API Key Exposure** | Low | Critical | Keep API keys in server environment variables only; use build-time lint checks to prevent `NEXT_PUBLIC_` leakage. | **Critical** |
| **Unauthorized Data Access** | Low-Medium | Critical | Enforce strict Server-Side Session Auth and Supabase Row Level Security (RLS) on all database tables. | **Critical** |
| **Incorrect Permissions** | Low | Critical | Verify workspace ownership on every server API endpoint prior to fetching or mutating data. | **Critical** |
| **AI Hallucination** | Medium | High | Ground model prompts strictly in provided context; instruct model to flag missing info; require human review before saving. | **High** |
| **Sensitive Data Exposure** | Medium | High | Implement Data Minimization (send only active snippet context); enforce HTTPS TLS 1.3 in transit. | **High** |
| **Prompt Injection** | Medium | High | Delimit user input inside system prompts with XML tags; treat all user text and uploaded files as untrusted. | **High** |
| **User Loses Unsaved Work** | Medium | High | Preserve local editor state on network error; store transient drafts in local storage / React state; require confirmation before tab close. | **High** |
| **Unsafe / Offensive AI Output** | Low-Medium | High | Implement moderation filters; provide Human-in-the-Loop review & reject controls prior to persistence. | **High** |
| **Excessive AI API Cost** | Medium | High | Implement token rate limiting per user per hour; cap maximum context size; monitor provider cost metrics. | **High** |
| **Large Document Context Overflow** | Medium | High | Implement client-side file character limits (10MB max); implement document truncation or future chunking strategies. | **High** |
| **Accidental Permanent AI Changes** | Medium | High | Decouple AI generation from database saving; render suggestions in preview cards without overwriting source content. | **High** |
| **Incorrect Rewrite Meaning** | Medium | High | Render side-by-side diff preview allowing user comparison, inline editing, or full rejection. | **High** |
| **AI Provider Outage / Downtime** | Low-Medium | High | Implement retry logic with exponential backoff; architect provider abstraction (Vercel AI SDK) for rapid model switching. | **High** |
| **Raw Server Errors Exposed** | Low | High | Mask backend stack traces; return standardized safe error envelopes to the browser client. | **High** |
| **Slow AI Responses / Latency** | Medium | Medium | Use Server-Sent Events (SSE) streaming (`streamText`); display responsive visual loading indicators & token counters. | **Medium** |
| **Unsupported File Upload** | Medium | Medium | Implement client-side and server-side MIME type whitelist checks (`.txt`, `.md`, `.pdf`). | **Medium** |
| **Corrupted File Processing** | Low-Medium | Medium | Wrap file extraction parsers in `try/catch` blocks; return user-friendly fallback error messages. | **Medium** |
| **Duplicate AI Requests** | Medium | Medium | Disable submit button while request is `submitting`/`generating`; debounce action triggers. | **Medium** |
| **Invalid Structured Output** | Medium | Medium | Use `generateObject` with Zod schema validation; implement single automated retry if schema parsing fails. | **Medium** |
| **Poor Mobile UX** | Medium | Medium | Design responsive layouts using Tailwind CSS breakpoint classes; conduct cross-device mobile testing. | **Medium** |
| **Accessibility Regression** | Medium | Medium | Enforce semantic HTML5 tags; visible focus rings; screen reader live regions; run automated accessibility audits. | **Medium** |
| **Database Outage** | Low | High | Handle DB exceptions gracefully; allow users to continue drafting locally in browser state. | **Medium** |
| **Session Failure / Expiration** | Low-Medium | High | Implement automatic session refresh listeners; prompt user to re-authenticate without losing current draft. | **Medium** |
| **Vendor Lock-in** | Medium | Medium | Abstraction layer via Vercel AI SDK ensures zero reliance on OpenAI-specific SDK methods in frontend code. | **Medium** |
| **Inconsistent AI Output Format** | Medium | Medium | Standardize system prompt instructions and temperature settings (e.g. `temperature: 0.2` for extraction). | **Medium** |
| **Poor Error Recovery** | Medium | Medium | Provide clear retry buttons on all error notification banners. | **Medium** |
| **Deployment Failure** | Low-Medium | Medium | Run automated `npm run lint` and `npm run build` checks in CI pipeline before deploying to Vercel. | **Medium** |

---

## 2. Categorization by Priority

### Critical Priority (Zero Tolerance)
These risks pose severe security or privacy breaches and must be mitigated prior to production launch:
1. **API Key Exposure** (Mitigated via server-only environment variables).
2. **Unauthorized Data Access** (Mitigated via Supabase RLS and server session validation).
3. **Incorrect Permissions** (Mitigated via ownership validation on API routes).

### High Priority (Active Architecture Defense)
These risks impact product core value, data safety, or user trust:
- **AI Hallucination & Meaning Distortion:** Mitigated via context grounding & human-in-the-loop review.
- **Prompt Injection & Sensitive Data Exposure:** Mitigated via prompt delimiters & context minimization.
- **Data Loss & Accidental Overwriting:** Mitigated via transient preview state & local draft preservation.
- **Excessive Cost & Context Overflow:** Mitigated via token limits & character constraints.
- **Provider Downtime & Stack Trace Exposure:** Mitigated via error masking & provider abstraction.

### Medium Priority (Quality & Resilience)
Operational risks managed via standard software engineering best practices:
- **Latency & Mobile UX:** Streaming UI & responsive Tailwind CSS grids.
- **Invalid Schemas & Duplicate Requests:** Zod validation & UI button disabling.
- **Accessibility & Vendor Lock-in:** Semantic HTML, ARIA attributes, & Vercel AI SDK abstraction.
