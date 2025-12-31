"use client"
import React, { useState, useEffect } from 'react';
import { 
  Plus, ArrowUpRight, ArrowDownLeft, 
  Copy, X, ChevronDown, Landmark, Check, Loader2, 
  Building2, Trash2, AlertCircle 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Types ---

interface Transaction {
  id: string;
  date: string;
  amount: number;
  currency: string;
  balance: number;
  description: string;
  status: 'Completed' | 'Pending' | 'Failed';
  type: 'credit' | 'debit';
  fee?: number;
  completedOn?: string;
  flag: string; // Emoji flag for simplicity
}

// --- Mock Data ---

const EARNINGS_DATA = [
  { day: '01', amount: 1200 },
  { day: '05', amount: 1500 },
  { day: '10', amount: 1100 },
  { day: '15', amount: 1800 },
  { day: '20', amount: 1400 },
  { day: '25', amount: 2200 },
  { day: '30', amount: 1600 },
];

const TRANSACTIONS: Transaction[] = [
  { 
    id: '8867908753', 
    date: '22/08/2024', 
    amount: 200, 
    currency: 'USD', 
    balance: 400, 
    description: 'Payment for Timesheet #101', 
    status: 'Pending', 
    type: 'credit',
    fee: 0,
    flag: '🇺🇸'
  },
  { 
    id: '8867908754', 
    date: '22/08/2024', 
    amount: 200, 
    currency: 'GBP', 
    balance: 600.20, 
    description: 'Payment for Timesheet #102', 
    status: 'Completed', 
    type: 'credit',
    fee: 1.50,
    completedOn: 'Aug 22, 2025 4:30pm',
    flag: '🇬🇧'
  },
  { 
    id: '8867908755', 
    date: '22/08/2024', 
    amount: 100, 
    currency: 'GBP', 
    balance: 400.20, 
    description: 'Withdrawal to Bank Account', 
    status: 'Completed', 
    type: 'debit',
    fee: 0.10,
    completedOn: 'Aug 22, 2025 2:15pm',
    flag: '🇬🇧'
  },
  { 
    id: '8867908756', 
    date: '29/08/2025', 
    amount: 3200, 
    currency: 'GBP', 
    balance: 4000.00, 
    description: 'Payment for Milestone A', 
    status: 'Completed', 
    type: 'debit', // Showing as debit based on previously requested example (sent/withdrawal)
    fee: 0.10,
    completedOn: 'Aug 30, 2025 1:30pm',
    flag: '🇬🇧'
  },
  { 
    id: '8867908757', 
    date: '15/08/2024', 
    amount: 5000, 
    currency: 'NGN', 
    balance: 315000.00, 
    description: 'Bonus Payment', 
    status: 'Completed', 
    type: 'credit',
    fee: 0,
    completedOn: 'Aug 15, 2025 10:00am',
    flag: '🇳🇬'
  },
];

const MOCK_BANKS = [
  "Chase Bank", "Bank of America", "Wells Fargo", "Citibank", 
  "Access Bank", "Zenith Bank", "GTBank", "United Bank for Africa"
];

// --- Components ---

const TransactionDetailModal = ({ transaction, onClose }: { transaction: Transaction, onClose: () => void }) => {
  if (!transaction) return null;

  const isCredit = transaction.type === 'credit';
  const colorClass = isCredit ? 'text-emerald-600' : 'text-slate-800'; 
  const iconBg = isCredit ? 'bg-emerald-500' : 'bg-orange-500';
  const icon = isCredit ? <ArrowDownLeft size={24} className="text-white" /> : <ArrowUpRight size={24} className="text-white" />;
  const sign = isCredit ? '+' : '-';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 pb-2">
          <h3 className="text-xl font-bold text-slate-900">Transaction Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="bg-slate-50 rounded-2xl p-6 mb-6 text-center relative overflow-hidden">
             <div className="flex justify-between items-start mb-2">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} shadow-lg shadow-orange-200/50`}>
                 {icon}
               </div>
               <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                 ${transaction.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}
               `}>
                 {transaction.status}
               </span>
             </div>
             
             <div className="text-left mt-2">
               <h2 className={`text-4xl font-bold ${colorClass}`}>
                 {sign}{transaction.currency === 'USD' ? '$' : transaction.currency === 'GBP' ? '£' : transaction.currency === 'EUR' ? '€' : '₦'}
                 {transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
               </h2>
               <p className="text-xs text-slate-400 mt-1 font-medium">Bal {transaction.currency === 'USD' ? '$' : transaction.currency === 'GBP' ? '£' : transaction.currency === 'EUR' ? '€' : '₦'}{transaction.balance.toFixed(2)}</p>
             </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800">Details</h4>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-slate-500">Transaction ID</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">#{transaction.id}</span>
                <Copy size={14} className="text-slate-400 cursor-pointer hover:text-blue-600" />
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-slate-500">Transaction Date</span>
              <span className="text-sm font-bold text-slate-800">{transaction.date}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-slate-500">{isCredit ? 'Amount Received' : 'Amount Sent'}</span>
              <span className="text-sm font-bold text-slate-800">{transaction.amount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-slate-500">Completed On</span>
              <span className="text-sm font-bold text-slate-800">{transaction.completedOn || '-'}</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-500">Account</span>
              <div className="flex items-center gap-2">
                 <span className="text-lg">{transaction.flag}</span>
                 <span className="text-sm font-bold text-slate-800">{transaction.currency}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
             <h4 className="text-sm font-bold text-slate-800">Breakdown</h4>
             <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Base Amount</span>
                <span className="text-sm font-bold text-slate-800">
                  {isCredit ? '' : '-'}${transaction.amount.toFixed(2)}
                </span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Fee</span>
                <span className="text-sm font-bold text-slate-800">-${(transaction.fee || 0).toFixed(2)}</span>
             </div>
          </div>
        </div>

        <div className="p-6 pt-2 flex gap-3">
          <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
            Download Receipt
          </button>
          <button className="flex-1 py-2.5 bg-white border border-gray-200 text-slate-700 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

const BankAccountModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  onRemove,
  existingAccount 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (details: any) => void;
  onRemove: () => void;
  existingAccount: any;
}) => {
  const [step, setStep] = useState<'input' | 'verify' | 'success'>('input');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resolvedName, setResolvedName] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen && !existingAccount) {
      setStep('input');
      setBankName('');
      setAccountNumber('');
      setResolvedName('');
      setIsValidated(false);
    } else if (isOpen && existingAccount) {
       setStep('input');
    }
  }, [isOpen, existingAccount]);

  const validateAccount = (num: string, bank: string) => {
    setIsLoading(true);
    // Simulate API validation
    setTimeout(() => {
       setIsLoading(false);
       setResolvedName('ALEXANDER CONTRACTOR'); // Mock resolved name
       setIsValidated(true);
    }, 1500);
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g,'');
    setAccountNumber(val);
    
    if (val.length === 10 && bankName) {
      validateAccount(val, bankName);
    } else {
      setIsValidated(false);
      setResolvedName('');
    }
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setBankName(val);
    
    if (accountNumber.length === 10 && val) {
      validateAccount(accountNumber, val);
    } else {
      setIsValidated(false);
      setResolvedName('');
    }
  };

  if (!isOpen) return null;

  // Manage View (if account exists)
  if (existingAccount && step === 'input') {
     return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-slate-900">Manage Bank Account</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="p-6">
                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                          <Building2 size={24} />
                       </div>
                       <div>
                          <p className="font-bold text-slate-800 text-lg">{existingAccount.bankName}</p>
                          <p className="text-slate-500 font-mono">**** {existingAccount.accountNumber.slice(-4)}</p>
                          <p className="text-xs text-slate-400 mt-1 uppercase font-medium">{existingAccount.accountName}</p>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <button 
                       onClick={() => { onRemove(); onClose(); }}
                       className="w-full py-3 border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                       <Trash2 size={18} /> Remove Account
                    </button>
                    <button 
                       onClick={onClose}
                       className="w-full py-3 text-slate-500 font-medium hover:text-slate-700"
                    >
                       Close
                    </button>
                 </div>
              </div>
           </div>
        </div>
     )
  }

  const handleConfirm = () => {
     onSave({ bankName, accountNumber, accountName: resolvedName });
     setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-slate-900">
             {step === 'success' ? 'Account Added' : 'Add Bank Account'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
           {step === 'input' && (
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Bank</label>
                    <div className="relative">
                       <select 
                          value={bankName}
                          onChange={handleBankChange}
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 appearance-none font-medium"
                        >
                          <option value="">Select a bank...</option>
                          {MOCK_BANKS.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                       </select>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown size={16} />
                       </div>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Account Number</label>
                    <div className="relative">
                      <input 
                         type="text" 
                         value={accountNumber}
                         onChange={handleAccountNumberChange}
                         placeholder="0000000000"
                         className="w-full p-3 border border-gray-200 rounded-xl text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 font-mono tracking-wide font-medium"
                         maxLength={10}
                      />
                      {isLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Loader2 size={18} className="animate-spin text-blue-600" />
                        </div>
                      )}
                    </div>
                 </div>

                 {/* Inline Result */}
                 {isValidated && resolvedName && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                             <Check size={16} />
                          </div>
                          <div>
                             <p className="text-xs text-blue-600 font-bold uppercase">Account Found</p>
                             <p className="text-sm font-bold text-slate-800">{resolvedName}</p>
                          </div>
                       </div>
                    </div>
                 )}

                 <div className="pt-2">
                    <button 
                       onClick={() => setStep('verify')}
                       disabled={!isValidated}
                       className="w-full py-3 bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                       Add Account
                    </button>
                 </div>
              </div>
           )}

           {step === 'verify' && (
              <div className="space-y-6">
                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Verify Information</p>
                    <h2 className="text-lg font-bold text-slate-800">{resolvedName}</h2>
                    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-600">
                       <Building2 size={14} /> <span>{bankName}</span>
                       <span>•</span>
                       <span>{accountNumber}</span>
                    </div>
                 </div>
                 
                 <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800">
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed font-medium">
                       Please confirm this is your account. All future payments will be processed to this destination. 
                       Incorrect details may result in delayed payments.
                    </p>
                 </div>

                 <div className="flex gap-3">
                    <button 
                       onClick={() => setStep('input')}
                       className="flex-1 py-3 bg-white border border-gray-200 text-slate-700 rounded-xl font-medium hover:bg-gray-50"
                    >
                       Back
                    </button>
                    <button 
                       onClick={handleConfirm}
                       className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-sm"
                    >
                       Confirm & Add
                    </button>
                 </div>
              </div>
           )}

           {step === 'success' && (
              <div className="text-center py-6">
                 <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-2">Success!</h2>
                 <p className="text-slate-500 mb-8">
                    Your bank account has been added successfully. You can now receive payments directly.
                 </p>
                 <button 
                    onClick={onClose}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                 >
                    Done
                 </button>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

const EarningsView = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [savedBank, setSavedBank] = useState<{bankName: string, accountNumber: string, accountName: string} | null>(null);

  const handleSaveBank = (details: any) => {
    setSavedBank(details);
  };

  const handleRemoveBank = () => {
    setSavedBank(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden relative">
      {/* Transaction Modal */}
      {selectedTransaction && (
        <TransactionDetailModal 
          transaction={selectedTransaction} 
          onClose={() => setSelectedTransaction(null)} 
        />
      )}

      {/* Bank Account Modal */}
      <BankAccountModal 
         isOpen={isBankModalOpen}
         onClose={() => setIsBankModalOpen(false)}
         onSave={handleSaveBank}
         onRemove={handleRemoveBank}
         existingAccount={savedBank}
      />

      {/* Header */}
      <div className="px-8 pt-8 pb-8 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Earnings</h1>
            <p className="text-slate-500 mt-1">Track your income and manage payouts to your bank account.</p>
          </div>
          <button 
            onClick={() => setIsBankModalOpen(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors ${
              savedBank 
                ? 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <Landmark size={16} /> 
            {savedBank ? 'Manage Bank Account' : 'Add Bank Account'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Earnings Chart */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">$2400<span className="text-lg text-slate-400 font-normal">.00</span></h2>
                <p className="text-slate-500 text-sm mt-1">Earnings in Aug 2025</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50">
                This Month <ChevronDown size={14} />
              </button>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={EARNINGS_DATA}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                      itemStyle={{color: '#3b82f6', fontWeight: 600}}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Recent Transactions</h3>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-gray-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">7 Days</button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors">1 Month</button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors">Custom</button>
                </div>
              </div>
              
              <div className="overflow-x-auto min-h-[400px]">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 text-xs uppercase text-slate-500 font-bold border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          Date
                        </div>
                      </th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Currency</th>
                      <th className="px-6 py-4">Balance</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {TRANSACTIONS.map((tx) => (
                      <tr 
                        key={tx.id} 
                        onClick={() => setSelectedTransaction(tx)}
                        className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-4 text-slate-600 flex items-center gap-3">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" onClick={(e) => e.stopPropagation()} />
                          {tx.date}
                        </td>
                        <td className={`px-6 py-4 font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {tx.type === 'credit' ? '+' : '-'}{tx.currency === 'USD' ? '$' : tx.currency === 'GBP' ? '£' : '₦'}{tx.amount}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {tx.currency === 'USD' ? '$ USD' : tx.currency === 'GBP' ? '£ GBP' : '₦ NGN'}
                        </td>
                        <td className="px-6 py-4 text-slate-800 font-medium">
                          {tx.currency === 'USD' ? '$' : tx.currency === 'GBP' ? '£' : '₦'}{tx.balance}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {tx.description}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                            tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
                <span className="text-sm text-slate-500">Page 1 of 15</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">Previous</button>
                  <button className="px-4 py-2 bg-white border border-gray-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">Next</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsView;
