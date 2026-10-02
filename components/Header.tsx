"use client";

import React from "react";
import { Sparkles, Shield, FileText, Github, Layers } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-[#090d16]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-lg shadow-indigo-500/20">
            <img src="/icon.svg" alt="Nexa logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight text-white font-sans">
                Nexa
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                Phase 1
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              AI Workspace Assistant
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <a
            href="#workspace-preview"
            className="hover:text-indigo-400 transition-colors flex items-center space-x-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>Workspace</span>
          </a>
          <a
            href="#capabilities"
            className="hover:text-indigo-400 transition-colors flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Actions</span>
          </a>
          <a
            href="#human-review"
            className="hover:text-indigo-400 transition-colors flex items-center space-x-1.5"
          >
            <Shield className="w-4 h-4" />
            <span>Human Review</span>
          </a>
          <a
            href="#architecture"
            className="hover:text-indigo-400 transition-colors flex items-center space-x-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Docs & Architecture</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <a
            href="#architecture"
            className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Docs</span>
          </a>
          <a
            href="https://github.com/Opchains/Nexa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
