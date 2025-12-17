"use client"
import React, { useState } from 'react';
import { 
  Briefcase, 
  Award, 
  FileText, 
  ArrowRight, 
  Zap, 
  Users, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  Plus 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AppContext } from '../components/Sidebar';
import { CreateTimesheetModal } from '../components/CreateTimesheetModal';
import Link from 'next/link';
// import { NavItem } from '../types';

// --- MOCK DATA ---

// Global Context Data
const APPLICATIONS = [
  { id: 1, role: 'Senior Product Designer', company: 'TechFlow Systems', status: 'Interviewing', date: '2 days ago' },
  { id: 2, role: 'React Developer', company: 'FinCorp Global', status: 'Applied', date: '5 days ago' },
  { id: 3, role: 'UX Researcher', company: 'HealthPlus', status: 'Rejected', date: '1 week ago' },
];

const RECOMMENDED_JOBS = [
  { id: 1, role: 'Full Stack Engineer', rate: '$60-$80/hr', type: 'Contract', match: 95 },
  { id: 2, role: 'Frontend Architect', rate: '$90-$120/hr', type: 'Project', match: 88 },
];

const GLOBAL_EARNINGS_DATA = [
  { name: 'Jun', amount: 4200 },
  { name: 'Jul', amount: 3800 },
  { name: 'Aug', amount: 5100 },
  { name: 'Sep', amount: 4900 },
  { name: 'Oct', amount: 6200 },
  { name: 'Nov', amount: 5800 },
];

const ACTIVE_CLIENTS_LIST = [
  { id: 1, name: 'Stamm-Wiegand', role: 'Business Analyst', status: 'Active' },
];

// Client Context Data
const CLIENT_WEEKLY_HOURS = [
  { day: 'M', hours: 8 },
  { day: 'T', hours: 7.5 },
  { day: 'W', hours: 8 },
  { day: 'T', hours: 4 },
  { day: 'F', hours: 0 }, // Today is Friday
  { day: 'S', hours: 0 },
  { day: 'S', hours: 0 },
];

const UPCOMING_MILESTONES = [
  { id: 1, title: 'Phase 2 MVP Delivery', date: 'Nov 25', amount: '$3,000' },
  { id: 2, title: 'User Testing Report', date: 'Dec 05', amount: '$1,500' },
];

// --- COMPONENTS ---

