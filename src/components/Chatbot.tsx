"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/data/courses";

export default function Chatbot({ courseId, situation }: { courseId?: string, situation?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
        { role: "ai", text: "Hi! I'm your AI tutor. Ask me anything about your courses or high school life!" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

    // Update initial message when context changes
    useEffect(() => {
        if (courseId && situation) {
            const course = courses.find(c => c.id === courseId);
            const guide = course?.situationGuides?.[situation];
            if (guide) {
                setMessages(prev => [
                    ...prev,
                    { role: "ai", text: `I see you're looking at ${course?.title} and feeling "${situation}". ${guide.chatbotContext} How can I help you with your plan?` }
                ]);
                setIsOpen(true);
            }
        }
    }, [courseId, situation]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user" as const, text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Determine context
            let context = "General High School";
            if (courseId) {
                const course = courses.find(c => c.id === courseId);
                context = course ? course.title : courseId;
            } else if (pathname.includes("/courses/")) {
                const pathId = pathname.split("/").pop();
                const course = courses.find(c => c.id === pathId);
                context = course ? course.title : (pathId || "General");
            }

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg.text,
                    context,
                    situation: situation || "General Inquiry"
                }),
            });

            const data = await response.json();

            if (data.error) {
                if (data.error.includes("GEMINI_API_KEY")) {
                    setMessages((prev) => [...prev, { role: "ai", text: "⚠️ Please set your GEMINI_API_KEY in the .env file to enable the AI features." }]);
                } else {
                    setMessages((prev) => [...prev, { role: "ai", text: `Error: ${data.error}` }]);
                }
            } else {
                setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
            }
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white/90 backdrop-blur-xl dark:bg-slate-900/90 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700 flex flex-col overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <span>🤖</span> AI Tutor
                                </h3>
                                <p className="text-xs opacity-90">
                                    {courseId ? `Context: ${courses.find(c => c.id === courseId)?.title}` : "Always here to help"}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-800/50">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-br-none shadow-md"
                                            : "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-600"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-600 flex gap-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask for help or practice problems..."
                                    className="flex-1 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                )}
            </motion.button>
        </>
    );
}
