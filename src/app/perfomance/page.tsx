"use client"
import React, { useState } from 'react';
import { 
  Target, StickyNote, Activity, MessageSquare, ClipboardCheck, 
  Plus, Pin, Share, Search, Star, ChevronRight, ArrowRight, 
  CheckCircle2, Clock, Calendar, User, ShieldCheck, Lock, Eye,
  X, Save, AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceViewProps {
  isReadOnly?: boolean;
}

type TabType = 'goals' | 'notes' | 'pulse' | 'feedback' | 'reviews';

// --- Mock Data ---

const INITIAL_GOALS = [
  { id: 1, title: 'Deliver UI Kit v2', category: 'Deliverable', dueDate: '2025-11-30', status: 'In Progress', progress: 60 },
  { id: 2, title: 'Complete React Advanced Cert', category: 'Skill', dueDate: '2025-12-15', status: 'Not Started', progress: 0 },
  { id: 3, title: 'Migrate Legacy DB', category: 'Project Milestone', dueDate: '2025-10-15', status: 'Completed', progress: 100 },
];

const MOCK_NOTES = [
  { id: 1, title: 'Meeting Notes: Q4 Planning', date: 'Nov 18, 2025', shared: true, pinned: true, content: 'Key objectives discuss for Q4...' },
  { id: 2, title: 'Idea for Component Lib', date: 'Nov 15, 2025', shared: false, pinned: false, content: 'Refactor button component to support...' },
  { id: 3, title: 'Deployment Checklist', date: 'Nov 10, 2025', shared: false, pinned: true, content: '1. Check ENV variables...' },
];

const MOCK_PULSE_DATA = [
  { date: 'Week 1', sentiment: 4 },
  { date: 'Week 2', sentiment: 5 },
  { date: 'Week 3', sentiment: 3 },
  { date: 'Week 4', sentiment: 4 },
  { date: 'Week 5', sentiment: 5 },
];

const MOCK_FEEDBACK = [
  { id: 1, from: 'Client Manager', type: 'Received', date: 'Nov 01, 2025', rating: 5, comment: 'Excellent work on the dashboard migration!' },
  { id: 2, from: 'Alex (You)', type: 'Given', date: 'Oct 20, 2025', rating: 4, comment: 'Clear requirements provided.' },
];

const MOCK_REVIEWS = [
  { id: 1, title: 'Q3 2025 Performance Review', status: 'Completed', date: 'Oct 15, 2025', rating: 'Exceeds Expectations' },
  { id: 2, title: 'Project Alpha End Review', status: 'Pending Sign-off', date: 'Nov 20, 2025', rating: 'Pending' },
];

// --- Sub-Components ---

const GoalsTab = ({ isReadOnly }: { isReadOnly: boolean }) => {
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Goal Form State
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'Deliverable',
    dueDate: '',
    description: ''
  });

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.dueDate) return;

    const goalToAdd = {
      id: goals.length + 1,
      title: newGoal.title,
      category: newGoal.category,
      dueDate: newGoal.dueDate,
      status: 'Not Started',
      progress: 0
    };

    setGoals([goalToAdd, ...goals]);
    setIsModalOpen(false);
    setNewGoal({ title: '', category: 'Deliverable', dueDate: '', description: '' });
  };

  return (
    <div className="space-y-6 relative">
      {/* Create Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-slate-900">Create New Goal</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Goal Title</label>
                <input 
                  type="text" 
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  placeholder="e.g. Complete User Testing"
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Category</label>
                  <select 
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                  >
                    <option value="Deliverable">Deliverable</option>
                    <option value="Skill">Skill</option>
                    <option value="Project Milestone">Project Milestone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Due Date</label>
                  <input 
                    type="date" 
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Description (Optional)</label>
                <textarea 
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder="Describe the outcome or success criteria..."
                  className="w-full h-24 p-3 bg-white border border-gray-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 bg-white border border-gray-200 text-slate-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateGoal}
                disabled={!newGoal.title || !newGoal.dueDate}
                className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Active Goals</h2>
        {!isReadOnly && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={16} /> New Goal
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {goals.map(goal => (
          <div key={goal.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                  goal.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                  goal.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {goal.status}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-2 group-hover:text-blue-600 transition-colors">{goal.title}</h3>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                <Calendar size={12} /> Due {new Date(goal.dueDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-500 mb-1">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    goal.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                  }`} 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-slate-400">
              <span className="font-medium bg-slate-50 px-2 py-0.5 rounded">{goal.category}</span>
              <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 font-bold">
                View Details <ArrowRight size={12} />
              </span>
            </div>
          </div>
        ))}
        
        {goals.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Target size={32} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-slate-600 font-medium mb-1">No goals set yet</h3>
            <p className="text-xs text-slate-400">Create a goal to start tracking your progress.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const NotesTab = ({ isReadOnly }: { isReadOnly: boolean }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-800">My Notes</h2>
      <div className="flex gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search notes..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 w-48" />
        </div>
        {!isReadOnly && (
          <button className="px-4 py-2 bg-amber-400 text-amber-950 rounded-lg text-sm font-bold hover:bg-amber-500 flex items-center gap-2">
            <Plus size={16} /> Create Note
          </button>
        )}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MOCK_NOTES.map(note => (
        <div key={note.id} className="bg-yellow-50 p-5 rounded-xl border border-yellow-100 shadow-sm hover:shadow-md transition-all flex flex-col h-48 relative group">
          {note.pinned && <Pin size={16} className="absolute top-4 right-4 text-amber-600 fill-amber-600" />}
          <h3 className="font-bold text-slate-800 mb-1 pr-6 truncate">{note.title}</h3>
          <p className="text-xs text-slate-400 mb-3">{note.date}</p>
          <p className="text-sm text-slate-600 flex-1 overflow-hidden">{note.content}</p>
          <div className="mt-4 pt-3 border-t border-yellow-200/50 flex justify-between items-center">
            {note.shared ? (
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                <Eye size={10} /> Shared with Client
              </span>
            ) : (
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                <Lock size={10} /> Private
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PulseTab = () => (
  <div className="space-y-6">
      pulse

  
  </div>
);

const FeedbackTab = ({ isReadOnly }: { isReadOnly: boolean }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-800">Feedback Log</h2>
      {!isReadOnly && (
        <button className="px-4 py-2 border border-gray-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
          <MessageSquare size={16} /> Request Feedback
        </button>
      )}
    </div>
    <div className="space-y-4">
      {MOCK_FEEDBACK.map(fb => (
        <div key={fb.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${fb.type === 'Received' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
            {fb.type === 'Received' ? <ArrowRight size={20} className="rotate-45" /> : <Share size={18} />}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{fb.type === 'Received' ? `From: ${fb.from}` : `To: ${fb.from}`}</h4>
                <p className="text-xs text-slate-400">{fb.date}</p>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < fb.rating ? "currentColor" : "none"} className={i < fb.rating ? "" : "text-gray-300"} />)}
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-2 bg-gray-50 p-3 rounded-lg italic">"{fb.comment}"</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ReviewsTab = ({ isReadOnly }: { isReadOnly: boolean }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-800">Review Cycles</h2>
    </div>
    
    {/* Current Cycle Card */}
    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
          <ClipboardCheck size={32} className="text-blue-400" />
        </div>
        <div>
          <p className="text-blue-400 font-bold text-xs uppercase tracking-wide mb-1">Current Cycle</p>
          <h3 className="text-2xl font-bold">End of Year Review 2025</h3>
          <p className="text-slate-400 text-sm mt-1">Due by Dec 15, 2025</p>
        </div>
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <button className="flex-1 md:flex-none px-5 py-2.5 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-100 transition-colors">
          Start Self-Review
        </button>
      </div>
    </div>

    <h3 className="font-bold text-slate-500 text-sm uppercase tracking-wide mt-8 mb-2">History</h3>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-xs uppercase text-slate-500 font-semibold">
          <tr>
            <th className="px-6 py-4">Review Name</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Rating</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {MOCK_REVIEWS.map(review => (
            <tr key={review.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-800">{review.title}</td>
              <td className="px-6 py-4 text-slate-500 text-sm">{review.date}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  review.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {review.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-700">{review.rating}</td>
              <td className="px-6 py-4 text-right text-slate-400 hover:text-blue-600 cursor-pointer">
                <ChevronRight size={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main Component ---

const PerformanceView: React.FC<PerformanceViewProps> = ({ isReadOnly = false }) => {
  const [activeTab, setActiveTab] = useState<TabType>('goals');

  const tabs = [
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'notes', label: 'Notes', icon: StickyNote },
    { id: 'pulse', label: 'Pulse', icon: Activity },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: ClipboardCheck },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 px-8 pt-6 pb-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Performance</h1>
            <p className="text-slate-500 mt-1">Manage goals, feedback, and reviews.</p>
          </div>
        </div>
        
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 pb-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id 
                  ? 'border-slate-900 text-slate-900' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'goals' && <GoalsTab isReadOnly={isReadOnly} />}
          {activeTab === 'notes' && <NotesTab isReadOnly={isReadOnly} />}
          {activeTab === 'pulse' && <PulseTab />}
          {activeTab === 'feedback' && <FeedbackTab isReadOnly={isReadOnly} />}
          {activeTab === 'reviews' && <ReviewsTab isReadOnly={isReadOnly} />}
        </div>
      </div>
    </div>
  );
};

export default PerformanceView;