import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, GraduationCap, X, FileText, Sparkles, Layout } from 'lucide-react';

const courses = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: <Sparkles size={28} />,
    color: "from-indigo-600 to-violet-700",
    shadow: "shadow-indigo-500/20",
    description: "Intelligent Systems, Heuristic Search, and Adversarial Games.",
    units: [
      { title: "Unit 1: Foundations & State-Space", link: "/notes/AI_U1.pdf" },
      { title: "Unit 2: Problem Solving Agents", link: "/notes/AI_U2.pdf" },
      { title: "Unit 3: Adversarial Search", link: "/notes/AI_U3.pdf" },
      { title: "Unit 4: Knowledge & Reasoning", link: "/notes/AI_U4.pdf" },
      { title: "Unit 5: First-Order Logic", link: "/notes/AI_U5.pdf" }
    ]
  },
  {
    id: "sepm",
    title: "Software Engineering",
    icon: <Layout size={28} />,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    description: "Process Models, Requirements Analysis, and Project Planning.",
    units: [
      { title: "Unit 1: Nature of Software", link: "/notes/SEPM_U1.pdf" },
      { title: "Unit 2: Requirement Engineering", link: "/notes/SEPM_U2.pdf" },
      { title: "Unit 3: Project Initiation & Planning", link: "/notes/SEPM_U3.pdf" }
    ]
  }
];

export default function App() {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('elearning_progress_v3');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    localStorage.setItem('elearning_progress_v3', JSON.stringify([...completed]));
  }, [completed]);

  const totalUnits = courses.reduce((acc, c) => acc + c.units.length, 0);
  const progressPercent = Math.round((completed.size / totalUnits) * 100);

  return (
    <div className="min-h-screen text-slate-200 font-sans antialiased">
      {/* Visual background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>

      <nav className="p-8 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <GraduationCap className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">SANDIP Portal</span>
        </div>
        
        <div className="glass-card px-6 py-2 rounded-2xl flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400">TOTAL PROGRESS</span>
          <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500" 
            />
          </div>
          <span className="text-sm font-black text-indigo-400">{progressPercent}%</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="text-6xl font-black text-white mb-4"
          >
            E- <span className="text-indigo-500">Learning</span> Portal
          </motion.h1>
          <p className="text-slate-400 max-w-xl text-lg">
            Access your department notes and track your unit-wise progress in real-time.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCourse(course)}
              className={`glass-card p-10 rounded-[2.5rem] cursor-pointer group relative overflow-hidden`}
            >
              <div className={`absolute -right-4 -top-4 w-40 h-40 bg-gradient-to-br ${course.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} ${course.shadow} flex items-center justify-center text-white mb-8 transition-transform group-hover:scale-110`}>
                {course.icon}
              </div>

              <h2 className="text-3xl font-black text-white mb-4 leading-tight">{course.title}</h2>
              <p className="text-slate-400 mb-8 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-400 uppercase tracking-widest">
                <span>View Units</span>
                <div className="w-8 h-[1px] bg-indigo-400 transition-all group-hover:w-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedCourse && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              className="glass-card w-full max-w-2xl rounded-[3rem] overflow-hidden border-white/10"
            >
              <div className={`p-10 bg-gradient-to-r ${selectedCourse.color} flex justify-between items-center`}>
                <h3 className="text-3xl font-black text-white">{selectedCourse.title}</h3>
                <button onClick={() => setSelectedCourse(null)} className="p-3 bg-white/20 hover:bg-white/40 rounded-full text-white transition-all hover:rotate-90">
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {selectedCourse.units.map((unit, i) => {
                  const isDone = completed.has(unit.title);
                  return (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                      <button 
                        onClick={() => {
                          const next = new Set(completed);
                          isDone ? next.delete(unit.title) : next.add(unit.title);
                          setCompleted(next);
                        }}
                        className={`transition-all ${isDone ? 'text-emerald-400 scale-110' : 'text-slate-600'}`}
                      >
                        <CheckCircle size={32} fill={isDone ? "currentColor" : "none"} />
                      </button>
                      
                      <div className="flex-1">
                        <a href={unit.link} target="_blank" rel="noreferrer" className={`text-lg font-bold block transition-colors ${isDone ? 'text-slate-500 line-through' : 'text-white hover:text-indigo-400'}`}>
                          {unit.title}
                        </a>
                      </div>
                      <FileText size={20} className="text-slate-500" />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}