const GlobalDashboard = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Career Hub</h1>
            <p className="text-slate-500 mt-1">Manage your growth, applications, and opportunities.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to Work
            </span>
            <Link href="/" className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Job Search */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition-colors">
                <Briefcase size={24} />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">3 Active</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Job Applications</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">1 Interview</h3>
            <p className="text-sm text-slate-500 mt-2">2 applications pending review.</p>
          </div>

          {/* Card 2: Profile Strength */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-100 transition-colors">
                <Award size={24} />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">Intermediate</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Profile Strength</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">85% Complete</h3>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Card 3: Active Contracts */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-100 transition-colors">
                <FileText size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">1 Active</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Current Contracts</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">$85.00/hr</h3>
            <p className="text-sm text-slate-500 mt-2">Avg rate across active contracts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Main Activity */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Recommended Jobs */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Zap size={18} className="text-amber-500 fill-amber-500" /> Recommended for You
                </h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View all jobs</button>
              </div>
              <div className="divide-y divide-gray-50">
                {RECOMMENDED_JOBS.map(job => (
                  <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{job.role}</h4>
                      <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">{job.type}</span>
                        <span>{job.rate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600">{job.match}% Match</div>
                      <button className="mt-2 text-xs font-medium text-slate-400 border border-slate-200 px-3 py-1 rounded-lg hover:border-slate-300 hover:text-slate-600">
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Earnings Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Earnings Overview</h3>
                <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 text-slate-600 outline-none">
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GLOBAL_EARNINGS_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                      itemStyle={{color: '#4f46e5', fontWeight: 600}}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Right Column: Status */}
          <div className="space-y-8">
            
            {/* Active Clients Widget */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Users size={18} className="text-slate-400" /> Active Clients
              </h3>
              {ACTIVE_CLIENTS_LIST.length > 0 ? (
                <div className="space-y-3">
                  {ACTIVE_CLIENTS_LIST.map(client => (
                    <div key={client.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">{client.name}</p>
                          <p className="text-xs text-slate-500">{client.role}</p>
                        </div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    </div>
                  ))}
                  <button className="w-full mt-2 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Go to Client Dashboard
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-500 mb-3">No active clients yet.</p>
                  <button className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-700 text-xs font-bold rounded-lg hover:border-slate-300">
                    Find Work
                  </button>
                </div>
              )}
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-slate-800">Recent Applications</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {APPLICATIONS.map(app => (
                  <div key={app.id} className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                        {app.company.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{app.role}</p>
                        <p className="text-xs text-slate-500">{app.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                        ${app.status === 'Interviewing' ? 'bg-blue-50 text-blue-700' : 
                          app.status === 'Rejected' ? 'bg-gray-50 text-gray-500' : 'bg-amber-50 text-amber-700'
                        }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard = ({ clientName, role, onNavigate }: { clientName: string, role?: string, onNavigate?: (item: NavItem, params?: any) => void }) => {
  const [isTimesheetModalOpen, setIsTimesheetModalOpen] = useState(false);

  const handleCreateTimesheet = (date: string) => {
    console.log(`Creating timesheet for ${date}`);
    setIsTimesheetModalOpen(false);
    // In a real app, this would navigate to the timesheet view or refresh data
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <CreateTimesheetModal 
        isOpen={isTimesheetModalOpen} 
        onClose={() => setIsTimesheetModalOpen(false)} 
        onCreate={handleCreateTimesheet} 
      />
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Workspace Overview</h1>
            <p className="text-slate-500 mt-1">
              {role ? `${role} at ` : ''}<span className="font-semibold text-slate-700">{clientName}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsTimesheetModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Log Time
          </button>
        </div>

        {/* Client Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Hours this Week</p>
              <Clock size={20} className="text-blue-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">27.5 <span className="text-lg font-normal text-slate-400">/ 40</span></h3>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Pending Payment</p>
              <DollarSign size={20} className="text-emerald-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">$4,250.00</h3>
            <p className="text-xs text-slate-500 mt-2">Next invoice due on Nov 30</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Active Projects</p>
              <Briefcase size={20} className="text-purple-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">2</h3>
            <p className="text-xs text-slate-500 mt-2">1 project nearing completion</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Weekly Activity Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Weekly Activity</h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">Nov 17 - Nov 23</span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CLIENT_WEEKLY_HOURS} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 4, 4]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Active Milestones */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-slate-800">Upcoming Milestones</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {UPCOMING_MILESTONES.map(ms => (
                  <div key={ms.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                        <TrendingUp size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{ms.title}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Calendar size={10} /> Due {ms.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{ms.amount}</p>
                      <span className="text-xs font-medium text-blue-600">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Timesheet Status Widget */}
            {/* <div className="bg-slate-900 rounded-2xl shadow-sm p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Current Timesheet</h3>
                <span className="text-xs bg-blue-600 px-2 py-0.5 rounded font-medium">Draft</span>
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold">27.5 <span className="text-lg text-slate-400 font-normal">hrs</span></p>
                <p className="text-sm text-slate-400 mt-1">Logged this week</p>
              </div>
              <button 
                onClick={() => onNavigate && onNavigate(NavItem.TIMESHEET, { openWeek: 'current' })}
                className="w-full py-2.5 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                View Timesheet
              </button>
            </div> */}

        <div className="bg-slate-900 rounded-2xl shadow-sm p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Current Timesheet</h3>
                <span className="text-xs bg-blue-600 px-2 py-0.5 rounded font-medium">Draft</span>
              </div>
              <div className="mb-6">
                <p className="text-4xl font-bold">27.5 <span className="text-lg text-slate-400 font-normal">hrs</span></p>
                <p className="text-sm text-slate-400 mt-1">Logged this week</p>
              </div>
              <button 
                className="w-full py-2.5 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors"
              >
                View Timesheet
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors border border-transparent hover:border-gray-200">
                  <AlertCircle size={18} className="text-amber-500" />
                  Report an Issue
                </button>
                <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors border border-transparent hover:border-gray-200">
                  <Calendar size={18} className="text-blue-500" />
                  Request Time Off
                </button>
                <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors border border-transparent hover:border-gray-200">
                  <FileText size={18} className="text-emerald-500" />
                  View Contracts
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD CONTROLLER ---

interface DashboardViewProps {
  context?: AppContext;
//   onNavigate?: (item: NavItem, params?: any) => void;
onNavigate?: (item: '', params?: any) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ context, onNavigate }) => {
  // Default to global if no context provided (safety fallback)
  if (!context || context.type === 'global') {
    return <GlobalDashboard />;
  }

  return <ClientDashboard clientName={context.name} role={context.role} onNavigate={onNavigate} />;
};

export default DashboardView;