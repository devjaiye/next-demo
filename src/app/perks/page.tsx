"use client"
import React, { useState } from 'react';
import { Perk } from '../types';
import { Wallet, ShoppingBag, Check, Lock, AlertCircle, Zap, Heart, Monitor, BookOpen, Briefcase as BriefcaseIcon, Coffee, Filter, Package } from 'lucide-react';

// Define specific perks for the marketplace with pricing
interface MarketplacePerk {
  id: string;
  title: string;
  description: string;
  category: 'Health' | 'Lifestyle' | 'Finance' | 'Productivity';
  icon: React.ReactNode;
  price: number;
  period?: string;
}

const MARKETPLACE_ITEMS: MarketplacePerk[] = [
  { 
    id: '1', 
    title: 'Health Insurance PPO', 
    description: 'Premier coverage with low deductibles for you and your family.', 
    category: 'Health', 
    icon: <Heart size={24} />, 
    price: 0, 
    period: 'Included' 
  },
  { 
    id: '2', 
    title: 'Gym Reimbursement', 
    description: 'Get up to $50/month back on gym memberships or yoga classes.', 
    category: 'Lifestyle', 
    icon: <Zap size={24} />, 
    price: 50, 
    period: 'Monthly' 
  },
  { 
    id: '3', 
    title: 'Remote Office Stipend', 
    description: 'One-time allowance to set up your perfect home workspace.', 
    category: 'Productivity', 
    icon: <Monitor size={24} />, 
    price: 500, 
    period: 'One-time' 
  },
  { 
    id: '4', 
    title: 'Udemy for Business', 
    description: 'Unlimited access to 5,000+ top courses to upgrade your skills.', 
    category: 'Productivity', 
    icon: <BookOpen size={24} />, 
    price: 150, 
    period: 'Annual' 
  },
  { 
    id: '5', 
    title: 'Instant Pay', 
    description: 'Access your earnings immediately after your shift approval.', 
    category: 'Finance', 
    icon: <Wallet size={24} />, 
    price: 20, 
    period: 'Monthly' 
  },
  { 
    id: '6', 
    title: 'Coworking Access', 
    description: 'Global pass to partner coworking spaces.', 
    category: 'Lifestyle', 
    icon: <Coffee size={24} />, 
    price: 200, 
    period: 'Monthly' 
  },
];

const CATEGORIES = ['All', 'Health', 'Lifestyle', 'Productivity', 'Finance'];

interface PerksViewProps {
  isReadOnly?: boolean;
}

const PerksView: React.FC<PerksViewProps> = ({ isReadOnly = false }) => {
  const [balance, setBalance] = useState(1250.00);
  const [redeemedIds, setRedeemedIds] = useState<string[]>(['1']); // Health Insurance default redeemed
  const [activeTab, setActiveTab] = useState<'browse' | 'redeemed'>('browse');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleRedeem = (perk: MarketplacePerk) => {
    if (isReadOnly) return;
    
    if (balance >= perk.price) {
      setBalance(prev => prev - perk.price);
      setRedeemedIds(prev => [...prev, perk.id]);
    }
  };

  const filteredPerks = MARKETPLACE_ITEMS.filter(perk => {
    // First filter by tab mode
    if (activeTab === 'redeemed') {
      return redeemedIds.includes(perk.id);
    }
    
    // Then filter by category if in browse mode
    if (selectedCategory === 'All') return true;
    return perk.category === selectedCategory;
  });

  return (
    <div className="h-full p-8 overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section with Wallet */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Perks Marketplace</h1>
            <p className="text-slate-500 mt-2 max-w-xl">
              Customize your compensation package by redeeming your benefits allowance on the perks that matter most to you.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-5 min-w-[260px] transition-transform hover:scale-105 duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Wallet size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Wallet Balance</p>
              <p className="text-3xl font-bold text-slate-800">${balance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Navigation and Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          
          {/* Tabs */}
          <div className="bg-white p-1 rounded-xl border border-gray-200 inline-flex">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all
                ${activeTab === 'browse' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              <ShoppingBag size={16} />
              Browse Perks
            </button>
            <button
              onClick={() => setActiveTab('redeemed')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all
                ${activeTab === 'redeemed' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              <Package size={16} />
              My Perks <span className="bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md text-xs">{redeemedIds.length}</span>
            </button>
          </div>

          {/* Category Filters (Only visible in Browse mode) */}
          {activeTab === 'browse' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
              <span className="text-sm font-medium text-slate-400 mr-2 flex items-center gap-1">
                <Filter size={14} /> Filter:
              </span>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border
                    ${selectedCategory === category 
                      ? 'bg-slate-800 text-white border-slate-800' 
                      : 'bg-white text-slate-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Perks Grid */}
        {filteredPerks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPerks.map((perk) => {
              const isRedeemed = redeemedIds.includes(perk.id);
              const canAfford = balance >= perk.price;
              const isFree = perk.price === 0;

              return (
                <div 
                  key={perk.id}
                  className={`relative flex flex-col bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg
                    ${isRedeemed 
                      ? 'border-emerald-100 bg-emerald-50/30' 
                      : 'border-gray-100 hover:border-gray-200'
                    }
                  `}
                >
                  {isRedeemed && (
                    <div className="absolute top-4 right-4 text-emerald-500 bg-white rounded-full p-1 shadow-sm">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border
                      ${isRedeemed ? 'bg-emerald-100 border-emerald-200 text-emerald-600' : 'bg-gray-50 border-gray-100 text-slate-600'}
                    `}>
                      {perk.icon}
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide
                      ${isRedeemed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}
                    `}>
                      {perk.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{perk.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                    {perk.description}
                  </p>

                  <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-slate-900">
                        {isFree ? 'Free' : `$${perk.price}`}
                      </span>
                      {!isFree && <span className="text-xs text-slate-400 font-medium ml-1">/{perk.period}</span>}
                    </div>

                    {isRedeemed ? (
                      <button 
                        disabled 
                        className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold flex items-center gap-2 cursor-default opacity-80"
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRedeem(perk)}
                        disabled={!canAfford || isReadOnly}
                        className={`px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all transform active:scale-95
                          ${!canAfford 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200'
                          }
                        `}
                      >
                        {isReadOnly ? <Lock size={14} /> : <ShoppingBag size={16} />}
                        {!canAfford ? 'No Funds' : 'Redeem'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={24} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700">No perks found</h3>
            <p className="text-slate-400 max-w-xs mt-1">
              {activeTab === 'redeemed' 
                ? "You haven't redeemed any perks yet. Browse the marketplace to find benefits." 
                : "Try adjusting your category filters to see more results."}
            </p>
            {activeTab === 'redeemed' && (
              <button 
                onClick={() => setActiveTab('browse')}
                className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Browse Marketplace
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default PerksView;