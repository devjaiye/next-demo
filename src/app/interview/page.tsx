
"use client"
import React, { useState } from 'react';
import { 
  Users, Calendar, Clock, Video, MoreHorizontal, 
  MapPin, ChevronRight, ArrowLeft, 
  Briefcase, Code, CheckCircle2, Check
} from 'lucide-react';

// --- Types ---

interface Interview {
  id: string;
  jobTitle: string;
  jobId: string;
  company: string;
  date: string;
  time: string;
  duration: string;
  type: 'Virtual' | 'On-site';
  status: 'Upcoming' | 'Pending' | 'Completed';
  logo?: string;
  tags?: string[]; // For mock interviews
}

// --- Mock Data ---

const MOCK_INTERVIEWS: Interview[] = [
  {
    id: '1',
    jobTitle: 'Product Design',
    jobId: '90011',
    company: 'Flutterwave',
    date: 'Mon 7th, 2025',
    time: '10:30am',
    duration: '45 min',
    type: 'Virtual',
    status: 'Upcoming',
    logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: '2',
    jobTitle: 'Product Designer',
    jobId: '90011',
    company: 'Paystack',
    date: '22/10/22',
    time: '10:30am',
    duration: '30 min',
    type: 'Virtual',
    status: 'Upcoming',
  },
  {
    id: '3',
    jobTitle: 'Business Analyst',
    jobId: '81178',
    company: 'Accelo',
    date: '22/10/22',
    time: '10:30am',
    duration: '60 min',
    type: 'Virtual',
    status: 'Upcoming',
  },
  {
    id: '4',
    jobTitle: 'Data Scientist',
    jobId: '75711',
    company: 'Google',
    date: '22/10/22',
    time: '10:30am',
    duration: '45 min',
    type: 'Virtual',
    status: 'Upcoming',
  },
  {
    id: '5',
    jobTitle: 'Digital Marketer',
    jobId: '75751',
    company: 'Google',
    date: '22/10/22',
    time: '3:30pm',
    duration: '30 min',
    type: 'Virtual',
    status: 'Upcoming',
  },
  {
    id: '6',
    jobTitle: 'Web Developer',
    jobId: '66911',
    company: 'Apple',
    date: '15/08/22',
    time: '11am',
    duration: '60 min',
    type: 'Virtual',
    status: 'Upcoming',
  }
];

// --- Sub-Components ---

