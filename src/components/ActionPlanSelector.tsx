"use client";

import { useState } from "react";
import { Course, Scenario } from "@/data/courses";
import { motion, AnimatePresence } from "framer-motion";

export default function ActionPlanSelector({ course }: { course: Course }) {
    const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);

    const toggleStep = (stepId: string) => {
        setCompletedSteps((prev) =>
            prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
        );
    };

    if (!course.scenarios || course.scenarios.length === 0) return null;

    return (
        <section className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-32 -mt-32 pointer-events-none" />

            <div className="relative z-10">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <span>🚀</span> Interactive Strategy Guide
                    </h2>
                    <p className="text-slate-400">Select your current situation to get a tailored action plan.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {course.scenarios.map((scenario) => (
                        <button
                            key={scenario.id}
                            onClick={() => {
                                setSelectedScenario(scenario);
                                setCompletedSteps([]);
                            }}
                            className={`p-4 rounded-xl border transition-all text-left relative overflow-hidden group ${selectedScenario?.id === scenario.id
                                    ? "bg-blue-600 border-blue-500 shadow-lg scale-105"
                                    : "bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-750"
                                }`}
                        >
                            <div className="text-2xl mb-2">{scenario.emoji}</div>
                            <div className="font-bold text-sm">{scenario.label}</div>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {selectedScenario && (
                        <motion.div
                            key={selectedScenario.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
                        >
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <span className={`w-2 h-8 rounded-full ${selectedScenario.color}`} />
                                Your Plan: {selectedScenario.label}
                            </h3>

                            <div className="space-y-3">
                                {selectedScenario.steps.map((step) => {
                                    const isCompleted = completedSteps.includes(step.id);
                                    return (
                                        <div
                                            key={step.id}
                                            onClick={() => toggleStep(step.id)}
                                            className={`
                        flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-all border
                        ${isCompleted
                                                    ? "bg-green-900/20 border-green-900/50 opacity-60"
                                                    : "bg-slate-800 border-slate-700 hover:border-slate-600"}
                      `}
                                        >
                                            <div className={`
                        mt-1 w-5 h-5 rounded-full border flex items-center justify-center transition-colors flex-shrink-0
                        ${isCompleted ? "bg-green-500 border-green-500" : "border-slate-500"}
                      `}>
                                                {isCompleted && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`font-bold text-sm ${isCompleted ? "line-through text-slate-500" : "text-slate-200"}`}>
                                                        {step.action}
                                                    </span>
                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-700 rounded text-slate-400">
                                                        {step.duration}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400">{step.detail}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
