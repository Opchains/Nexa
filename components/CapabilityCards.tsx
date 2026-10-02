"use client";

import React from "react";
import {
  FileText,
  HelpCircle,
  Wand2,
  CheckSquare,
  MessageSquare,
  LayoutGrid,
} from "lucide-react";

export default function CapabilityCards() {
  const capabilities = [
    {
      icon: FileText,
      title: "Summarization",
      description:
        "Digest long documents into executive summaries, key bullet points, or detailed section breakdowns.",
      modes: ["Short Summary", "Detailed Summary", "Key Points", "Executive"],
      color: "from-blue-500/20 to-indigo-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: HelpCircle,
      title: "Explanation",
      description:
        "Demystify dense jargon and complex technical concepts into clear, simple language.",
      modes: ["Simple (ELI5)", "Standard", "Detailed Technical"],
      color: "from-violet-500/20 to-purple-500/10",
      iconColor: "text-violet-400",
    },
    {
      icon: Wand2,
      title: "Rewriting & Polish",
      description:
        "Refine draft writing to match desired tone, improve clarity, or condense wordy paragraphs.",
      modes: ["Professional", "Shorter", "Clearer", "Custom Prompt"],
      color: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-400",
    },
    {
      icon: CheckSquare,
      title: "Action Extraction",
      description:
        "Automatically extract explicit tasks, deadlines, and key decisions grounded in source text.",
      modes: ["Action Items", "Deadlines", "Key Decisions", "Next Steps"],
      color: "from-amber-500/20 to-orange-500/10",
      iconColor: "text-amber-400",
    },
    {
      icon: MessageSquare,
      title: "Document Q&A",
      description:
        "Ask targeted questions grounded strictly in your uploaded document context without repeating background.",
      modes: ["Contextual Search", "Citation Back-Links", "Follow-ups"],
      color: "from-pink-500/20 to-rose-500/10",
      iconColor: "text-pink-400",
    },
    {
      icon: LayoutGrid,
      title: "Structured Outputs",
      description:
        "Transform raw unstructured text into clean checklists, markdown tables, and structured takeaways.",
      modes: ["Checklists", "Markdown Tables", "Key Takeaway Cards"],
      color: "from-cyan-500/20 to-sky-500/10",
      iconColor: "text-cyan-400",
    },
  ];

  return (
    <section id="capabilities" className="py-16 bg-[#0c111e]/60 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Core AI Capabilities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Nexa provides targeted AI capabilities tailored for knowledge work — keeping you in total control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-200"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cap.color} blur-2xl pointer-events-none rounded-full group-hover:scale-125 transition-transform`}
                />
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 ${cap.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-100">{cap.title}</h3>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {cap.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                  {cap.modes.map((mode, mIdx) => (
                    <span
                      key={mIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-400 border border-slate-800"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
