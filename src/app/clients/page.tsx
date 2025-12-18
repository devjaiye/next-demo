"use client"
import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Calendar, DollarSign, Clock, CheckCircle2, Briefcase, Building2, X } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  role: string;
  logo?: string; // URL or placeholder
  status: 'Active' | 'Pending' | 'Completed';
  startDate: string;
  rate: string;
  duration: string;
  description: string;
}

// Synced with App.tsx AVAILABLE_CONTEXTS
const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Stamm-Wiegand',
    role: 'Business Analyst',
    logo: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=100&h=100', // Abstract logo
    status: 'Active',
    startDate: '01/15/24',
    rate: '$85/hr',
    duration: '6 Months',
    description: 'Process optimization and requirement gathering for new ERP system.'
  },
  {
    id: 'c2',
    name: 'TechFlow Systems',
    role: 'Enterprise Business Analyst',
    status: 'Completed',
    startDate: '05/10/23',
    rate: '$120/hr',
    duration: '12 Months',
    description: 'Legacy system migration and cloud architecture design.'
  },
  {
    id: 'c3',
    name: 'Tedbree',
    role: 'Product Designer',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=100&h=100', // Abstract logo
    status: 'Pending',
    startDate: '02/11/24',
    rate: '£200/month',
    duration: 'Permanent',
    description: 'Payment infrastructure overhaul and design system implementation.'
  }
];



interface ClientsViewProps {
  onClientSelect?: (clientId: string) => void;
}

const ClientsView: React.FC<ClientsViewProps> = ({ onClientSelect }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Pending'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = MOCK_CLIENTS.filter(client => {
    const matchesTab = activeTab === 'All' 
      ? true 
      : activeTab === 'Active' 
        ? client.status === 'Active' 
        : client.status === 'Pending';
    
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.role.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Completed': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const handleCardClick = (clientId: string) => {
    if (onClientSelect) {
      onClientSelect(clientId);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden relative">
      
      {/* Header */}
      <div className="px-8 pt-8 pb-4 bg-white border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
            <p className="text-slate-500 mt-1">Manage and track your client engagements and project status.</p>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 border-b border-transparent w-full md:w-auto">
            {['All Clients', 'Active Clients', 'Pending Clients'].map((tabLabel) => {
              const tabKey = tabLabel.split(' ')[0] as 'All' | 'Active' | 'Pending';
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                    activeTab === tabKey
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>
          
          <div className="relative w-full md:w-64">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search clients..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
             />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {filteredClients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredClients.map((client) => (
                <div 
                  key={client.id}
                  onClick={() => handleCardClick(client.id)}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 flex items-center justify-center shrink-0">
                      {client.logo ? (
                        <img src={client.logo} alt={client.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold bg-slate-100">
                           {client.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mb-4">{client.role}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1.5">
                       <span className="text-slate-400">Started</span>
                       <span className="text-slate-700">{client.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <span className="text-slate-700">{client.rate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <span className="text-slate-400">Duration:</span>
                       <span className="text-slate-700">{client.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Briefcase size={24} className="text-gray-300" />
               </div>
               <h3 className="text-lg font-semibold text-slate-700">No clients found</h3>
               <p className="text-slate-400 max-w-xs mt-1">
                  {activeTab === 'All' 
                    ? "You haven't been assigned to any clients yet." 
                    : `No ${activeTab.toLowerCase()} clients found matching your search.`}
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsView;
