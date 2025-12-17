"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, ArrowDown, Check, ChevronLeft, 
  Briefcase, CheckCircle2, ChevronUp, Building2, Clock, 
  User, Zap, MapPin, Globe, Phone, Linkedin, FileText, 
  Download, Upload, Video, Play, Plus, Edit2, ChevronRight,
  Github, Terminal, ChevronDown
} from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  jobType: 'Permanent' | 'Contract';
  status: 'Closed' | 'Live';
  dateApplied: string;
  // Extended fields for detail view
  logo?: string;
  rate?: string;
  duration?: string;
  applicants?: number;
  lastActive?: string;
  description?: string;
  requirements?: string[];
  technologies?: string[];
  skills?: { name: string; status: 'Passed' | 'Failed'; icon: React.ElementType }[];
}

const MOCK_APPLICATIONS: Application[] = [
  { 
    id: '1', 
    jobTitle: 'Product Design', 
    company: 'Google Inc', 
    jobType: 'Permanent', 
    status: 'Closed', 
    dateApplied: '22/02/2022',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=100&h=100',
    rate: '£85k/year',
    duration: 'Permanent',
    applicants: 124,
    lastActive: '2 weeks ago',
    description: 'We are looking for a Product Designer to join our team and help us build the future of Google Search. You will work closely with PMs and Engineers to deliver high quality designs.',
    skills: [{ name: 'Figma', status: 'Passed', icon: Zap }, { name: 'Prototyping', status: 'Passed', icon: Zap }]
  },
  { 
    id: '2', 
    jobTitle: 'Product designer', 
    company: 'Google Inc', 
    jobType: 'Contract', 
    status: 'Live', 
    dateApplied: '22/02/2022',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=100&h=100',
    rate: '£550/day',
    duration: '6 Months',
    applicants: 45,
    lastActive: '1 day ago',
    description: 'Join our Cloud team as a Contract Product Designer. Focus on enterprise dashboard experiences and data visualization.',
    skills: [{ name: 'Sketch', status: 'Passed', icon: Zap }]
  },
  { 
    id: '3', 
    jobTitle: 'Product designer', 
    company: 'Google Inc', 
    jobType: 'Contract', 
    status: 'Live', 
    dateApplied: '22/02/2022',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=100&h=100',
    rate: '£500/day',
    duration: '3 Months',
    applicants: 22,
    lastActive: '3 days ago'
  },
  { 
    id: '4', 
    jobTitle: 'Product designer', 
    company: 'Shopify inc', 
    jobType: 'Contract', 
    status: 'Closed', 
    dateApplied: '22/02/2022',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=100&h=100',
    rate: '$90/hr',
    duration: '12 Months',
    applicants: 89,
    lastActive: '1 month ago'
  },
  { 
    id: '5', 
    jobTitle: 'Ux designer', 
    company: 'Paypal', 
    jobType: 'Permanent', 
    status: 'Closed', 
    dateApplied: '22/02/2022',
    logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=100&h=100',
    rate: '$110k/year',
    duration: 'Permanent',
    applicants: 200,
    lastActive: '3 weeks ago'
  },
  { 
    id: '6', 
    jobTitle: 'Frontend Engineer', 
    company: 'Netflix', 
    jobType: 'Permanent', 
    status: 'Live', 
    dateApplied: '21/02/2022',
    logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=100&h=100',
    rate: '$160k/year',
    duration: 'Permanent',
    applicants: 340,
    lastActive: '4 hours ago'
  },
  { 
    id: '7', 
    jobTitle: 'Backend Developer', 
    company: 'Amazon', 
    jobType: 'Contract', 
    status: 'Live', 
    dateApplied: '20/02/2022',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=100&h=100',
    rate: '$100/hr',
    duration: '18 Months',
    applicants: 150,
    lastActive: '2 days ago'
  },
  { 
    id: '8', 
    jobTitle: 'Design Systems Lead', 
    company: 'Spotify', 
    jobType: 'Permanent', 
    status: 'Closed', 
    dateApplied: '15/01/2022',
    logo: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?auto=format&fit=crop&q=80&w=100&h=100',
    rate: '£95k/year',
    duration: 'Permanent',
    applicants: 67,
    lastActive: '1 month ago'
  },
];

