"use client";

import React from "react";
import { ShieldCheck, UserCheck, Eye, Lock, RotateCcw } from "lucide-react";

export default function HumanInTheLoopSection() {
  return (
    <section id="human-review" className="py-16 bg-[#090d16] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-indigo-500/20 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Core UX & Security Guarantee</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              AI assists. <span className="text-indigo-400">You decide.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              At Nexa, AI outputs are treated as draft proposals — never absolute truth or automatic triggers. Every suggestion must be reviewed, edited, accepted, or discarded by a human operator before being saved to your persistent workspace.
            </p>
          </div>

          {/* 4 Pillars of Human Review */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 w-fit mb-3">
                <Eye className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-slate-100">Zero Silent Overwrites</h4>
              <p className="text-[11px] text-slate-400 mt-1">Your original notes and uploaded documents remain untouched during AI processing.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3">
                <UserCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-slate-100">Explicit Approval Loop</h4>
              <p className="text-[11px] text-slate-400 mt-1">Accept, inline edit, regenerate, or reject suggestions with a single click.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 w-fit mb-3">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-slate-100">Safe Input Recovery</h4>
              <p className="text-[11px] text-slate-400 mt-1">Network failures or rejected suggestions preserve user inputs with zero data loss.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 w-fit mb-3">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-semibold text-slate-100">Server-Only Secrets</h4>
              <p className="text-[11px] text-slate-400 mt-1">API keys and credentials are locked in server layers, isolated from browser clients.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
