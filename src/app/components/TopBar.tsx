import React from 'react';
import { Bell, Mail, Search, User, Archive, Clock } from 'lucide-react';
import { ContextStatus } from './Sidebar';
import { NavItem } from '../types';

interface TopBarProps {
  title: string;
  status?: ContextStatus;
  onNavigate?: (item: NavItem) => void;
}

const TopBar: React.FC<TopBarProps> = ({ title, status, onNavigate }) => {
  const isReadOnly = status === 'archived';
  const isPending = status === 'pending';

  const handleProfileClick = () => {
    if (onNavigate) {
      onNavigate(NavItem.PROFILE);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {isReadOnly && (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-bold border border-gray-200 rounded-md uppercase tracking-wide">
            <Archive size={12} />
            Archived / Read Only
          </span>
        )}
        {isPending && (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 text-xs font-bold border border-amber-100 rounded-md uppercase tracking-wide">
            <Clock size={12} />
            Pending Onboarding
          </span>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none focus:ring-0 text-sm text-slate-700 ml-2 w-48 outline-none"
          />
        </div>

        <div className="flex items-center space-x-4">
           <button className="text-slate-500 hover:text-slate-700 relative">
             <Mail size={20} />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
           </button>
           <button className="text-slate-500 hover:text-slate-700">
             <Bell size={20} />
           </button>
           <div className="h-8 w-px bg-gray-200 mx-2"></div>
           <button 
             onClick={handleProfileClick}
             className="flex flex-col items-center justify-center text-slate-600 hover:text-blue-600 transition-colors"
           >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mb-1">
                <User size={16} />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wide leading-none">User</span>
           </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;