"use client";

import React from "react";
import { Sparkles, Github, FileText, CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#060910] border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
            <img src="/icon.svg" alt="Nexa logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-bold text-slate-100 text-sm">Nexa</span>
            <span className="text-slate-500 text-xs block">
              Phase 1 AI Workspace Assistant Architecture
            </span>
          </div>
        </div>

        {/* Stack Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel AI SDK", "OpenAI", "Supabase", "Vercel"].map(
            (tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800 text-[11px] font-mono"
              >
                {tech}
              </span>
            )
          )}
        </div>

        {/* Phase 1 Completion Status */}
        <div className="flex items-center space-x-2 text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <CheckCircle className="w-4 h-4" />
          <span>Phase 1 Architecture Complete</span>
        </div>
      </div>
    </footer>
  );
}