// Reusing detail component structure logic
const ApplicationDetail = ({ application, onBack }: { application: Application, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Your Application' | 'Inbox'>('Your Application');
  const [isProgressExpanded, setIsProgressExpanded] = useState(true);

  // Fallback data if not present in mock
  const appDetails = {
    ...application,
    description: application.description || 'Exoska svajpa önynade, tills dena. Stefan Henriksson ygisk. Hanna Svensson Roger Jonasson. Hemimynat teralårat pantopi sament. Christer Lundin Mona Lundström. Lörem ipsum alexandra Holmgren platt. Spenat rur kötans inklusive beng. Fölaras David Arvidsson Sebastian Holm i Dan Lundberg. Erika Lundqvist geolivis köttskatt tvåkönsnorm. Frida Wallin',
    requirements: application.requirements || [
      'Gather and evaluate user requirements in collaboration with product managers and engineers',
      'Illustrate design ideas using storyboards, process flows and sitemaps',
      'Design graphic user interface elements, like menus, tabs and widgets'
    ],
    technologies: application.technologies || ['Figma', 'Sketch', 'Invision'],
    skills: application.skills || [
      { name: 'Git Hub', status: 'Passed', icon: Github },
      { name: 'Node Js', status: 'Passed', icon: Terminal } 
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
       {/* Breadcrumbs */}
       <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <button onClick={onBack} className="hover:text-blue-600 transition-colors flex items-center gap-1">
             <ChevronLeft size={14} /> Back to Applications
          </button>
       </div>

       {/* Header Tabs */}
       <div className="border-b border-gray-200">
          <div className="flex gap-8">
             {(['Overview', 'Your Application', 'Inbox'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  {tab}
                </button>
             ))}
          </div>
       </div>

       {/* Overview Tab */}
       {activeTab === 'Overview' && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
               
               {/* Job Header Card */}
               <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 overflow-hidden border border-gray-100">
                     {appDetails.logo ? (
                        <img src={appDetails.logo} alt={appDetails.company} className="w-full h-full object-cover" />
                     ) : (
                        <span className="text-2xl font-bold text-slate-400">{appDetails.company.charAt(0)}</span>
                     )}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900">{appDetails.jobTitle}</h2>
                  <p className="text-slate-500 font-medium mb-4">{appDetails.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                     <div className="flex items-center gap-1.5 font-medium text-slate-900"><User size={16} /> {appDetails.applicants || 0} Applicants</div>
                     <div className="flex items-center gap-1.5">Last Active: <span className="font-medium text-slate-900">{appDetails.lastActive || 'Recently'}</span></div>
                     <div className="font-bold text-slate-900">{appDetails.rate || 'Competitive'}</div>
                     <div>Duration: <span className="font-medium text-slate-900">{appDetails.duration || 'N/A'}</span></div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                     <div className="flex items-center gap-1"><Building2 size={16} /> Tech</div>
                     <div className="flex items-center gap-1"><User size={16} /> 50+ employees</div>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-100 w-fit">
                    <CheckCircle2 size={18} /> Application Submitted
                  </div>
               </div>

               {/* Description Card */}
               <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-6">
                  <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-2">Project Overview</h3>
                     <p className="text-sm text-slate-600 leading-relaxed">
                        {appDetails.description}
                     </p>
                  </div>

                  {appDetails.requirements && (
                     <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Job Description</h3>
                        <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-slate-600">
                           {appDetails.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
               <div className="bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden sticky top-6">
                  <div className="p-6 border-b border-blue-100 bg-blue-50/30">
                     <h3 className="font-bold text-slate-900">Application Summary</h3>
                  </div>
                  <div className="p-6 space-y-6">
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                           <Briefcase size={18} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">Job Role</p>
                           <p className="text-xs text-slate-500">{appDetails.jobTitle}</p>
                        </div>
                     </div>

                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                           <CheckCircle2 size={18} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">Experience Required</p>
                           <p className="text-xs text-slate-500">2+ Years</p>
                        </div>
                     </div>

                     <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                           <User size={18} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900 mb-2">How you match this role</p>
                           <ul className="space-y-2 text-xs text-slate-600">
                              <li>Matched your salary expectations</li>
                              <li>Category: {appDetails.jobTitle}</li>
                              <li>2 years experience</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
       )}

       {/* Your Application Tab */}
       {activeTab === 'Your Application' && (
         <div className="space-y-8 animate-in fade-in duration-300">
            {/* Progress Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors" 
                onClick={() => setIsProgressExpanded(!isProgressExpanded)}
              >
                 <h3 className="font-bold text-slate-800">Application Progress</h3>
                 {isProgressExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
              </button>
              
              {isProgressExpanded && (
                 <div className="px-6 pb-8 pt-2 overflow-x-auto">
                    <div className="relative mt-4 min-w-[600px]">
                       {/* Timeline Bar Background */}
                       <div className="absolute top-4 left-6 right-6 h-0.5 bg-gray-100 -z-10"></div>
                       {/* Completed Bar - Dynamic width based on status */}
                        <div className="absolute top-4 left-6 h-0.5 bg-emerald-500 -z-10 transition-all duration-1000" style={{width: appDetails.status === 'Closed' ? '30%' : '60%'}}></div>

                       <div className="flex justify-between items-start relative z-10">
                          {/* Step 1 */}
                          <div className="flex flex-col items-center gap-3 w-24">
                             <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm ring-4 ring-white">
                                <Check size={16} strokeWidth={3} />
                             </div>
                             <div className="text-center">
                                <p className="text-xs font-bold text-slate-800 leading-tight">Invitation Accepted</p>
                                <p className="text-[10px] text-slate-400 mt-1">{appDetails.dateApplied}</p>
                             </div>
                          </div>
                          
                          {/* Step 2 */}
                          <div className="flex flex-col items-center gap-3 w-24">
                             <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm ring-4 ring-white">
                                <Check size={16} strokeWidth={3} />
                             </div>
                             <div className="text-center">
                                <p className="text-xs font-bold text-slate-800 leading-tight">Review</p>
                                <p className="text-[10px] text-slate-400 mt-1">{appDetails.dateApplied}</p>
                             </div>
                          </div>

                          {/* Step 3 */}
                          <div className="flex flex-col items-center gap-3 w-24">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ring-4 ring-white ${appDetails.status === 'Live' ? 'bg-emerald-500 text-white' : 'bg-gray-100 border-2 border-gray-200 text-gray-300'}`}>
                                {appDetails.status === 'Live' ? <Check size={16} strokeWidth={3} /> : <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>}
                             </div>
                             <div className="text-center">
                                <p className={`text-xs font-bold leading-tight ${appDetails.status === 'Live' ? 'text-slate-800' : 'text-gray-400'}`}>Shortlisted</p>
                             </div>
                          </div>

                          {/* Step 4 */}
                          <div className="flex flex-col items-center gap-3 w-24">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ring-4 ring-white ${appDetails.status === 'Live' ? 'bg-emerald-500 text-white' : 'bg-gray-100 border-2 border-gray-200 text-gray-300'}`}>
                                {appDetails.status === 'Live' ? <Check size={16} strokeWidth={3} /> : <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>}
                             </div>
                             <div className="text-center">
                                <p className={`text-xs font-bold leading-tight ${appDetails.status === 'Live' ? 'text-slate-800' : 'text-gray-400'}`}>Interview</p>
                             </div>
                          </div>

                          {/* Step 5 */}
                          <div className="flex flex-col items-center gap-3 w-24">
                             <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-300 flex items-center justify-center ring-4 ring-white">
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                             </div>
                             <div className="text-center">
                                <p className="text-xs font-bold text-gray-400 leading-tight">Offer</p>
                             </div>
                          </div>

                          {/* Step 6 */}
                          <div className="flex flex-col items-center gap-3 w-24">
                             <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-300 flex items-center justify-center ring-4 ring-white">
                                <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                             </div>
                             <div className="text-center">
                                <p className="text-xs font-bold text-gray-400 leading-tight">Hired</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              )}
            </div>

            {/* Application Updates */}
            <div>
               <h3 className="font-bold text-slate-800 text-lg mb-1">Application Updates</h3>
               <p className="text-slate-500 text-sm mb-4">Feedback about your application</p>
               
               {appDetails.status === 'Live' ? (
                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h4 className="font-bold text-slate-800 mb-6">Interview Request</h4>
                    
                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 text-slate-500">
                                <Building2 size={20} />
                             </div>
                             <span className="font-medium text-slate-700">Location</span>
                          </div>
                          <span className="font-bold text-slate-900">Virtual</span>
                       </div>

                       <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 text-slate-500">
                                <Clock size={20} />
                             </div>
                             <span className="font-medium text-slate-700">Time</span>
                          </div>
                          <span className="text-sm font-medium text-slate-500">8 Time Slots on 12 Days</span>
                       </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                       <button className="flex-1 py-3 bg-white border border-gray-200 text-slate-700 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                          Decline Interview
                       </button>
                       <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm">
                          Select Interview Slot
                       </button>
                    </div>
                 </div>
               ) : (
                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                       <Clock size={24} />
                    </div>
                    <h4 className="font-bold text-slate-800">Application Closed</h4>
                    <p className="text-slate-500 text-sm mt-1">This application process has ended or is currently on hold.</p>
                 </div>
               )}
            </div>
         </div>
       )}
       
       {activeTab === 'Inbox' && (
           <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200 animate-in fade-in duration-300">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <FileText size={24} className="text-gray-300" />
             </div>
             <h3 className="text-lg font-semibold text-slate-700">No new messages</h3>
             <p className="text-slate-400 max-w-xs mt-1">
                You're all caught up! Check back later for updates from the hiring team.
             </p>
           </div>
       )}
    </div>
  );
};

const ApplicationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Shortlisted'>('All');
  const [showClosed, setShowClosed] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Filtering logic
  const filteredApplications = MOCK_APPLICATIONS.filter(app => {
    // Filter by Closed status
    if (!showClosed && app.status === 'Closed') return false;
    
    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = app.jobTitle.toLowerCase().includes(query);
      const matchesCompany = app.company.toLowerCase().includes(query);
      if (!matchesTitle && !matchesCompany) return false;
    }

    // Filter by Tab (Mock logic)
    if (activeTab === 'Shortlisted') {
        // Just mocking a filter for shortlisted - let's say only "Live" ones are shortlisted for demo
        return app.status === 'Live';
    }
    
    return true;
  });

  const handleApplicationClick = (app: Application) => {
    setSelectedApplication(app);
  };

  const handleBack = () => {
    setSelectedApplication(null);
  };

  if (selectedApplication) {
    return (
      <div className="h-full flex flex-col bg-gray-50 overflow-hidden font-sans">
         <div className="flex-1 overflow-y-auto p-8">
            <ApplicationDetail application={selectedApplication} onBack={handleBack} />
         </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden font-sans">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
             {/* Header */}
             <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">All Applications</h1>
                <p className="text-slate-500 mt-1">Keep track of jobs applied to and your application status</p>
             </div>

             {/* Tabs */}
             <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('All')}
                  className={`pb-3 px-1 text-sm font-medium mr-6 transition-colors border-b-2 ${
                    activeTab === 'All' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  All Applications
                </button>
                <button
                  onClick={() => setActiveTab('Shortlisted')}
                  className={`pb-3 px-1 text-sm font-medium mr-6 transition-colors border-b-2 ${
                    activeTab === 'Shortlisted' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Shortlisted
                </button>
             </div>

             {/* Controls Row */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                {/* Search */}
                <div className="relative w-full md:w-80">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 shadow-sm"
                   />
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto">
                    {/* Checkbox */}
                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                       <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                           showClosed 
                             ? 'bg-blue-600 border-blue-600 text-white' 
                             : 'bg-white border-gray-300 group-hover:border-blue-400'
                       }`}>
                          {showClosed && <Check size={14} strokeWidth={3} />}
                       </div>
                       <input 
                         type="checkbox" 
                         className="hidden" 
                         checked={showClosed} 
                         onChange={() => setShowClosed(!showClosed)} 
                       />
                       <span className="text-sm font-medium text-slate-600">Show closed application</span>
                    </label>

                    {/* Filter Button */}
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 hover:text-slate-900 transition-colors shadow-sm">
                        <Filter size={16} /> Filters
                    </button>
                </div>
             </div>

             {/* Table Container */}
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                   <h3 className="font-bold text-lg text-slate-800">My Applications</h3>
                </div>
                
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-gray-50/50 border-b border-gray-100">
                         <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Job Title</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Job Type</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 group">
                               <div className="flex items-center gap-1">
                                 Date Applied <ArrowDown size={14} className="text-slate-400 group-hover:text-slate-600" />
                               </div>
                            </th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {filteredApplications.map(app => (
                            <tr 
                              key={app.id} 
                              onClick={() => handleApplicationClick(app)}
                              className="hover:bg-gray-50/60 transition-colors cursor-pointer group"
                            >
                               <td className="px-6 py-5">
                                  <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{app.jobTitle}</span>
                               </td>
                               <td className="px-6 py-5 text-sm text-slate-600 font-medium">{app.company}</td>
                               <td className="px-6 py-5 text-sm text-slate-600">{app.jobType}</td>
                               <td className="px-6 py-5">
                                  {app.status === 'Live' ? (
                                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live
                                     </span>
                                  ) : (
                                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-slate-500 border border-gray-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Closed
                                     </span>
                                  )}
                               </td>
                               <td className="px-6 py-5 text-sm text-slate-500 font-medium">{app.dateApplied}</td>
                            </tr>
                         ))}
                         {filteredApplications.length === 0 && (
                            <tr>
                               <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                                  No applications found matching your criteria.
                               </td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                   <span className="text-sm text-slate-500 font-medium pl-2">Page 1 of 10</span>
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

export default ApplicationsView;
