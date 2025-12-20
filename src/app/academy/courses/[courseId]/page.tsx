"use client";

import { useState, useEffect } from "react";
import { courses, SituationGuide } from "@/data/courses";
import { notFound } from "next/navigation";
import Link from "next/link";
import AIStrategyGuide from "@/components/AIStrategyGuide";
import PersonalizedPractice from "@/components/PersonalizedPractice";
import StudentSituationSelector, { SituationType } from "@/components/StudentSituationSelector";
import Chatbot from "@/components/Chatbot";
import { motion, AnimatePresence } from "framer-motion";

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
    const [courseId, setCourseId] = useState<string | null>(null);
    const [situation, setSituation] = useState<SituationType | null>(null);
    const [guide, setGuide] = useState<SituationGuide | null>(null);

    useEffect(() => {
        params.then((p) => setCourseId(p.courseId));
    }, [params]);

    if (!courseId) return null; // Or a loading spinner

    const course = courses.find((c) => c.id === courseId);

    if (!course) {
        notFound();
    }

    const handleSituationSelect = (newSituation: SituationType) => {
        setSituation(newSituation);
        if (course.situationGuides && course.situationGuides[newSituation]) {
            setGuide(course.situationGuides[newSituation]);
        } else {
            setGuide(null);
        }
    };

    return (
        <main className="min-h-screen bg-white text-slate-900 font-sans pb-20">
            {/* Pass context to Chatbot */}
            <Chatbot courseId={course.id} situation={situation || undefined} />

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/academy" className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors">
                        ← Back to Courses
                    </Link>
                    <h1 className="text-lg font-bold hidden md:block text-slate-800">{course.title}</h1>
                    <div className="w-20" /> {/* Spacer */}
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
                {/* Title & Overview */}
                <section className="relative">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="flex-1">
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">{course.subject}</span>
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-slate-900 tracking-tight">{course.title}</h1>
                            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-light">
                                {course.description}
                            </p>
                        </div>
                        <div className="w-full md:w-auto">
                            <PersonalizedPractice courseTitle={course.title} />
                        </div>
                    </div>
                </section>

                {/* Student Situation Selector */}
                <StudentSituationSelector onSelect={handleSituationSelect} selected={situation} />

                {/* Dynamic Advice Section */}
                <AnimatePresence mode="wait">
                    {guide && (
                        <motion.section
                            key={situation}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2">💡 Tailored Advice</h3>
                                    <p className="text-blue-100 text-lg leading-relaxed mb-6">
                                        "{guide.advice}"
                                    </p>
                                    <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                                        <span className="font-bold text-yellow-300 uppercase text-xs tracking-wider">Priority Action</span>
                                        <span className="font-medium">{guide.priorityAction}</span>
                                    </div>
                                </div>
                                <div className="md:w-1/3 bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                                    <p className="text-sm opacity-80 mb-2">AI Tutor Context Updated:</p>
                                    <p className="italic font-medium">
                                        "I now know you're feeling {situation?.replace("-", " ")}. Ask me for a specific plan!"
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* AI Strategy Guide */}
                <AIStrategyGuide />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* How to Succeed */}
                        <section>
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-slate-900">
                                How to Succeed
                            </h2>
                            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 space-y-10">
                                <div>
                                    <h3 className="font-bold text-xl mb-3 text-slate-900">Strategy</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">{course.successTips.strategy}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div>
                                        <h3 className="font-bold text-xl mb-3 text-slate-900">Time Management</h3>
                                        <p className="text-slate-600 leading-relaxed">{course.successTips.timeManagement}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-3 text-slate-900">Common Mistakes</h3>
                                        <ul className="space-y-2">
                                            {course.successTips.mistakes.map((mistake, i) => (
                                                <li key={i} className="flex gap-3 text-slate-600">
                                                    <span className="text-red-400 font-bold">×</span>
                                                    {mistake}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Teachers */}
                        <section>
                            <h2 className="text-3xl font-bold mb-8 text-slate-900">Instructors</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {course.teachers.map((teacher, i) => (
                                    <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl font-bold text-slate-400">
                                                {teacher.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">{teacher.name}</h3>
                                                <p className="text-slate-500 text-sm">Instructor</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 mb-6 italic">"{teacher.style}"</p>
                                        <div className="flex flex-wrap gap-2">
                                            {teacher.strengths.map((strength, j) => (
                                                <span key={j} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
                                                    {strength}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Resources (Expanded) */}
                        <section>
                            <h2 className="text-3xl font-bold mb-8 text-slate-900">Resources & Materials</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Practice */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="text-2xl">✍️</span> Practice
                                    </h3>
                                    <ul className="space-y-4">
                                        {course.resources.practice.map((item, i) => (
                                            <li key={i}>
                                                <a href={item.url} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                                    <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{item.title}</span>
                                                    <span className="text-slate-300 group-hover:text-blue-400">↗</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Schedules */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="text-2xl">📅</span> Schedules & Plans
                                    </h3>
                                    <ul className="space-y-4">
                                        {course.resources.schedules.map((item, i) => (
                                            <li key={i}>
                                                <a href={item.url} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                                    <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{item.title}</span>
                                                    <span className="text-slate-300 group-hover:text-blue-400">↓</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Videos */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="text-2xl">📺</span> Video Lectures
                                    </h3>
                                    <ul className="space-y-4">
                                        {course.resources.videos.map((item, i) => (
                                            <li key={i}>
                                                <a href={item.url} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                                    <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{item.title}</span>
                                                    <span className="text-slate-300 group-hover:text-blue-400">▶</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Textbooks */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="text-2xl">📚</span> Textbooks
                                    </h3>
                                    <ul className="space-y-4">
                                        {course.resources.textbooks.map((item, i) => (
                                            <li key={i}>
                                                <a href={item.url} className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                                    <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{item.title}</span>
                                                    <span className="text-slate-300 group-hover:text-blue-400">↗</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Student Wisdom */}
                        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10" />
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                                <span>💬</span> Student Wisdom
                            </h3>
                            <div className="space-y-8 relative z-10">
                                {course.studentQuotes.map((quote, i) => (
                                    <div key={i} className="relative pl-4 border-l-2 border-blue-500/50">
                                        <p className="text-lg font-medium italic mb-3 text-slate-200">"{quote.text}"</p>
                                        <div className="flex justify-between items-center text-xs opacity-60 uppercase tracking-widest font-bold">
                                            <span>{quote.author}</span>
                                            <span>{quote.category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Class Advice */}
                        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                            <h3 className="text-xl font-bold mb-6 text-blue-900">Classroom Survival</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-blue-400 mb-2">Note Taking</h4>
                                    <p className="text-blue-800 font-medium">{course.classAdvice.noteTaking}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-blue-400 mb-2">Focus On</h4>
                                    <p className="text-blue-800 font-medium">{course.classAdvice.focus}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-blue-400 mb-2">Preparation</h4>
                                    <p className="text-blue-800 font-medium">{course.classAdvice.preparation}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
