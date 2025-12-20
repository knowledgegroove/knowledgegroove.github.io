"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PersonalizedPractice({ courseTitle }: { courseTitle: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<"start" | "loading" | "quiz" | "result">("start");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState<{ q: string; options: string[]; correct: number }[]>([]);

    const startQuiz = async () => {
        setStep("loading");
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: "Generate a quiz",
                    context: courseTitle,
                    mode: "quiz"
                }),
            });
            const data = await response.json();
            const parsedQuestions = JSON.parse(data.text);
            if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
                setQuestions(parsedQuestions);
                setStep("quiz");
            } else {
                throw new Error("Invalid quiz format");
            }
        } catch (error) {
            console.error("Failed to generate quiz", error);
            alert("Failed to generate quiz. Please try again.");
            setStep("start");
            setIsOpen(false);
        }
    };

    const handleAnswer = (optionIdx: number) => {
        if (optionIdx === questions[currentQuestion].correct) {
            setScore(prev => prev + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setStep("result");
        }
    };

    const resetQuiz = () => {
        setStep("start");
        setCurrentQuestion(0);
        setScore(0);
        setQuestions([]);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
                <span>🎯</span> Create Personalized Practice
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            {step === "start" && (
                                <div className="p-8 text-center">
                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                        🤖
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">AI Practice Generator</h2>
                                    <p className="text-slate-600 mb-8">
                                        I'll generate a quick quiz based on {courseTitle} to test your current knowledge gaps.
                                    </p>
                                    <button
                                        onClick={startQuiz}
                                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                                    >
                                        Start Quiz
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="mt-4 text-slate-500 hover:text-slate-800 text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {step === "loading" && (
                                <div className="p-12 text-center">
                                    <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />
                                    <p className="text-slate-600 font-medium">Generating questions...</p>
                                </div>
                            )}

                            {step === "quiz" && questions.length > 0 && (
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Question {currentQuestion + 1} of {questions.length}
                                        </span>
                                        <span className="text-xs font-bold text-indigo-600">
                                            {courseTitle}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-8 text-slate-800">
                                        {questions[currentQuestion].q}
                                    </h3>

                                    <div className="space-y-3">
                                        {questions[currentQuestion].options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswer(idx)}
                                                className="w-full p-4 text-left rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-slate-700"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === "result" && (
                                <div className="p-8 text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                                        🎉
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
                                    <p className="text-slate-600 mb-6">
                                        You scored <span className="font-bold text-indigo-600">{score}/{questions.length}</span>
                                    </p>
                                    <div className="bg-slate-50 p-4 rounded-xl mb-8 text-sm text-slate-600">
                                        <strong>AI Feedback:</strong>
                                        {score === questions.length
                                            ? "Perfect score! You've mastered this topic."
                                            : "Good effort! Review the topics you missed to solidify your understanding."}
                                    </div>
                                    <button
                                        onClick={resetQuiz}
                                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
