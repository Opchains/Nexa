"use client";

import React from "react";
import {
  FileText,
  Shield,
  Layers,
  CheckCircle,
  AlertTriangle,
  Cpu,
  Database,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function ArchitectureShowcase() {
  const docsList = [
    {
      name: "Product Strategy & Brief",
      file: "docs/product-brief.md",
      href: "https://github.com/Opchains/Nexa/blob/main/docs/product-brief.md",
      desc: "Vision, target user segments, JTBD 1-6, AI capabilities, and scope boundaries.",
      tag: "Strategy",
    },
    {
      name: "User Interaction Flows",
      file: "docs/user-flows.md",
      href: "https://github.com/Opchains/Nexa/blob/main/docs/user-flows.md",
      desc: "Workspace, chat Q&A, review loop, file upload validation, and failure recovery.",
      tag: "UX Flow",
    },
    {
      name: "System Architecture",
      file: "docs/system-architecture.md",
      href: "https://github.com/Opchains/Nexa/blob/main/docs/system-architecture.md",
      desc: "Browser vs Server vs Model boundaries, Trust Model, and Vercel AI SDK integration.",
      tag: "Architecture",
    },
    {
      name: "Acceptance Criteria",
      file: "docs/acceptance-criteria.md",
      href: "https://github.com/Opchains/Nexa/blob/main/docs/acceptance-criteria.md",
      desc: "Accuracy targets (≥90%), latency limits, WCAG AA compliance, and safety standards.",
      tag: "Quality",
    },
    {
      name: "Risk Register Matrix",
      file: "docs/risk-register.md",
      href: "https://github.com/Opchains/Nexa/blob/main/docs/risk-register.md",
      desc: "27 classified risks (Critical, High, Medium) with likelihood, impact, and mitigations.",
      tag: "Security",
    },
  ];

  return (
    <section id="architecture" className="py-16 bg-[#0c111e]/80 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Phase 1 Internship Specifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Architecture & Documentation Repository
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Every architectural decision, trust boundary, user flow, and risk mitigation is fully documented.
          </p>
        </div>

        {/* Documentation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {docsList.map((doc, idx) => (
            <a
              key={idx}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-indigo-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                    {doc.tag}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{doc.file}</span>
                </div>

                <h3 className="font-semibold text-base text-slate-100 mb-2 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{doc.name}</span>
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">{doc.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-indigo-400 font-medium">
                <span>View Complete Doc</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>

        {/* Architectural Trust Model Visualizer */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            <span>Nexa Trust Model & Environment Boundary Classification</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">BROWSER</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Untrusted Environment
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                UI rendering, state display, local input drafts. Zero API keys or DB secrets allowed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">SERVER LAYER</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Trusted App Layer
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Authentication, Zod validation, prompt construction, and Vercel AI SDK provider orchestration.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">AI MODEL OUTPUT</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Untrusted Suggestion
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Generated text treated as draft proposal. Requires human approval before saving to database.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">DATABASE</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Protected Storage
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Supabase PostgreSQL with strict Row Level Security (RLS) enforcing user ownership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
