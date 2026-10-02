"use client";

import React, { useState } from "react";
import {
  Sparkles,
  FileText,
  Upload,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Edit3,
  Save,
  Check,
  Zap,
  HelpCircle,
  Wand2,
  CheckSquare,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

interface SavedOutput {
  id: string;
  action: string;
  content: string;
  savedAt: string;
}

export default function WorkspacePreview() {
  const defaultSourceText = `EXECUTIVE PROJECT MEMO — Q3 ARCHITECTURE & SPRINT ROADMAP

Nexa is undergoing a Phase 1 architectural redesign to introduce an AI-native workspace.
The team has agreed on the following key commitments:

1. System Architecture:
   - Frontend must be built using Next.js App Router and Tailwind CSS.
   - Vercel AI SDK must be used to decouple UI from underlying AI providers (OpenAI initial model: gpt-4o).
   - Backend database persistence will use Supabase PostgreSQL with Row Level Security (RLS).

2. Security & Privacy Guardrails:
   - Zero secrets or private API keys will be exposed to the client browser.
   - All AI output will require human-in-the-loop review prior to database persistence.

3. Immediate Action Items & Deadlines:
   - Complete Phase 1 documentation and repository setup by October 15, 2026. Lead: Architecture Team.
   - Implement Zod schema validation for all incoming API request payloads by October 20, 2026. Lead: Backend Team.
   - Conduct accessibility audit targeting WCAG 2.1 AA compliance by October 25, 2026. Lead: Frontend Team.`;

  const [sourceText, setSourceText] = useState(defaultSourceText);
  const [selectedAction, setSelectedAction] = useState<string>("extract_tasks");
  const [aiState, setAiState] = useState<"idle" | "generating" | "pending_review" | "editing">("idle");
  const [suggestion, setSuggestion] = useState<string>("");
  const [editedSuggestion, setEditedSuggestion] = useState<string>("");
  const [savedOutputs, setSavedOutputs] = useState<SavedOutput[]>([]);
  const [activeTab, setActiveTab] = useState<"editor" | "saved">("editor");
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const sampleOutputs: Record<string, string> = {
    summarize: `### Executive Summary
Nexa Phase 1 establishes an AI-native workspace architecture using Next.js App Router, Tailwind CSS, Vercel AI SDK, and Supabase RLS. The product prioritizes security (zero client secrets) and human oversight (no silent persistence). Core deliverables include architecture documentation, schema validation, and accessibility compliance scheduled through late October 2026.`,

    explain: `### Simplified Explanation (ELI5)
Think of Nexa as a smart digital assistant for your notes. Instead of pasting text into a chat box over and over, you put your document here once. Then, you can ask Nexa to summarize it or pull out tasks. But here is the special rule: Nexa never saves anything automatically — you get to inspect and approve everything first!`,

    rewrite: `### Polished Professional Version
This memorandum outlines the strategic architectural roadmap for Nexa Phase 1. The initiative transitions Nexa into a content-first AI workspace leveraging Next.js App Router, the Vercel AI SDK abstraction layer, and Supabase PostgreSQL with strict Row Level Security. All AI operations operate under a mandatory human review workflow to ensure data privacy and prevent unintended persistence.`,

    extract_tasks: `### Extracted Action Items & Deadlines

| Action Item | Assigned Lead | Due Date | Status |
|---|---|---|---|
| Complete Phase 1 documentation & repository setup | Architecture Team | Oct 15, 2026 | Pending |
| Implement Zod schema validation on API routes | Backend Team | Oct 20, 2026 | Pending |
| Conduct WCAG 2.1 AA accessibility audit | Frontend Team | Oct 25, 2026 | Pending |

*Grounding Verification:* 3 explicit deadlines and 3 assignments verified against source memo. Zero hallucinated items.`,

    simplify: `### Key Takeaways
• **Architecture:** Next.js + Vercel AI SDK + Supabase RLS.
• **Security:** Server-only API keys, complete client isolation.
• **Human Control:** All AI outputs require explicit review before saving.
• **Deliverables:** Phase 1 docs (Oct 15), Zod validation (Oct 20), WCAG audit (Oct 25).`,

    ask_question: `### Q&A Response
**Question:** What is the deadline for completing the accessibility audit and who is responsible?

**Answer:** According to the source memo, the accessibility audit targeting WCAG 2.1 AA compliance must be completed by **October 25, 2026**, and is assigned to the **Frontend Team**.`,
  };

  const handleRunAiAction = (actionKey: string) => {
    setSelectedAction(actionKey);
    setAiState("generating");
    setSuggestion("");

    setTimeout(() => {
      const result = sampleOutputs[actionKey] || sampleOutputs.summarize;
      setSuggestion(result);
      setEditedSuggestion(result);
      setAiState("pending_review");
    }, 1200);
  };

  const handleAccept = () => {
    const newOutput: SavedOutput = {
      id: Date.now().toString(),
      action: selectedAction,
      content: aiState === "editing" ? editedSuggestion : suggestion,
      savedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setSavedOutputs([newOutput, ...savedOutputs]);
    setAiState("idle");
    showToast("Output saved to Workspace Records!");
  };

  const handleReject = () => {
    setAiState("idle");
    setSuggestion("");
    showToast("Suggestion discarded. Original content preserved.");
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus("Error: File exceeds 10MB limit.");
      return;
    }

    setUploadStatus(`Uploading ${file.name}...`);
    setTimeout(() => {
      setUploadStatus(null);
      setSourceText(`[CONTENT EXTRACTED FROM: ${file.name}]\n\n` + defaultSourceText);
      showToast(`Loaded ${file.name} into workspace context!`);
    }, 1000);
  };

  return (
    <section id="workspace-preview" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Conceptual Workspace Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Nexa Workspace Assistant
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Provide context once → Apply AI actions → Review, edit, approve, or reject.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "editor"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-800/80 text-slate-400 hover:text-white"
              }`}
            >
              Workspace Editor
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === "saved"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-800/80 text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Saved Outputs ({savedOutputs.length})</span>
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-slate-100 border border-indigo-500/40 shadow-2xl flex items-center space-x-2 text-xs font-medium animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {activeTab === "editor" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Source Document Context (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="glass-panel rounded-2xl p-5 flex-1 flex flex-col border border-slate-800">
                {/* Editor Top Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      Active Source Document Context
                    </span>
                  </div>

                  {/* File Upload Trigger */}
                  <label className="cursor-pointer inline-flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium px-2.5 py-1 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 transition-all border border-indigo-500/20">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept=".txt,.md,.pdf"
                      onChange={handleSimulateUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {uploadStatus && (
                  <div className="mb-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{uploadStatus}</span>
                  </div>
                )}

                {/* Source Textarea */}
                <textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  className="w-full h-80 lg:h-96 p-4 rounded-xl bg-slate-950/80 text-slate-200 text-xs sm:text-sm font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-slate-800/80"
                  placeholder="Paste or type document text here..."
                />

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{sourceText.length} characters</span>
                  <span>Context Status: Ready for AI Operations</span>
                </div>
              </div>
            </div>

            {/* Right Column: AI Action Bar & Suggestion Panel (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {/* AI Action Selection Toolbar */}
              <div className="glass-panel rounded-2xl p-4 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                  Select AI Assistive Action
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "extract_tasks", label: "Extract Tasks", icon: CheckSquare },
                    { key: "summarize", label: "Summarize", icon: FileText },
                    { key: "explain", label: "Explain (ELI5)", icon: HelpCircle },
                    { key: "rewrite", label: "Rewrite Polish", icon: Wand2 },
                    { key: "simplify", label: "Key Takeaways", icon: Sparkles },
                    { key: "ask_question", label: "Ask Q&A", icon: HelpCircle },
                  ].map((act) => {
                    const Icon = act.icon;
                    const isSelected = selectedAction === act.key;
                    return (
                      <button
                        key={act.key}
                        onClick={() => handleRunAiAction(act.key)}
                        disabled={aiState === "generating"}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                            : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
                        } ${aiState === "generating" ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{act.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Suggestion / Output Panel */}
              <div className="glass-panel rounded-2xl p-5 flex-1 flex flex-col border border-slate-800 relative min-h-[300px]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      AI Suggestion Panel
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      aiState === "idle"
                        ? "bg-slate-800 text-slate-400 border-slate-700"
                        : aiState === "generating"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    }`}
                  >
                    {aiState === "idle" && "Ready"}
                    {aiState === "generating" && "Generating..."}
                    {aiState === "pending_review" && "Pending Human Review"}
                    {aiState === "editing" && "Editing Mode"}
                  </span>
                </div>

                {/* Content Box depending on AI State */}
                {aiState === "idle" && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <Sparkles className="w-8 h-8 text-slate-600 mb-2 opacity-50" />
                    <p className="text-xs font-medium">No active AI suggestion</p>
                    <p className="text-[11px] text-slate-600 mt-1 max-w-xs">
                      Select an AI action above to run an operation against your active source context.
                    </p>
                  </div>
                )}

                {aiState === "generating" && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-indigo-400">
                    <RefreshCw className="w-7 h-7 animate-spin mb-3 text-indigo-400" />
                    <p className="text-xs font-semibold">Generating AI Suggestion...</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Streaming via Vercel AI SDK abstraction layer...
                    </p>
                  </div>
                )}

                {(aiState === "pending_review" || aiState === "editing") && (
                  <div className="flex-1 flex flex-col">
                    {aiState === "editing" ? (
                      <textarea
                        value={editedSuggestion}
                        onChange={(e) => setEditedSuggestion(e.target.value)}
                        className="w-full flex-1 p-3 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono leading-relaxed border border-indigo-500/40 focus:outline-none"
                      />
                    ) : (
                      <div className="w-full flex-1 p-3 rounded-xl bg-slate-950/70 text-slate-200 text-xs font-mono leading-relaxed overflow-y-auto max-h-[260px] border border-slate-800">
                        <pre className="whitespace-pre-wrap font-sans text-slate-300">
                          {suggestion}
                        </pre>
                      </div>
                    )}

                    {/* Human Review Action Controls */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleAccept}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-600/20"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept & Save</span>
                        </button>

                        <button
                          onClick={() =>
                            setAiState(aiState === "editing" ? "pending_review" : "editing")
                          }
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{aiState === "editing" ? "Done Editing" : "Edit"}</span>
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleRunAiAction(selectedAction)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs"
                          title="Regenerate Suggestion"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={handleReject}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs border border-rose-500/20 transition-all"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Saved Outputs View */
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 min-h-[400px]">
            <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
              <Save className="w-4 h-4 text-emerald-400" />
              <span>Persisted Workspace AI Outputs ({savedOutputs.length})</span>
            </h3>

            {savedOutputs.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No saved outputs yet. Use the Workspace Editor to generate and approve suggestions.
              </div>
            ) : (
              <div className="space-y-4">
                {savedOutputs.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                      <span className="font-semibold text-indigo-400 uppercase tracking-wider">
                        {item.action.replace("_", " ")}
                      </span>
                      <span>Saved at {item.savedAt}</span>
                    </div>
                    <div className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
