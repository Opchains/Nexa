"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, FileCheck2, Cpu } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Status Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-md">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span>Phase 1 Internship Submission: AI-Native Architecture</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Understand. Transform. <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200">
            Organize.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
          Nexa is a focused AI workspace assistant built to summarize documents, explain difficult concepts, rewrite text, and extract actionable decisions — with strict human oversight.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#workspace-preview"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 transition-all hover:scale-[1.02]"
          >
            <span>Explore the Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#architecture"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold text-sm border border-slate-700/70 transition-all"
          >
            <FileCheck2 className="w-4 h-4 text-indigo-400" />
            <span>View Architecture Docs</span>
          </a>
        </div>

        {/* Key Product Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-800/80 text-left">
          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Content-First Workspace</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Supply context once, run multiple AI actions without repeating input.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Human-in-the-Loop</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">AI suggests. You review, edit, approve, or reject before saving.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-200">Swappable Providers</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Vercel AI SDK abstraction layer separating UI from backend LLMs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
