"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Play, CheckCircle2, Lock, ChevronDown, ChevronRight, Clock, GraduationCap, ArrowRight, Star, Pause, RotateCcw, ChevronLeft, Award, Home } from 'lucide-react';

// --- Types ---
interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  videoUrl: string;
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

// --- Mock Data ---
const SAMPLE_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

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
    isLocked: false,
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction to AI',
        lessons: [
          { id: 'l1', title: 'What is Generative AI?', duration: '0:10', isCompleted: false, isLocked: false, videoUrl: SAMPLE_VIDEO },
          { id: 'l2', title: 'The History of Neural Networks', duration: '8:45', isCompleted: false, isLocked: true, videoUrl: SAMPLE_VIDEO },
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Practical Prompt Engineering',
        lessons: [
          { id: 'l4', title: 'The Anatomy of a Good Prompt', duration: '10:30', isCompleted: false, isLocked: true, videoUrl: SAMPLE_VIDEO },
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Advanced React Patterns',
    description: 'Deep dive into React hooks, state management patterns, and performance optimization.',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    level: 'Advanced',
    duration: '6h 15m',
    rating: 4.9,
    isLocked: false,
    modules: [
        {
            id: 'm1', 
            title: 'Hooks Deep Dive', 
            lessons: [{id: 'l1', title: 'UseEffect Cleanup', duration: '5:00', isCompleted: false, isLocked: false, videoUrl: SAMPLE_VIDEO}]
        }
    ]
  },
  {
    id: 'c3',
    title: 'Effective Client Communication',
    description: 'Learn how to manage expectations, negotiate scope, and present your work effectively.',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    level: 'Intermediate',
    duration: '3h 45m',
    rating: 4.7,
    isLocked: false,
    modules: [
        {
            id: 'm1',
            title: 'Communication Basics',
            lessons: [
                { id: 'l1', title: 'Setting Expectations', duration: '4:20', isCompleted: false, isLocked: false, videoUrl: SAMPLE_VIDEO },
                { id: 'l2', title: 'Handling Feedback', duration: '6:15', isCompleted: false, isLocked: true, videoUrl: SAMPLE_VIDEO }
            ]
        }
    ]
  }
];

// --- Sub-Components ---

