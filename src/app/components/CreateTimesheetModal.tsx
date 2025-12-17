
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateTimesheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (date: string) => void;
}

export const CreateTimesheetModal: React.FC<CreateTimesheetModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [selectedDate, setSelectedDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedDate) {
      onCreate(selectedDate);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-900">New Timesheet</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-500">Select the start date for the week you want to log time for.</p>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Start Date (Monday)</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-white border border-gray-200 text-slate-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!selectedDate}
            className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Timesheet
          </button>
        </div>
      </div>
    </div>
  );
};
