
import React, { useState, useRef, useEffect } from 'react';
import { NavItem } from '../types';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Clock, 
  CalendarOff, 
  AlertCircle, 
  Gift, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Users, 
  HelpCircle, 
  Settings,
  ChevronsUpDown,
  Check,
  Briefcase,
  Folder,
  Building2,
  Award,
  ClipboardCheck,
  Video,
  Share2,
  Archive,
  FileSignature,
  ListChecks,
  FileStack,
  FolderKanban,
  GraduationCap,
  User,
  BarChart2,
  Flag
} from 'lucide-react';

export type ContextType = 'global' | 'client';
export type ContextStatus = 'active' | 'archived' | 'pending';

export interface AppContext {
  id: string;
  name: string;
  type: ContextType;
  avatar?: string;
  role?: string;
  status?: ContextStatus;
}

interface SidebarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  currentContext: AppContext;
  availableContexts: AppContext[];
  onContextChange: (context: AppContext) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeItem, 
  onNavigate, 
  currentContext, 
  availableContexts,
  onContextChange 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // CRITICAL GUARD: Ensure currentContext exists before accessing properties
  // This prevents the "Cannot read properties of undefined (reading 'type')" error
  if (!currentContext) {
    return <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0" />;
  }

  const handleContextSelect = (context: AppContext) => {
    onContextChange(context);
    setIsDropdownOpen(false);
  };

  // Navigation Configuration
  const clientNavGroups = [
    {
      title: null,
      items: [
        { id: NavItem.DASHBOARD, icon: LayoutDashboard },
        { id: NavItem.CONVERSATIONS, icon: MessageSquare },
      ]
    },
    {
      title: 'WORKBENCH',
      items: [
        { id: NavItem.TIMESHEET, icon: Clock },
        { id: NavItem.TIMEOFF, icon: CalendarOff },
        { id: NavItem.DISPUTES, icon: AlertCircle },
        { id: NavItem.PROJECTS, icon: FolderKanban },
        { id: NavItem.MILESTONES, icon: Flag },
        { id: NavItem.CONTRACTS, icon: FileSignature },
        { id: NavItem.PERKS, icon: Gift },
        { id: NavItem.PERFORMANCE, icon: TrendingUp },
      ]
    },
    {
      title: 'PAYMENTS',
      items: [
        { id: NavItem.EARNINGS, icon: DollarSign },
        { id: NavItem.INVOICES, icon: FileText },
      ]
    }
  ];

  const globalNavGroups = [
    {
      title: null,
      items: [
        { id: NavItem.DASHBOARD, icon: LayoutDashboard },
        { id: NavItem.CLIENTS, icon: Users },
        { id: NavItem.DOCUMENTS, icon: Folder },
      ]
    },
    {
      title: 'CAREER',
      items: [
        { id: NavItem.ELITE_JOBS, icon: Award },
        { id: NavItem.APPLICATIONS, icon: FileStack },
        { id: NavItem.ASSESSMENTS, icon: ClipboardCheck },
        { id: NavItem.INTERVIEWS, icon: Video },
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { id: NavItem.PROFILE, icon: User },
        { id: NavItem.INSIGHTS_HUB, icon: BarChart2 },
      ]
    },
    {
      title: 'LEARN',
      items: [
        { id: NavItem.UPSKILL, icon: GraduationCap },
      ]
    },
    {
      title: 'COMMUNITY',
      items: [
        { id: NavItem.REFERRAL, icon: Share2 },
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { id: NavItem.SUPPORT_CENTER, icon: HelpCircle },
        { id: NavItem.SETTINGS, icon: Settings },
      ]
    }
  ];

  const onboardingNavGroups = [
    {
      title: 'GET STARTED',
      items: [
        { id: NavItem.ONBOARDING, icon: ListChecks },
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { id: NavItem.SETTINGS, icon: Settings },
      ]
    }
  ];

  let currentNavGroups;
  if (currentContext.type === 'global') {
    currentNavGroups = globalNavGroups;
  } else if (currentContext.status === 'pending') {
    currentNavGroups = onboardingNavGroups;
  } else {
    currentNavGroups = clientNavGroups;
  }

  const getAvatarBg = (ctx: AppContext) => {
    if (!ctx) return 'bg-gray-400';
    if (ctx.status === 'archived') return 'bg-gray-400';
    if (ctx.status === 'pending') return 'bg-amber-500';
    return ctx.type === 'global' ? 'bg-slate-800' : 'bg-indigo-600';
  };

  const safeAvailableContexts = availableContexts || [];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-full z-20">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex items-center space-x-3">
        <span className="text-xl font-bold text-slate-800 tracking-tight">Workbench</span>
      </div>

      {/* Context Selector */}
      <div className="px-4 mb-4 relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between p-2 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm group"
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${getAvatarBg(currentContext)}`}>
               {currentContext.avatar || currentContext.name.substring(0, 2)}
            </div>
            <div className="text-left truncate min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-700 truncate">{currentContext.name}</p>
                {currentContext.status === 'archived' && (
                  <span className="text-[9px] bg-gray-100 text-gray-500 px-1 rounded border border-gray-200 font-medium uppercase tracking-tight">Archived</span>
                )}
                {currentContext.status === 'pending' && (
                  <span className="text-[9px] bg-amber-50 text-amber-600 px-1 rounded border border-amber-100 font-medium uppercase tracking-tight">Pending</span>
                )}
              </div>
              {currentContext.role && <p className="text-[10px] text-slate-400 truncate">{currentContext.role}</p>}
            </div>
          </div>
          <ChevronsUpDown size={14} className="text-slate-400 group-hover:text-slate-600 flex-shrink-0 ml-2" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="py-1">
              <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                My Dashboard
              </div>
              {safeAvailableContexts.filter(c => c.type === 'global').map(ctx => (
                 <button
                   key={ctx.id}
                   onClick={() => handleContextSelect(ctx)}
                   className="w-full px-3 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                 >
                   <div className="flex items-center space-x-3">
                     <div className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center text-[10px]">
                        {ctx.avatar}
                     </div>
                     <span className="text-sm text-slate-700 font-medium">{ctx.name}</span>
                   </div>
                   {currentContext.id === ctx.id && <Check size={14} className="text-blue-600" />}
                 </button>
              ))}

              <div className="px-3 py-2 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-t border-gray-50">
                Clients
              </div>
              {safeAvailableContexts.filter(c => c.type === 'client').map(ctx => (
                 <button
                   key={ctx.id}
                   onClick={() => handleContextSelect(ctx)}
                   className="w-full px-3 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                 >
                   <div className="flex items-center space-x-3">
                     <div className={`w-6 h-6 rounded text-white flex items-center justify-center text-[10px] font-bold ${getAvatarBg(ctx)}`}>
                        {ctx.avatar || ctx.name.charAt(0)}
                     </div>
                     <div className="text-left">
                        <span className={`block text-sm font-medium ${ctx.status === 'archived' ? 'text-gray-500' : 'text-slate-700'}`}>
                          {ctx.name}
                          {ctx.status === 'archived' && <span className="ml-2 text-[9px] bg-gray-100 px-1 rounded text-gray-400 border border-gray-200">ARCHIVED</span>}
                          {ctx.status === 'pending' && <span className="ml-2 text-[9px] bg-amber-50 text-amber-600 px-1 rounded border border-amber-100">PENDING</span>}
                        </span>
                     </div>
                   </div>
                   {currentContext.id === ctx.id && <Check size={14} className="text-blue-600" />}
                 </button>
              ))}
              
              <button className="w-full px-3 py-2 text-xs text-slate-500 hover:text-blue-600 hover:bg-blue-50 text-left flex items-center gap-2 border-t border-gray-50 mt-1">
                <Briefcase size={12} />
                <span>Add Client Account</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto pb-4">
        {currentNavGroups.map((group, idx) => (
          <div key={idx}>
            {group.title && (
              <h3 className="px-2 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {group.title}
              </h3>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeItem === item.id;
                const isPerks = item.id === NavItem.PERKS;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out group
                        ${isActive 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }
                      `}
                    >
                      <item.icon 
                        size={18} 
                        className={`
                          ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}
                          ${isPerks && !isActive ? 'text-rose-500' : ''} 
                        `} 
                      />
                      <span className={`${isPerks ? 'text-rose-600 font-semibold' : ''}`}>
                        {item.id}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      
      {/* User Profile Snippet */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
           <img src="https://picsum.photos/32/32" alt="User" className="w-8 h-8 rounded-full bg-gray-200" />
           <div className="text-sm">
             <p className="font-medium text-slate-700">Alex Contractor</p>
             <p className="text-xs text-slate-400">Pro Member</p>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
