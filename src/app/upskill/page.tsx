"use client"
import React, { useState } from 'react';
import { Play, CheckCircle2, Lock, ChevronDown, ChevronRight, Clock, GraduationCap, ArrowRight, Star } from 'lucide-react';

// Types
interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  thumbnail: string;
  level: string;
  duration: string;
  rating: number;
  isLocked: boolean;
  modules: Module[];
}

// Mock Data
const COURSES_DATA: Course[] = [
  {
    id: 'c1',
    title: 'AI Literacy for Contractors',
    description: 'Master the basics of Artificial Intelligence and learn how to leverage tools like Gemini to boost your productivity and automate routine tasks.',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    level: 'Beginner',
    duration: '4h 30m',
    rating: 4.8,
    isLocked: true,
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction to AI',
        lessons: [
          { id: 'l1', title: 'What is Generative AI?', duration: '5:20', isCompleted: false, isLocked: false },
          { id: 'l2', title: 'The History of Neural Networks', duration: '8:45', isCompleted: false, isLocked: true },
          { id: 'l3', title: 'Key Terminology', duration: '4:15', isCompleted: false, isLocked: true },
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Practical Prompt Engineering',
        lessons: [
          { id: 'l4', title: 'The Anatomy of a Good Prompt', duration: '10:30', isCompleted: false, isLocked: true },
          { id: 'l5', title: 'Iterative Refinement', duration: '12:00', isCompleted: false, isLocked: true },
          { id: 'l6', title: 'Using AI for Documentation', duration: '15:10', isCompleted: false, isLocked: true },
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Ethics and Security',
        lessons: [
          { id: 'l7', title: 'Data Privacy Basics', duration: '6:50', isCompleted: false, isLocked: true },
          { id: 'l8', title: 'Spotting Hallucinations', duration: '9:25', isCompleted: false, isLocked: true },
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Advanced React Patterns',
    description: 'Deep dive into React hooks, state management patterns, and performance optimization techniques for scalable applications.',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    level: 'Advanced',
    duration: '6h 15m',
    rating: 4.9,
    isLocked: true,
    modules: []
  },
  {
    id: 'c3',
    title: 'Effective Client Communication',
    description: 'Learn how to manage expectations, negotiate scope, and present your work effectively to stakeholders.',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    level: 'Intermediate',
    duration: '3h 45m',
    rating: 4.7,
    isLocked: true,
    modules: []
  }
];

const UpskillView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  
  // Player State
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>(['m1']);
  
  const [courses] = useState(COURSES_DATA);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleOpenCourse = (course: Course) => {
    setActiveCourse(course);
    setActiveLesson(course.modules[0]?.lessons[0] || null);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setActiveCourse(null);
  };

  // --- RENDER: COURSE LIST ---
  if (viewMode === 'list') {
    return (
      <div className="h-full p-8 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Learning Hub</h1>
              <p className="text-slate-500 mt-2 text-lg">Expand your skills and unlock new opportunities.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
              <GraduationCap size={20} />
              <span className="font-bold text-sm">3 Courses Available</span>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group h-full"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm">
                    {course.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-medium">
                      <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {course.rating}</span>
                    </div>

                    <button 
                      onClick={() => handleOpenCourse(course)}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                    >
                      {course.progress > 0 ? 'Continue Learning' : 'Start Learning'} 
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // --- RENDER: COURSE PLAYER (DETAIL VIEW) ---
  if (!activeCourse || !activeLesson) return null;

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4 shrink-0">
        <button 
          onClick={handleBackToList}
          className="p-2 hover:bg-gray-100 rounded-full text-slate-500 transition-colors"
        >
          <ArrowRight size={20} className="rotate-180" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-slate-900 truncate">{activeCourse.title}</h1>
          <div className="flex items-center gap-2 mt-0.5">
             <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${activeCourse.progress}%` }}></div>
             </div>
             <span className="text-xs text-slate-500 font-medium">{activeCourse.progress}% Complete</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Main Content: Video Player */}
        <div className="flex-1 overflow-y-auto p-8">
           <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-slate-900 rounded-2xl shadow-lg relative overflow-hidden group mb-6">
                 {/* Placeholder for Video Player */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform cursor-pointer mb-4">
                       <Play size={32} fill="currentColor" className="ml-1" />
                    </div>
                    <p className="font-medium text-lg">{activeLesson.title}</p>
                 </div>
                 
                 {/* Mock Controls */}
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-1 bg-white/30 rounded-full mb-4">
                       <div className="w-1/3 h-full bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-white text-xs">
                       <span>04:15 / {activeLesson.duration}</span>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-slate-900">{activeLesson.title}</h2>
                    <button className="text-slate-400 hover:text-slate-600">
                       <Star size={20} />
                    </button>
                 </div>
                 
                 <p className="text-slate-600 leading-relaxed mb-6">
                    In this lesson, we will explore the fundamental terminology used in the field of Artificial Intelligence. 
                    Understanding these terms is crucial for effective communication with AI systems and stakeholders.
                 </p>
                 
                 <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                    <button className="text-slate-500 hover:text-slate-800 font-medium text-sm flex items-center gap-2">
                       <ChevronDown className="rotate-90" size={16} /> Previous Lesson
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">
                       Mark as Complete
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar: Course Content */}
        <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-y-auto">
           <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-slate-800">Course Content</h3>
           </div>
           
           <div className="divide-y divide-gray-100">
              {activeCourse.modules.map(module => (
                 <div key={module.id}>
                    <button 
                       onClick={() => toggleModule(module.id)}
                       className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors bg-gray-50/30"
                    >
                       <span className="font-bold text-sm text-slate-700">{module.title}</span>
                       {expandedModules.includes(module.id) ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                    </button>
                    
                    {expandedModules.includes(module.id) && (
                       <div className="pb-2">
                          {module.lessons.map(lesson => {
                             const isActive = activeLesson.id === lesson.id;
                             return (
                                <button 
                                   key={lesson.id}
                                   onClick={() => !lesson.isLocked && setActiveLesson(lesson)}
                                   disabled={lesson.isLocked}
                                   className={`w-full px-6 py-3 flex items-start gap-3 text-left transition-colors border-l-4 ${
                                      isActive 
                                         ? 'bg-blue-50 border-blue-600' 
                                         : 'border-transparent hover:bg-gray-50'
                                   } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                   <div className="mt-0.5 shrink-0">
                                      {lesson.isCompleted ? (
                                         <CheckCircle2 size={16} className="text-emerald-500" />
                                      ) : lesson.isLocked ? (
                                         <Lock size={16} className="text-slate-400" />
                                      ) : (
                                         <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-blue-600' : 'border-slate-300'}`}></div>
                                      )}
                                   </div>
                                   <div>
                                      <p className={`text-sm font-medium leading-snug ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                                         {lesson.title}
                                      </p>
                                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                         <Clock size={10} /> {lesson.duration}
                                      </p>
                                   </div>
                                </button>
                             );
                          })}
                       </div>
                    )}
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default UpskillView;