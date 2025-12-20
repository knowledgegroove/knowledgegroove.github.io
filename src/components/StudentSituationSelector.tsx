"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export type SituationType = "confused" | "low-scores" | "behind" | "high-achiever" | "overwhelmed";

interface StudentSituationSelectorProps {
    onSelect: (situation: SituationType) => void;
    selected: SituationType | null;
}

export default function StudentSituationSelector({ onSelect, selected }: StudentSituationSelectorProps) {
    const situations: { id: SituationType; label: string; emoji: string }[] = [
        { id: "confused", label: "I'm confused in class", emoji: "😵‍💫" },
        { id: "low-scores", label: "I understand but test scores are low", emoji: "📉" },
        { id: "behind", label: "I'm behind", emoji: "🐢" },
        { id: "high-achiever", label: "I want a 5 / A", emoji: "🏆" },
        { id: "overwhelmed", label: "I'm overwhelmed", emoji: "🤯" },
    ];

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">
                What best describes you right now?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {situations.map((situation) => (
                    <button
                        key={situation.id}
                        onClick={() => onSelect(situation.id)}
                        className={`
              p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 text-center h-full
              ${selected === situation.id
                                ? "border-blue-500 bg-blue-50 text-blue-900 shadow-md transform scale-105"
                                : "border-slate-100 hover:border-blue-200 hover:bg-slate-50 text-slate-600"}
            `}
                    >
                        <span className="text-3xl">{situation.emoji}</span>
                        <span className="font-semibold text-sm">{situation.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
