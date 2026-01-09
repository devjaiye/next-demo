"use client"
import React, { useState } from 'react';
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  Plus,
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data
const CLIENT_WEEKLY_HOURS = [
  { day: 'M', hours: 8 },
  { day: 'T', hours: 7.5 },
  { day: 'W', hours: 8 },
  { day: 'T', hours: 4 },
  { day: 'F', hours: 0 },
  { day: 'S', hours: 0 },
  { day: 'S', hours: 0 },
];

const UPCOMING_MILESTONES = [
  { id: 1, title: 'Phase 2 MVP Delivery', date: 'Nov 25', amount: '$3,000' },
  { id: 2, title: 'User Testing Report', date: 'Dec 05', amount: '$1,500' },
];

// Simple Modal Component
const CreateTimesheetModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (date: string) => void }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Create New Timesheet</h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Week Starting</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-slate-700 rounded-lg font-medium hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={() => onCreate(selectedDate)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

const ClientDashboard = () => {
  const [isTimesheetModalOpen, setIsTimesheetModalOpen] = useState(false);
  const clientName = "Stamm-Wiegand";
  const role = "Business Analyst";

  const handleCreateTimesheet = (date: string) => {
    console.log(`Creating timesheet for ${date}`);
    setIsTimesheetModalOpen(false);
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
              {role} at <span className="font-semibold text-slate-700">{clientName}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsTimesheetModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
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
                className="w-full py-2.5 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
              >
                View Timesheet
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors border border-transparent hover:border-gray-200 cursor-pointer">
                  <AlertCircle size={18} className="text-amber-500" />
                  Report an Issue
                </button>
                <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors border border-transparent hover:border-gray-200 cursor-pointer">
                  <Calendar size={18} className="text-blue-500" />
                  Request Time Off
                </button>
                <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors border border-transparent hover:border-gray-200 cursor-pointer">
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

export default ClientDashboard;