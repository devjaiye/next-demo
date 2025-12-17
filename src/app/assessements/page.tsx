"use client";

import React, { useState } from 'react';
import { 
  ClipboardCheck, Clock, CheckCircle2, Timer, 
  ChevronRight, Search, Filter, AlertCircle, 
  Briefcase, BrainCircuit, Code, FileText 
} from 'lucide-react';
// import { NavItem } from '../types';

// --- Types ---

interface Assessment {
  id: string;
  title: string;
  type: 'Technical' | 'Behavioral' | 'Cognitive' | 'Role-Specific';
  provider: string; // e.g. "Hackerrank", "TestGorilla", "Internal"
  duration: string;
  dueDate?: string;
  completedDate?: string;
  score?: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Expired';
  jobRole?: string; // Associated Job
}

// interface AssessmentsViewProps {
//   onNavigate?: (item: NavItem) => void;
// }

// --- Mock Data ---

const PENDING_ASSESSMENTS: Assessment[] = []; // Intentionally empty to match screenshot default state

const COMPLETED_ASSESSMENTS: Assessment[] = [
  {
    id: '1',
    title: 'React.js Advanced Assessment',
    type: 'Technical',
    provider: 'HackerRank',
    duration: '60 mins',
    completedDate: 'Nov 10, 2025',
    score: 92,
    status: 'Completed',
    jobRole: 'Frontend Developer @ Netflix'
  },
  {
    id: '2',
    title: 'Cognitive Ability Test',
    type: 'Cognitive',
    provider: 'Criteria Corp',
    duration: '30 mins',
    completedDate: 'Oct 25, 2025',
    score: 85,
    status: 'Completed',
    jobRole: 'Product Designer @ Linear'
  },
  {
    id: '3',
    title: 'Behavioral Profile',
    type: 'Behavioral',
    provider: 'Internal',
    duration: '45 mins',
    completedDate: 'Sep 15, 2025',
    status: 'Completed',
    jobRole: 'UX Researcher @ Spotify'
  }
];

// --- Components ---

const EmptyState = ({ onBrowse }: { onBrowse: () => void }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in zoom-in-95 duration-500">
    <div className="relative mb-6">
      <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center">
        <div className="relative">
           {/* Custom Illustration approximating the screenshot */}
           <div className="w-20 h-20 bg-blue-500 rounded-xl transform rotate-12 shadow-lg flex items-center justify-center relative z-10">
              <span className="text-4xl">📦</span>
           </div>
           <div className="absolute top-0 -left-4 w-12 h-12 bg-blue-200 rounded-lg transform -rotate-12 -z-0"></div>
           <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-300 rounded-full opacity-50 blur-sm"></div>
        </div>
      </div>
    </div>
    
    <h3 className="text-xl font-bold text-slate-900 mb-2">You have not applied for a job yet</h3>
    <p className="text-slate-500 max-w-sm mb-8 text-sm">
      View available jobs that matched your profile here
    </p>
    
    <button 
      onClick={onBrowse}
      className="px-6 py-2.5 bg-white border border-gray-200 text-slate-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
    >
      Browse Jobs
    </button>
  </div>
);

const AssessmentCard: React.FC<{ assessment: Assessment }> = ({ assessment }) => {
  const getIcon = () => {
    switch(assessment.type) {
      case 'Technical': return <Code size={20} />;
      case 'Cognitive': return <BrainCircuit size={20} />;
      case 'Behavioral': return <Briefcase size={20} />;
      default: return <FileText size={20} />;
    }
  };

  const getColor = () => {
    switch(assessment.type) {
      case 'Technical': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Cognitive': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'Behavioral': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${getColor()}`}>
          {getIcon()}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{assessment.title}</h4>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${getColor()}`}>
              {assessment.type}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-2">Requested by <span className="font-semibold text-slate-700">{assessment.provider}</span> for {assessment.jobRole}</p>
          
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1"><Timer size={12} /> {assessment.duration}</span>
            {assessment.dueDate && <span className="flex items-center gap-1 text-amber-600"><AlertCircle size={12} /> Due: {assessment.dueDate}</span>}
            {assessment.completedDate && <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={12} /> Completed: {assessment.completedDate}</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-6 border-t md:border-t-0 border-gray-50 pt-4 md:pt-0">
        {assessment.status === 'Completed' && assessment.score && (
          <div className="text-right">
            <p className="text-xs text-slate-400 font-bold uppercase">Score</p>
            <p className="text-xl font-bold text-emerald-600">{assessment.score}%</p>
          </div>
        )}
        
        {assessment.status === 'Pending' ? (
          <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap">
            Start Assessment
          </button>
        ) : (
          <button className="px-5 py-2.5 bg-white border border-gray-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
            View Results
          </button>
        )}
      </div>
    </div>
  );
};

const AssessmentsView: React.FC<AssessmentsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [pendingList] = useState<Assessment[]>(PENDING_ASSESSMENTS);
  const [completedList] = useState<Assessment[]>(COMPLETED_ASSESSMENTS);

  const activeList = activeTab === 'pending' ? pendingList : completedList;

  const handleBrowseJobs = () => {
    // if (onNavigate) {
    //   onNavigate(NavItem.ELITE_JOBS);
    // }
  };

  return (
    <div className="h-full p-8 overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assessment Requests</h1>
          <p className="text-slate-500 mt-1">Track your assessment invitations and view your completed results.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 px-4 text-sm font-medium mr-2 transition-all relative ${
              activeTab === 'pending' 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Pending
            {activeTab === 'pending' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 px-4 text-sm font-medium transition-all relative ${
              activeTab === 'completed' 
                ? 'text-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Completed
            {activeTab === 'completed' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></span>}
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {activeList.length > 0 ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Optional Filter/Search for populated list */}
              <div className="flex justify-between items-center mb-4">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {activeList.length} {activeTab} {activeList.length === 1 ? 'Assessment' : 'Assessments'}
                 </p>
                 <div className="flex gap-2">
                    <button className="p-2 bg-white border border-gray-200 rounded-lg text-slate-500 hover:bg-gray-50">
                       <Filter size={16} />
                    </button>
                 </div>
              </div>

              {activeList.map(assessment => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          ) : (
            <EmptyState onBrowse={handleBrowseJobs} />
          )}
        </div>

      </div>
    </div>
  );
};

export default AssessmentsView;
