"use client"

import React, { useState, useEffect } from 'react';
import { 
  FileSignature, 
  Download, 
  Eye, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  FileText, 
  Briefcase,
  X,
  Lock,
  Flag,
  TrendingUp
} from 'lucide-react';

// --- Types ---

type ContractType = 'MSA' | 'SOW' | 'NDA' | 'Amendment';
type ContractStatus = 'Active' | 'Pending Signature' | 'Expired' | 'Terminated' | 'Draft';
type MilestoneStatus = 'Pending' | 'Completed' | 'Paid';

interface ContractMilestone {
  id: string;
  title: string;
  amount: number;
  status: MilestoneStatus;
  dueDate: string;
}

interface Contract {
  id: string;
  title: string;
  client: string;
  type: ContractType;
  status: ContractStatus;
  startDate: string;
  endDate?: string;
  value?: string; // Display string for hourly or fixed total
  paymentTerms: string;
  signedDate?: string;
  description: string;
  hasMilestones: boolean;
  milestones?: ContractMilestone[];
}

// --- Mock Data ---

const INITIAL_CONTRACTS_DATA: Contract[] = [
  {
    id: 'CTR-2025-001',
    title: 'Master Services Agreement (MSA)',
    client: 'Tedbree',
    type: 'MSA',
    status: 'Active',
    startDate: 'Jan 01, 2024',
    paymentTerms: 'Net 30',
    signedDate: 'Dec 28, 2023',
    description: 'General terms and conditions governing the relationship between Contractor and Client.',
    hasMilestones: false
  },
  {
    id: 'CTR-2025-002',
    title: 'SOW: Product Design Phase 2',
    client: 'Tedbree',
    type: 'SOW',
    status: 'Active',
    startDate: 'Nov 25, 2025',
    endDate: 'Feb 28, 2026',
    value: '$15,000',
    paymentTerms: 'Milestone-based',
    signedDate: 'Nov 20, 2025',
    description: 'Scope of work for the design system implementation and mobile app high-fidelity prototypes.',
    hasMilestones: true,
    milestones: [
      { id: 'm1', title: 'Design System Foundation', amount: 5000, status: 'Paid', dueDate: 'Dec 15, 2025' },
      { id: 'm2', title: 'High-Fidelity Prototypes', amount: 6000, status: 'Completed', dueDate: 'Jan 20, 2026' },
      { id: 'm3', title: 'Developer Handoff', amount: 4000, status: 'Pending', dueDate: 'Feb 28, 2026' }
    ]
  },
  {
    id: 'CTR-2025-003',
    title: 'Non-Disclosure Agreement',
    client: 'Tedbree',
    type: 'NDA',
    status: 'Active',
    startDate: 'Jan 01, 2024',
    paymentTerms: 'N/A',
    signedDate: 'Dec 28, 2023',
    description: 'Standard confidentiality agreement regarding proprietary information.',
    hasMilestones: false
  },
  {
    id: 'CTR-2024-009',
    title: 'SOW: Initial Discovery',
    client: 'Tedbree',
    type: 'SOW',
    status: 'Expired',
    startDate: 'Aug 01, 2024',
    endDate: 'Oct 30, 2024',
    value: '$80.00/hr',
    paymentTerms: 'Bi-weekly',
    signedDate: 'Jul 25, 2024',
    description: 'Initial discovery phase and research.',
    hasMilestones: false
  }
];

// --- Components ---

const StatusBadge = ({ status }: { status: ContractStatus }) => {
  switch (status) {
    case 'Active':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"><CheckCircle2 size={12} /> Active</span>;
    case 'Pending Signature':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100"><FileSignature size={12} /> Sign Required</span>;
    case 'Expired':
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200"><Clock size={12} /> Expired</span>;
    default:
      return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600">{status}</span>;
  }
};

const MilestoneStatusBadge = ({ status }: { status: MilestoneStatus }) => {
  switch (status) {
    case 'Paid':
      return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Paid</span>;
    case 'Completed':
      return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">Completed</span>;
    default:
      return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 border border-gray-200">Pending</span>;
  }
};

