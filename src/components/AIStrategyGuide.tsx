"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIStrategyGuide() {
    const [input, setInput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [schedule, setSchedule] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editInput, setEditInput] = useState("");

    const handleGenerate = async () => {
        if (!input.trim()) return;
        setIsGenerating(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    context: "High School Studies",
                    situation: "Student needs a custom plan",
                    mode: "schedule"
                }),
            });
            const data = await response.json();
            if (data.text) {
                setSchedule(data.text);
            }
        } catch (error) {
            console.error("Failed to generate schedule", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        if (schedule) {
            navigator.clipboard.writeText(schedule);
            alert("Schedule copied to clipboard!");
        }
    };

    const handleDownload = () => {
        if (schedule) {
            const element = document.createElement("a");
            const file = new Blob([schedule], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = "my-study-schedule.txt";
            document.body.appendChild(element);
            element.click();
        }
    };

    const handleEdit = async () => {
        if (!editInput.trim()) return;
        setIsGenerating(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: `Update this schedule based on this feedback: ${editInput}. \n\n Current Schedule: ${schedule}`,
                    context: "High School Studies",
                    situation: "Refining the plan",
                    mode: "schedule"
                }),
            });
            const data = await response.json();
            if (data.text) {
                setSchedule(data.text);
                setEditMode(false);
                setEditInput("");
            }
        } catch (error) {
            console.error("Failed to edit schedule", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32 pointer-events-none" />

            <div className="relative z-10">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold mb-3 text-slate-900">
                        Interactive Strategy Guide
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Tell us what you're struggling with, and we'll build a custom plan for you.
                    </p>
                </div>

                {!schedule ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="relative">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="e.g., I have a calculus test on Friday and I don't understand Chain Rule..."
                                className="w-full p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg min-h-[150px] resize-none shadow-inner"
                            />
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !input.trim()}
                                className="absolute bottom-4 right-4 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating Plan...
                                    </>
                                ) : (
                                    <>
                                        <span>✨</span> Generate Schedule
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-3xl mx-auto bg-slate-50 rounded-2xl p-8 border border-slate-200"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-bold text-slate-800">Your Custom Schedule</h3>
                            <div className="flex gap-2">
                                <button onClick={handleCopy} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Copy">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                </button>
                                <button onClick={handleDownload} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                </button>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none mb-8 whitespace-pre-wrap font-medium text-slate-700">
                            {schedule}
                        </div>

                        <div className="border-t border-slate-200 pt-6">
                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                    Make changes to this schedule
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={editInput}
                                        onChange={(e) => setEditInput(e.target.value)}
                                        placeholder="e.g., I can't study on Saturday morning..."
                                        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleEdit}
                                        disabled={isGenerating}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        {isGenerating ? "Updating..." : "Update"}
                                    </button>
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="px-4 py-2 text-slate-500 hover:text-slate-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
