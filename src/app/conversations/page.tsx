"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, SlidersHorizontal, Paperclip, Send, 
  Phone, Video, Info, Image as ImageIcon,
} from 'lucide-react';

// --- Types ---

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string; // Display string for simplicity e.g. "10:20pm"
  isMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatar: string;
  isOnline: boolean;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

// --- Mock Data ---

const CURRENT_USER_AVATAR = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100&h=100";

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Kunle Uthman',
    userRole: 'Hiring Manager',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
    isOnline: true,
    lastMessageTime: '7:35pm',
    unreadCount: 0,
    messages: [
      {
        id: 'm1',
        text: 'Dåsk serad prengen. Hong plafåligen än solig. Supraskapet blinga. Pojäns gigamylingar vara. Revis pibengen. Aling bebelt.',
        senderId: 'u1',
        timestamp: 'Sent at 12.15pm',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm2',
        text: 'Mafifår behökåsa. Faplav spektiga. Boktigt fagon abfili. Hyment teragisk.',
        senderId: 'me',
        timestamp: 'Read at 1.15pm',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm3',
        text: 'Ponade astroliga. Fatispena beska. Bebesm pona.',
        senderId: 'u1',
        timestamp: 'Sent at 1.18pm',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm4',
        text: 'Nent fyra avis. Grexit sön. Regt sost kvasisamma.',
        senderId: 'me',
        timestamp: 'Read at 1.30pm',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm5',
        text: 'Tempopod sor noheten.',
        senderId: 'u1',
        timestamp: 'Sent at 2.08pm',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm6',
        text: 'Speling din respektive ben. Kabel fassade ande. Nyvis egonera i viralgranska.',
        senderId: 'me',
        timestamp: 'Read at 1.30pm',
        isMe: true,
        status: 'read'
      }
    ]
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Sina Babalola',
    userRole: 'Recruiter',
    userAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100',
    isOnline: false,
    lastMessageTime: '1:35pm',
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        text: 'Hi, are you available for a quick call regarding the Product Designer role?',
        senderId: 'u2',
        timestamp: '1:30pm',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm2',
        text: 'We were impressed with your portfolio.',
        senderId: 'u2',
        timestamp: '1:35pm',
        isMe: false,
        status: 'delivered'
      }
    ]
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Sarah Jenkins',
    userRole: 'Technical Lead',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
    isOnline: true,
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm1',
        text: 'The documentation you sent over looks great. Thanks!',
        senderId: 'u3',
        timestamp: 'Yesterday',
        isMe: false,
        status: 'read'
      }
    ]
  }
];

// --- Components ---

const ConversationItem: React.FC<{ 
  conversation: Conversation; 
  isActive: boolean; 
  onClick: () => void;
}> = ({ 
  conversation, 
  isActive, 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 flex items-start gap-3 cursor-pointer transition-colors border-b border-gray-50
        ${isActive ? 'bg-slate-100' : 'bg-white hover:bg-gray-50'}
      `}
    >
      <div className="relative shrink-0">
        <img 
          src={conversation.userAvatar} 
          alt={conversation.userName} 
          className="w-12 h-12 rounded-full object-cover border border-gray-100"
        />
        {conversation.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-0.5">
          <h3 className={`text-sm font-bold truncate ${isActive ? 'text-slate-900' : 'text-slate-800'}`}>
            {conversation.userName}
          </h3>
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-2">
            {conversation.lastMessageTime}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-1">{conversation.userRole}</p>
        
        {/* Preview of last message could go here if design required it */}
      </div>
      
      {conversation.unreadCount > 0 && (
        <div className="self-center">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            {conversation.unreadCount}
          </div>
        </div>
      )}
    </div>
  );
};

const ChatBubble: React.FC<{ message: Message; senderAvatar: string }> = ({ message, senderAvatar }) => {
  return (
    <div className={`flex gap-3 mb-6 ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      <img 
        src={message.isMe ? CURRENT_USER_AVATAR : senderAvatar} 
        alt="avatar" 
        className="w-8 h-8 rounded-full object-cover shrink-0 self-end mb-1"
      />
      
      <div className={`flex flex-col max-w-[70%] ${message.isMe ? 'items-end' : 'items-start'}`}>
        <div 
          className={`px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
            ${message.isMe 
              ? 'bg-blue-600 text-white rounded-br-none' 
              : 'bg-gray-200 text-slate-800 rounded-bl-none'
            }
          `}
        >
          {message.text}
        </div>
        <div className="flex items-center gap-1 mt-1.5 px-1">
          <span className="text-[10px] text-slate-400 font-medium">
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Main View ---

const ConversationsView: React.FC = () => {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string>('1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === selectedId) || conversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedId, activeConversation.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      senderId: 'me',
      timestamp: `Sent at ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase()}`,
      isMe: true,
      status: 'sent'
    };

    const updatedConversations = conversations.map(c => {
      if (c.id === selectedId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessageTime: 'Just now'
        };
      }
      return c;
    });

    setConversations(updatedConversations);
    setInputText('');
  };

  const filteredConversations = conversations.filter(c => 
    c.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.userRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full bg-white overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-200 bg-white">
        
        {/* Sidebar Header */}
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-slate-800">Inbox</h2>
            <span className="px-2 py-0.5 bg-gray-100 text-slate-500 rounded-full text-xs font-bold border border-gray-200">
              20
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Messages" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conv => (
            <ConversationItem 
              key={conv.id}
              conversation={conv}
              isActive={selectedId === conv.id}
              onClick={() => setSelectedId(conv.id)}
            />
          ))}
          {filteredConversations.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">
              No conversations found.
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50 h-full relative">
        
        {/* Chat Header */}
        <header className="h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={activeConversation.userAvatar} 
                alt={activeConversation.userName} 
                className="w-10 h-10 rounded-full object-cover"
              />
              {activeConversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">{activeConversation.userName}</h2>
              <p className="text-xs text-slate-500">{activeConversation.userRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <Phone size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <Video size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              <Info size={20} />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="flex justify-center mb-8">
            <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
              Monday 10.20pm
            </span>
          </div>
          
          {activeConversation.messages.map((msg) => (
            <ChatBubble 
              key={msg.id} 
              message={msg} 
              senderAvatar={activeConversation.userAvatar} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4 shrink-0">
          <form 
            onSubmit={handleSendMessage}
            className="max-w-4xl mx-auto relative flex items-center gap-2 bg-white border border-blue-100 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all"
          >
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type here..."
              className="flex-1 px-4 py-3 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 h-12"
            />
            
            <div className="flex items-center gap-1 pr-2">
              <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <Paperclip size={20} />
              </button>
              <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <ImageIcon size={20} />
              </button>
              <div className="w-px h-6 bg-gray-200 mx-1"></div>
              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-slate-200 disabled:cursor-not-allowed shadow-md shadow-blue-200"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ConversationsView;