const CourseCompletionModal = ({ isOpen, onClose, onHome }: { isOpen: boolean; onClose: () => void; onHome: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 text-center relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-white -z-0"></div>
        <div className="p-8 relative z-10">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-white">
            <Award size={48} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Course Completed!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Congratulations! You've successfully mastered this course. Your certificate is now available in your profile.
          </p>
          <div className="space-y-3">
             <button onClick={onHome} className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                <Home size={18} /> Back to Learning Hub
             </button>
             <button onClick={onClose} className="w-full py-3.5 bg-white text-slate-500 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                Stay Here
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const UpskillView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [expandedModules, setExpandedModules] = useState<string[]>(['m1']);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Derived State
  const activeCourse = courses.find(c => c.id === activeCourseId);
  
  let activeLesson: Lesson | null = null;
  if (activeCourse && activeLessonId) {
    activeCourse.modules.forEach(mod => {
        const found = mod.lessons.find(l => l.id === activeLessonId);
        if (found) activeLesson = found;
    });
  }

  const isLastLesson = () => {
    if (!activeCourse) return false;
    const allLessons = activeCourse.modules.flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
    return currentIndex === allLessons.length - 1;
  };

  // --- LOGIC: COMPLETION ---

  const handleLessonComplete = () => {
    if (!activeCourse || !activeLesson) return;

    const finishedLastLesson = isLastLesson();

    setCourses(prevCourses => {
      const newCourses = [...prevCourses];
      const courseIndex = newCourses.findIndex(c => c.id === activeCourse.id);
      if (courseIndex === -1) return prevCourses;

      const course = newCourses[courseIndex];
      
      let unlockNext = false;
      let totalLessons = 0;
      let completedLessons = 0;

      for (const module of course.modules) {
        for (const lesson of module.lessons) {
          totalLessons++;
          
          if (lesson.id === activeLessonId) {
            if (!lesson.isCompleted) {
                lesson.isCompleted = true;
                completedLessons++;
            } else {
                completedLessons++;
            }
            unlockNext = true;
            continue;
          }

          if (unlockNext) {
            lesson.isLocked = false;
            unlockNext = false;
          }

          if (lesson.isCompleted) completedLessons++;
        }
      }

      course.progress = Math.round((completedLessons / totalLessons) * 100);
      return newCourses;
    });

    if (finishedLastLesson) {
        setShowCompletionModal(true);
    }
  };

  const handleNavigateLesson = (direction: 'next' | 'prev') => {
    if (!activeCourse) return;
    const allLessons = activeCourse.modules.flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
    
    if (direction === 'next') {
        if (currentIndex < allLessons.length - 1) {
            const nextLesson = allLessons[currentIndex + 1];
            if (!nextLesson.isLocked) {
                setActiveLessonId(nextLesson.id);
            }
        } else {
            setShowCompletionModal(true);
        }
    } else if (direction === 'prev' && currentIndex > 0) {
        setActiveLessonId(allLessons[currentIndex - 1].id);
    }
  };

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleOpenCourse = (course: Course) => {
    setActiveCourseId(course.id);
    const firstLesson = course.modules[0]?.lessons[0];
    setActiveLessonId(firstLesson?.id || null);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setActiveCourseId(null);
    setActiveLessonId(null);
    setShowCompletionModal(false);
  };

  // --- RENDER: COURSE LIST ---
  if (viewMode === 'list') {
    return (
      <div className="h-full p-8 overflow-y-auto bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Learning Hub</h1>
              <p className="text-slate-500 mt-2 text-lg">Expand your skills and unlock new opportunities.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
              <GraduationCap size={20} />
              <span className="font-bold text-sm">{courses.length} Courses Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group h-full ${course.isLocked ? 'opacity-75 grayscale' : ''}`}>
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
                  {course.isLocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Lock size={32} className="text-white" />
                    </div>
                  )}
                  {course.progress === 100 && (
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-emerald-500 text-white px-3 py-1 rounded-full font-bold text-sm flex items-center gap-2">
                           <CheckCircle2 size={16} /> Completed
                        </div>
                     </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm">
                    {course.level}
                  </div>
                  {course.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200">
                          <div className="h-full bg-emerald-500" style={{ width: `${course.progress}%` }}></div>
                      </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">{course.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-medium">
                      <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {course.rating}</span>
                    </div>

                    <button 
                      onClick={() => !course.isLocked && handleOpenCourse(course)}
                      disabled={course.isLocked}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-100 disabled:bg-slate-300 disabled:shadow-none"
                    >
                      {course.isLocked ? 'Locked' : course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Learning'} 
                      {!course.isLocked && <ArrowRight size={16} />}
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
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden animate-in slide-in-from-right duration-300 relative">
      
      <CourseCompletionModal 
        isOpen={showCompletionModal} 
        onClose={() => setShowCompletionModal(false)}
        onHome={handleBackToList}
      />

      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4 shrink-0">
        <button onClick={handleBackToList} className="p-2 hover:bg-gray-100 rounded-full text-slate-500 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-slate-900 truncate">{activeCourse.title}</h1>
          <div className="flex items-center gap-2 mt-1">
             <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${activeCourse.progress}%` }}></div>
             </div>
             <span className="text-xs text-slate-500 font-medium">{activeCourse.progress}% Complete</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={() => handleNavigateLesson('prev')}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-gray-50 disabled:opacity-50"
            >
                Previous
            </button>
            <button 
                onClick={() => handleNavigateLesson('next')}
                disabled={(() => {
                    const allLessons = activeCourse.modules.flatMap(m => m.lessons);
                    const idx = allLessons.findIndex(l => l.id === activeLessonId);
                    if (idx >= allLessons.length - 1) return false; 
                    return allLessons[idx + 1].isLocked;
                })()}
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLastLesson() ? 'Finish Course' : 'Next Lesson'}
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Main Content: Video Player */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
           <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-black rounded-2xl shadow-xl relative overflow-hidden group mb-6 border border-gray-900">
                 {/* FIX: Restored `key={activeLesson.id}`.
                    This tells React to create a brand new <video> element when the lesson changes.
                    The previous video is unmounted, which might trigger a harmless "AbortError" in the console
                    if it was buffering, but it prevents the UI "double load" race condition.
                 */}
                 <video 
                    ref={videoRef}
                    key={activeLesson.id}
                    src={activeLesson.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                    onEnded={handleLessonComplete}
                    onError={(e) => {
                       // Suppress the console noise if the browser aborts the fetch during unmount
                       const target = e.target as HTMLVideoElement;
                       if (target.error?.code === target.error?.MEDIA_ERR_ABORTED) return;
                       console.log("Video Error:", target.error);
                    }}
                 >
                    Your browser does not support the video tag.
                 </video>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                             {activeLesson.isCompleted ? (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full flex items-center gap-1 w-fit">
                                    <CheckCircle2 size={12} /> Completed
                                </span>
                             ) : (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-full w-fit">
                                    In Progress
                                </span>
                             )}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">{activeLesson.title}</h2>
                    </div>
                    <button className="text-slate-400 hover:text-amber-400 transition-colors">
                       <Star size={24} />
                    </button>
                 </div>
                 
                 <p className="text-slate-600 leading-relaxed mb-8">
                    In this lesson, you will master the core concepts. Watch the video above to complete this section. 
                    Once finished, your progress will be saved automatically.
                 </p>
                 
                 <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                    <button 
                        onClick={() => {
                            if (videoRef.current) {
                                videoRef.current.currentTime = 0;
                                videoRef.current.play();
                            }
                        }}
                        className="text-slate-500 hover:text-blue-600 font-bold text-sm flex items-center gap-2"
                    >
                       <RotateCcw size={16} /> Replay Video
                    </button>

                    {activeLesson.isCompleted ? (
                        isLastLesson() ? (
                            <button 
                                onClick={() => setShowCompletionModal(true)}
                                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center gap-2 animate-in fade-in zoom-in shadow-md shadow-emerald-100"
                            >
                                <Award size={18} /> Finish Course
                            </button>
                        ) : (
                             <button 
                                onClick={() => handleNavigateLesson('next')}
                                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 animate-in fade-in zoom-in"
                            >
                                Next Lesson <ChevronRight size={16} />
                            </button>
                        )
                    ) : (
                        <button 
                           onClick={handleLessonComplete}
                           className="px-6 py-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
                        >
                           Mark as Complete
                        </button>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar: Course Content */}
        <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-y-auto">
           <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-slate-800 text-lg">Course Content</h3>
           </div>
           
           <div className="divide-y divide-gray-100">
              {activeCourse.modules.map(module => (
                 <div key={module.id}>
                    <button 
                       onClick={() => toggleModule(module.id)}
                       className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors bg-gray-50/50"
                    >
                       <span className="font-bold text-sm text-slate-700">{module.title}</span>
                       {expandedModules.includes(module.id) ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                    </button>
                    
                    {expandedModules.includes(module.id) && (
                       <div className="py-2">
                          {module.lessons.map(lesson => {
                             const isActive = activeLessonId === lesson.id;
                             return (
                                <button 
                                   key={lesson.id}
                                   onClick={() => !lesson.isLocked && setActiveLessonId(lesson.id)}
                                   disabled={lesson.isLocked}
                                   className={`w-full px-6 py-3 flex items-start gap-3 text-left transition-colors border-l-4 ${
                                      isActive 
                                         ? 'bg-blue-50 border-blue-600' 
                                         : 'border-transparent hover:bg-gray-50'
                                   } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                   <div className="mt-0.5 shrink-0">
                                      {lesson.isCompleted ? (
                                         <CheckCircle2 size={18} className="text-emerald-500" />
                                      ) : lesson.isLocked ? (
                                         <Lock size={18} className="text-slate-300" />
                                      ) : (
                                         <div className={`w-4 h-4 rounded-full border-2 ${isActive ? 'border-blue-600' : 'border-slate-300'}`}></div>
                                      )}
                                   </div>
                                   <div>
                                      <p className={`text-sm font-medium leading-snug ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                                         {lesson.title}
                                      </p>
                                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-medium">
                                         {isActive ? <span className="text-blue-500">Playing...</span> : <span><Clock size={10} className="inline mr-1"/>{lesson.duration}</span>}
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