const InterviewCompletedModal = ({ isOpen, onClose, interview }: { isOpen: boolean; onClose: () => void; interview: Interview }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 relative">
        
        {/* Header Graphic */}
        <div className="h-48 bg-gradient-to-br from-blue-600 to-indigo-600 relative overflow-hidden flex items-center justify-center">
           {/* Decorative elements */}
           <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-20 right-20 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute bottom-10 left-1/3 w-1 h-1 bg-white rounded-full"></div>
           </div>
           
           {/* Center Circle & Icon */}
           <div className="relative z-10">
              <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                    <Check size={48} strokeWidth={3} className="text-white" />
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 text-center">
           <h2 className="text-2xl font-bold text-slate-900 mb-3">Interview Completed</h2>
           <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Thank you for completing your interview. You will be notified of the next steps once your interview has been reviewed.
           </p>

           <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left flex items-center gap-4 border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                 <Briefcase size={18} />
              </div>
              <div>
                 <h3 className="font-bold text-slate-900 text-sm">{interview.jobTitle}</h3>
                 <p className="text-xs text-slate-500">Full Time</p>
              </div>
           </div>

           <div className="flex flex-col gap-3">
              <button className="w-full py-3 bg-white border border-gray-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
                 View Application Status
              </button>
              <button 
                 onClick={onClose}
                 className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                 Return to Dashboard
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const DetailView = ({ interview, onBack }: { interview: Interview; onBack: () => void }) => {
  const [showCompleted, setShowCompleted] = useState(false);

  const handleJoinCall = () => {
    // Simulating call join and immediate completion for demo flow
    // In reality, this would open a new window/tab for the call
    setTimeout(() => {
       setShowCompleted(true);
    }, 1000);
  };

  const handleCloseCompleted = () => {
    setShowCompleted(false);
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <InterviewCompletedModal isOpen={showCompleted} onClose={handleCloseCompleted} interview={interview} />

      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
         <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={20} />
         </button>
         <h1 className="text-2xl font-bold text-slate-900">{interview.jobTitle}</h1>
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
         <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {interview.company.charAt(0)}
               </div>
               <div>
                  <h2 className="text-lg font-bold text-slate-900">{interview.jobTitle}</h2>
                  <p className="text-sm text-slate-500">Full Time</p>
               </div>
            </div>
            <button className="px-4 py-2 border border-gray-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors">
               View Job Details
            </button>
         </div>

         {/* Status Banner */}
         <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-emerald-100 text-emerald-600">
                  <Calendar size={20} />
               </div>
               <div>
                  <h3 className="font-bold text-slate-800 text-sm">Interview Confirmed</h3>
                  <p className="text-xs text-slate-500">Interview has been scheduled</p>
               </div>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700">
               Reschedule Interview
            </button>
         </div>

         {/* Date & Time */}
         <div className="mb-8">
            <h3 className="font-bold text-slate-900 mb-2">{interview.date}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-600">
               <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Clock size={14} /> 9AM to 12PM - 45 min
               </span>
               <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Calendar size={14} /> Today
               </span>
            </div>
         </div>

         {/* Actions */}
         <div className="flex gap-4">
            <button 
               onClick={handleJoinCall}
               className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
               Join Call
            </button>
            <button className="flex-1 py-3 bg-white border border-rose-200 text-rose-600 rounded-xl font-bold text-sm hover:bg-rose-50 transition-colors">
               Cancel Interview
            </button>
         </div>
      </div>

      {/* Recommended Interview / Mock Interview */}
      <div>
         <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
               <Video size={16} />
            </div>
            <div>
               <h3 className="font-bold text-slate-900">Recommended Interview</h3>
               <p className="text-xs text-slate-500">Mock Interviews we think you should practice</p>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-600">
               <Code size={20} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">AI Engineering</h3>
            <div className="flex flex-wrap gap-2 mb-6">
               <span className="px-2 py-1 bg-gray-100 text-slate-600 text-xs font-medium rounded-md">AI Algorithms</span>
               <span className="px-2 py-1 bg-gray-100 text-slate-600 text-xs font-medium rounded-md">Angular Frameworks</span>
               <span className="px-2 py-1 bg-gray-100 text-slate-600 text-xs font-medium rounded-md">+7 more</span>
            </div>
            <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
               Start mock interview
            </button>
         </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const InterviewsView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Invitations' | 'Completed'>('Upcoming');

  const handleInterviewClick = (interview: Interview) => {
    setSelectedInterview(interview);
    setViewMode('detail');
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedInterview(null);
  };

  if (viewMode === 'detail' && selectedInterview) {
    return (
      <div className="h-full p-8 overflow-y-auto bg-gray-50">
         <DetailView interview={selectedInterview} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="h-full p-8 overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Interviews</h1>
           <p className="text-slate-500 mt-1">View and manage your interviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                 <Users size={24} />
              </div>
              <div>
                 <p className="text-sm font-medium text-slate-500">Upcoming Interviews</p>
                 <h3 className="text-2xl font-bold text-slate-900">2</h3>
                 <p className="text-xs text-slate-400 mt-1">This week</p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                 <CheckCircle2 size={24} />
              </div>
              <div>
                 <p className="text-sm font-medium text-slate-500">Completed Interviews</p>
                 <h3 className="text-2xl font-bold text-slate-900">12</h3>
                 <p className="text-xs text-slate-400 mt-1">This Week</p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                 <Calendar size={24} />
              </div>
              <div>
                 <p className="text-sm font-medium text-slate-500">Pending Invitations</p>
                 <h3 className="text-2xl font-bold text-slate-900">2</h3>
                 <p className="text-xs text-slate-400 mt-1">All Pending</p>
              </div>
           </div>
        </div>

        {/* Hero Card: Next Upcoming */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500 rounded-full text-white">
                 <Calendar size={20} />
              </div>
              <h3 className="font-bold text-slate-800">Upcoming Interview</h3>
           </div>

           <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex gap-4">
                 <div className="w-14 h-14 bg-indigo-900 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0 overflow-hidden">
                    {MOCK_INTERVIEWS[0].logo ? <img src={MOCK_INTERVIEWS[0].logo} className="w-full h-full object-cover" /> : 'F'}
                 </div>
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{MOCK_INTERVIEWS[0].jobTitle}</h2>
                    <p className="text-slate-500 font-medium mb-3">{MOCK_INTERVIEWS[0].company}</p>
                    <p className="font-bold text-slate-800 mb-3">{MOCK_INTERVIEWS[0].date}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                       <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                          <Clock size={14} /> 9AM to 12PM ({MOCK_INTERVIEWS[0].duration})
                       </div>
                       <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                          <Calendar size={14} /> In 6 days
                       </div>
                       <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                          <MapPin size={14} /> {MOCK_INTERVIEWS[0].type}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                 <button 
                    onClick={() => handleInterviewClick(MOCK_INTERVIEWS[0])}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
                 >
                    Join Interview
                 </button>
                 <button 
                    onClick={() => handleInterviewClick(MOCK_INTERVIEWS[0])}
                    className="px-6 py-2.5 bg-white border border-gray-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors whitespace-nowrap"
                 >
                    View Details
                 </button>
              </div>
           </div>
        </div>

        {/* List Section */}
        <div className="space-y-6">
           <div className="flex border-b border-gray-200">
              {['Upcoming Interviews', 'Interview Invitations', 'Completed Interviews'].map(tab => {
                 const key = tab.split(' ')[0] as 'Upcoming' | 'Invitations' | 'Completed';
                 return (
                    <button 
                       key={key}
                       onClick={() => setActiveTab(key)}
                       className={`pb-3 px-1 text-sm font-bold mr-6 transition-all border-b-2 ${
                          activeTab === key ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                       }`}
                    >
                       {tab}
                    </button>
                 )
              })}
           </div>

           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-slate-800 text-lg">Upcoming interviews</h3>
                 <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={20} />
                 </button>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                       <tr>
                          <th className="px-6 py-4">Job Title</th>
                          <th className="px-6 py-4">Company</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Time (WAT)</th>
                          <th className="px-6 py-4"></th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {MOCK_INTERVIEWS.map(interview => (
                          <tr key={interview.id} className="hover:bg-gray-50/60 transition-colors group">
                             <td className="px-6 py-5">
                                <span className="block text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{interview.jobTitle}</span>
                                <span className="block text-xs text-slate-400 mt-0.5">{interview.jobId}</span>
                             </td>
                             <td className="px-6 py-5 text-sm text-slate-600">{interview.company}</td>
                             <td className="px-6 py-5 text-sm text-slate-600">{interview.date}</td>
                             <td className="px-6 py-5 text-sm text-slate-600">{interview.time}</td>
                             <td className="px-6 py-5 text-right">
                                <button 
                                   onClick={() => handleInterviewClick(interview)}
                                   className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                   View
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <span className="text-sm text-slate-500 font-medium pl-2">Page 1 of 3</span>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors shadow-sm">
                      Previous
                    </button>
                    <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors shadow-sm">
                      Next
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default InterviewsView;
