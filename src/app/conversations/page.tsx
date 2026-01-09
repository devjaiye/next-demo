"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, SlidersHorizontal, Paperclip, Send, 
  Phone, Video, Info, Image as ImageIcon,
  FileText, FileSpreadsheet
} from 'lucide-react';

// --- Types ---

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
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
    lastMessageTime: '10:20pm',
    unreadCount: 0,
    messages: [
      {
        id: 'm1',
        text: 'Hi Kunle, thanks for the time yesterday. I really enjoyed meeting the team.',
        senderId: 'me',
        timestamp: 'Yesterday',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm2',
        text: 'Glad to hear that! We were very impressed with your technical assessment.',
        senderId: 'u1',
        timestamp: 'Yesterday',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm3',
        text: 'I just wanted to follow up regarding the project timeline we discussed. Would the start date be flexible?',
        senderId: 'me',
        timestamp: '9:00am',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm4',
        text: 'Yes, we can definitely work around your notice period. Typically we look for a start within 30 days.',
        senderId: 'u1',
        timestamp: '10:15am',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm5',
        text: 'That sounds perfect. Also, could you send over the benefits package details when you get a chance?',
        senderId: 'me',
        timestamp: '10:18am',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm6',
        text: 'Sending it over to your email now. Let me know if you have questions!',
        senderId: 'u1',
        timestamp: '10:20am',
        isMe: false,
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
        text: 'Hi! Just wanted to check if you are available for a quick call regarding the Product Designer role?',
        senderId: 'u2',
        timestamp: 'Mon',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm2',
        text: 'Hey Sina, I am free this afternoon after 3pm.',
        senderId: 'me',
        timestamp: 'Mon',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm3',
        text: 'Great. I have sent a calendar invite.',
        senderId: 'u2',
        timestamp: 'Mon',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm4',
        text: 'We really liked your portfolio pieces on the fintech app.',
        senderId: 'u2',
        timestamp: '1:30pm',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm5',
        text: 'One quick question from the hiring manager: Do you have experience with Design Systems in Figma?',
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
      },
      {
        id: 'm2',
        text: 'No problem! Did you get a chance to review the API schema changes?',
        senderId: 'me',
        timestamp: 'Yesterday',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm3',
        text: 'Yes, looking at it now. I think we need to add a few more fields to the user object.',
        senderId: 'u3',
        timestamp: 'Yesterday',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm4',
        text: 'Specifically the "last_login" and "preferences" fields.',
        senderId: 'u3',
        timestamp: 'Yesterday',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm5',
        text: 'Got it. I will update the PR and ping you when it is ready for another look.',
        senderId: 'me',
        timestamp: 'Yesterday',
        isMe: true,
        status: 'read'
      }
    ]
  },
  {
    id: '4',
    userId: 'u4',
    userName: 'David Kim',
    userRole: 'Product Manager',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
    isOnline: false,
    lastMessageTime: 'Tuesday',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        text: 'Are we still on track for the Friday release?',
        senderId: 'u4',
        timestamp: 'Tuesday',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm2',
        text: 'Yes, the QA team just finished the regression testing.',
        senderId: 'me',
        timestamp: 'Tuesday',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm3',
        text: 'Excellent news. Stakeholders are very excited about this one.',
        senderId: 'u4',
        timestamp: 'Tuesday',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm4',
        text: 'Can you prepare a short demo video for the all-hands meeting?',
        senderId: 'u4',
        timestamp: 'Tuesday',
        isMe: false,
        status: 'delivered'
      }
    ]
  },
  {
    id: '5',
    userId: 'u5',
    userName: 'Emily Chen',
    userRole: 'Senior UI/UX Designer',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
    isOnline: true,
    lastMessageTime: 'Mon',
    unreadCount: 0,
    messages: [
      {
        id: 'm1',
        text: 'Check out the new icon set I pushed to the library.',
        senderId: 'u5',
        timestamp: 'Mon',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm2',
        text: 'Looks amazing! Great work on the stroke consistency.',
        senderId: 'me',
        timestamp: 'Mon',
        isMe: true,
        status: 'read'
      },
      {
        id: 'm3',
        text: 'Thanks! I was worried about the 24px grid alignment.',
        senderId: 'u5',
        timestamp: 'Mon',
        isMe: false,
        status: 'read'
      },
      {
        id: 'm4',
        text: 'It looks perfect on my end. I will start integrating them into the dashboard tomorrow.',
        senderId: 'me',
        timestamp: 'Mon',
        isMe: true,
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
        <p className="text-xs text-slate-500 mb-1 truncate">{conversation.userRole}</p>
        
        {/* Show last message preview */}
        <p className={`text-xs truncate ${conversation.unreadCount > 0 ? 'text-slate-800 font-bold' : 'text-slate-400'}`}>
           {conversation.messages[conversation.messages.length - 1]?.text}
        </p>
      </div>
      
      {conversation.unreadCount > 0 && (
        <div className="self-center ml-2">
          <div className="min-w-[1.25rem] h-5 px-1.5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
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

// --- Popups Content ---

const AttachmentPopup = ({ onAction }: { onAction: (type: 'doc' | 'sheet') => void }) => (
  <div className="w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 animate-in fade-in zoom-in-95 duration-200 origin-bottom-right">
    <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Attach</div>
    <button onClick={() => onAction('doc')} className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-sm text-slate-700 transition-colors">
      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><FileText size={16} /></div>
      Document
    </button>
    <button onClick={() => onAction('sheet')} className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-sm text-slate-700 transition-colors">
      <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><FileSpreadsheet size={16} /></div>
      Spreadsheet
    </button>
  </div>
);

// --- Main View ---

const ConversationsView: React.FC = () => {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string>('1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track active popup for Attachment only
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Hidden Input Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === selectedId) || conversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedId, activeConversation.messages]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setActivePopup(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setActivePopup(null);
  };

  const togglePopup = (type: string) => {
    setActivePopup(activePopup === type ? null : type);
  };

  // --- File Handling Functions ---

  const handleFileAction = (type: 'doc' | 'sheet') => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setActivePopup(null);
  };

  const handleDirectImageUpload = () => {
    if (imageInputRef.current) {
        imageInputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      alert(`Selected file: ${file.name}`);
      // Clear input
      e.target.value = '';
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.userRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full bg-white overflow-hidden">
      
      {/* --- Hidden Inputs for Native OS Dialogs --- */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={onFileChange} 
        style={{ display: 'none' }} 
      />
      <input 
        type="file" 
        ref={imageInputRef} 
        accept="image/*" 
        onChange={onFileChange} 
        style={{ display: 'none' }} 
      />

      {/* Sidebar List */}
      <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-200 bg-white">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-slate-800">Inbox</h2>
            <span className="px-2 py-0.5 bg-gray-100 text-slate-500 rounded-full text-xs font-bold border border-gray-200">
              {MOCK_CONVERSATIONS.reduce((acc, curr) => acc + curr.unreadCount, 0)}
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
          </div>
        </div>
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
        <header className="h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={activeConversation.userAvatar} alt={activeConversation.userName} className="w-10 h-10 rounded-full object-cover"/>
              {activeConversation.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">{activeConversation.userName}</h2>
              <p className="text-xs text-slate-500">{activeConversation.userRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"><Phone size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"><Video size={20} /></button>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"><Info size={20} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="flex justify-center mb-8">
            <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
              Today
            </span>
          </div>
          {activeConversation.messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} senderAvatar={activeConversation.userAvatar} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t border-gray-200 p-4 shrink-0 relative z-20">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center gap-2 bg-white border border-blue-100 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type here..."
              className="flex-1 px-4 py-3 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 h-12"
            />
            
            <div className="flex items-center gap-1 pr-2 relative" ref={popupRef}>
              
              {/* Attachment Popup */}
              {activePopup === 'attachment' && (
                <div className="absolute bottom-full right-0 mb-4 z-50">
                  <AttachmentPopup onAction={handleFileAction} />
                </div>
              )}

              {/* Attachment Button */}
              <button 
                type="button" 
                onClick={() => togglePopup('attachment')}
                className={`p-2 transition-colors rounded-lg ${activePopup === 'attachment' ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-gray-100'}`}
              >
                <Paperclip size={20} />
              </button>

              {/* Image Button - Direct Action */}
              <button 
                type="button" 
                onClick={handleDirectImageUpload}
                className="p-2 transition-colors rounded-lg text-slate-400 hover:text-slate-600 hover:bg-gray-100"
              >
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