const ContractTypeIcon = ({ type }: { type: ContractType }) => {
  switch (type) {
    case 'MSA': return <Briefcase className="text-purple-600" size={20} />;
    case 'SOW': return <FileText className="text-blue-600" size={20} />;
    case 'NDA': return <Lock className="text-slate-500" size={20} />; 
    default: return <FileText className="text-slate-500" size={20} />;
  }
};

interface ContractsViewProps {
  isReadOnly?: boolean;
  injectedContract?: Contract;
}

const ContractsView: React.FC<ContractsViewProps> = ({ isReadOnly = false, injectedContract }) => {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [activeTab, setActiveTab] = useState<'Current' | 'Archived'>('Current');
  const [contractsData, setContractsData] = useState<Contract[]>(INITIAL_CONTRACTS_DATA);

  // Update contracts list if a new contract is injected
  useEffect(() => {
    if (injectedContract) {
      // Check if already exists to avoid duplicates
      const exists = contractsData.some(c => c.id === injectedContract.id);
      if (!exists) {
        setContractsData([injectedContract, ...contractsData]);
      }
    }
  }, [injectedContract]);

  const pendingContracts = contractsData.filter(c => c.status === 'Pending Signature');
  
  const filteredContracts = contractsData.filter(c => {
    if (activeTab === 'Current') {
      return c.status === 'Active' || c.status === 'Pending Signature';
    } else {
      return c.status === 'Expired' || c.status === 'Terminated';
    }
  });

  const getContractProgress = (contract: Contract) => {
    if (!contract.milestones || contract.milestones.length === 0) return null;
    
    const totalMilestones = contract.milestones.length;
    const completedMilestones = contract.milestones.filter(m => m.status === 'Paid' || m.status === 'Completed').length;
    const paidAmount = contract.milestones.filter(m => m.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
    
    return {
      percent: (completedMilestones / totalMilestones) * 100,
      completed: completedMilestones,
      total: totalMilestones,
      earned: paidAmount
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden relative">
      
      {/* Detail Slide-over / Modal */}
      {selectedContract && (
        <div className="absolute inset-0 z-20 flex justify-end bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-gray-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedContract.title}</h2>
                <p className="text-sm text-slate-500 mt-1">{selectedContract.id}</p>
              </div>
              <button 
                onClick={() => setSelectedContract(null)}
                className="p-2 hover:bg-gray-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Status Banner */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <StatusBadge status={selectedContract.status} />
                  <span className="text-sm text-slate-600 font-medium">
                    {selectedContract.status === 'Pending Signature' ? 'Waiting for you' : `Signed on ${selectedContract.signedDate}`}
                  </span>
                </div>
                {selectedContract.status === 'Pending Signature' && !isReadOnly && (
                  <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2">
                    <FileSignature size={14} /> Sign Now
                  </button>
                )}
              </div>

              {/* Key Terms Grid */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Key Terms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <p className="text-xs text-slate-400 font-medium uppercase mb-1">Start Date</p>
                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                      <Calendar size={16} className="text-blue-500" /> {selectedContract.startDate}
                    </div>
                  </div>
                  {selectedContract.endDate && (
                    <div className="p-4 rounded-xl border border-gray-200 bg-white">
                      <p className="text-xs text-slate-400 font-medium uppercase mb-1">End Date</p>
                      <div className="flex items-center gap-2 text-slate-800 font-semibold">
                        <Clock size={16} className="text-amber-500" /> {selectedContract.endDate}
                      </div>
                    </div>
                  )}
                  {selectedContract.value && (
                    <div className="p-4 rounded-xl border border-gray-200 bg-white">
                      <p className="text-xs text-slate-400 font-medium uppercase mb-1">Total Value</p>
                      <div className="flex items-center gap-2 text-slate-800 font-semibold">
                        <DollarSign size={16} className="text-emerald-500" /> {selectedContract.value}
                      </div>
                    </div>
                  )}
                  <div className="p-4 rounded-xl border border-gray-200 bg-white">
                    <p className="text-xs text-slate-400 font-medium uppercase mb-1">Payment Terms</p>
                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                      <Clock size={16} className="text-purple-500" /> {selectedContract.paymentTerms}
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones Section */}
              {selectedContract.hasMilestones && selectedContract.milestones && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Contract Milestones</h3>
                    {(() => {
                      const progress = getContractProgress(selectedContract);
                      if (progress) {
                        return (
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                            Earned: ${progress.earned.toLocaleString()}
                          </span>
                        );
                      }
                      return null;
                    })()}
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {selectedContract.milestones.map((milestone, index) => (
                      <div 
                        key={milestone.id} 
                        className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                          index !== selectedContract.milestones!.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                            ${milestone.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                              milestone.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}
                          `}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{milestone.title}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                              <Calendar size={10} /> Due {milestone.dueDate}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">${milestone.amount.toLocaleString()}</p>
                          <div className="mt-1">
                            <MilestoneStatusBadge status={milestone.status} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Description</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedContract.description}
                </p>
              </div>

              {/* Document Preview Stub */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Document</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-100 p-8 flex flex-col items-center justify-center text-center h-48">
                    <FileText size={48} className="text-gray-300 mb-2" />
                    <p className="text-sm font-medium text-slate-500">PDF Preview Unavailable</p>
                    <p className="text-xs text-slate-400">Please download to view full details</p>
                  </div>
                  <div className="bg-gray-50 p-3 flex justify-between items-center border-t border-gray-200">
                    <span className="text-xs font-mono text-slate-500">{selectedContract.id}.pdf</span>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-gray-50 transition-colors">
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main List Content */}
      <div className="p-8 h-full overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Contracts</h1>
              <p className="text-slate-500 mt-1">Manage your agreements, SOWs, and NDAs.</p>
            </div>
          </div>

          {/* Action Required Banner */}
          {pendingContracts.length > 0 && activeTab === 'Current' && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900">Action Required</h3>
                  <p className="text-sm text-amber-700">You have {pendingContracts.length} contract{pendingContracts.length > 1 ? 's' : ''} pending your signature.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200 flex gap-6">
            <button
              onClick={() => setActiveTab('Current')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'Current' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Current Contracts
            </button>
            <button
              onClick={() => setActiveTab('Archived')}
              className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'Archived' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Archived
            </button>
          </div>

          {/* Contracts List */}
          <div className="space-y-4">
            {filteredContracts.length > 0 ? (
              filteredContracts.map((contract) => {
                const progress = getContractProgress(contract);
                return (
                  <div 
                    key={contract.id}
                    onClick={() => setSelectedContract(contract)}
                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                        <ContractTypeIcon type={contract.type} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{contract.type}</span>
                          <span className="text-xs text-slate-300">•</span>
                          <span className="text-xs text-slate-400">{contract.id}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">
                          {contract.title}
                        </h3>
                        
                        {/* Conditional Metadata: Milestones vs Standard */}
                        {progress ? (
                          <div className="mt-2 flex items-center gap-4">
                             <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                <DollarSign size={12} /> Earned: ${progress.earned.toLocaleString()}
                             </div>
                             <div className="flex items-center gap-2">
                                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                   <div className="h-full bg-blue-500" style={{width: `${progress.percent}%`}}></div>
                                </div>
                                <span className="text-xs text-slate-400 font-medium">{progress.completed}/{progress.total} Milestones</span>
                             </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={14} /> {contract.startDate} {contract.endDate ? `- ${contract.endDate}` : ''}
                            </span>
                            {contract.value && (
                              <span className="flex items-center gap-1.5 font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded">
                                {contract.value}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-gray-50 pt-4 md:pt-0 w-full md:w-auto">
                      <StatusBadge status={contract.status} />
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors">
                          <Download size={18} />
                        </button>
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500" />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <FileText size={32} className="mx-auto text-slate-300 mb-3" />
                <h3 className="text-slate-600 font-medium">No {activeTab.toLowerCase()} contracts found</h3>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContractsView;
