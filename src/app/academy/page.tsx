"use client";

import Link from "next/link";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  // Group courses by subject
  const coursesBySubject = courses.reduce((acc, course) => {
    if (!acc[course.subject]) {
      acc[course.subject] = [];
    }
    acc[course.subject].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Chatbot />
      {/* Hero Section */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 text-slate-900"
          >
            Knowledge Groove <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">Academy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            The premium platform for high school success. <br />
            Real advice. AI Strategy. Proven Results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center gap-6"
          >
            <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Explore Courses
            </button>
            <button className="px-10 py-4 bg-white/80 backdrop-blur-sm text-slate-900 rounded-full font-semibold border border-slate-200 hover:bg-white transition-all shadow-sm hover:shadow-md">
              AI Tutor
            </button>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Curated Course Directory</h2>
          <p className="text-slate-500 text-lg">Select a subject to begin your mastery journey.</p>
        </motion.div>

        <div className="space-y-24">
          {Object.entries(coursesBySubject).map(([subject, subjectCourses], idx) => (
            <div key={subject}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 mb-10"
              >
                <span className="text-3xl font-light text-slate-300">0{idx + 1}</span>
                <h3 className="text-3xl font-bold text-slate-800">{subject}</h3>
                <div className="h-px flex-1 bg-slate-200/50" />
              </motion.div>

              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {subjectCourses.map((course) => (
                  <motion.div key={course.id} variants={item}>
                    <Link
                      href={`/academy/courses/${course.id}`}
                      className="group block h-full"
                    >
                      <div className="h-full bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm hover:border-blue-200 transition-all hover:shadow-xl hover:-translate-y-2 relative overflow-hidden">
                        {/* Subtle inner gradient for card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                          <div className="mb-6">
                            <span className="px-4 py-1.5 bg-slate-100/80 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
                              {course.subject}
                            </span>
                          </div>
                          <h4 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </h4>
                          <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                            {course.description}
                          </p>
                          <div className="flex items-center text-sm font-bold text-slate-900 group-hover:translate-x-2 transition-transform">
                            View Strategy Guide <span className="ml-2">→</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
