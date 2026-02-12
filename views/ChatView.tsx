
import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Conversation, Message, User } from '../types';
import { Send, ChevronLeft, MessageCircle, Shield, Info, AlertTriangle } from 'lucide-react';

interface ChatViewProps {
  currentUser: User;
  onBack: () => void;
  selectedConversationId?: string;
}

const ChatView: React.FC<ChatViewProps> = ({ currentUser, onBack, selectedConversationId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeConv) {
      loadMessages(activeConv.id);
    }
  }, [activeConv]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadConversations = async () => {
    setLoading(true);
    const list = await api.getConversations(currentUser.id, currentUser.role);
    setConversations(list);
    
    if (selectedConversationId) {
      const found = list.find(c => c.id === selectedConversationId);
      if (found) setActiveConv(found);
    }
    setLoading(false);
  };

  const loadMessages = async (id: string) => {
    const list = await api.getMessages(id);
    setMessages(list);
  };

  const validatePII = (text: string) => {
    // Regex para teléfonos (MX 10 dígitos), correos y links
    const phoneRegex = /(\d{2}\s?\d{4}\s?\d{4}|\d{10})/g;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

    if (phoneRegex.test(text) || emailRegex.test(text) || linkRegex.test(text)) {
      return false;
    }
    return true;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    
    const text = inputText.trim();

    if (!validatePII(text)) {
      setSecurityAlert("Por tu seguridad, no compartas teléfonos, emails o links externos en el chat.");
      setTimeout(() => setSecurityAlert(null), 4000);
      return;
    }

    setInputText('');
    const msg = await api.sendMessage(activeConv.id, currentUser.id, text);
    setMessages(prev => [...prev, msg]);
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Cargando tus conversaciones...</div>;

  // Render Conversation List
  if (!activeConv) {
    return (
      <div className="p-6 space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3">
          <MessageCircle className="text-green-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">Mis Mensajes</h2>
        </div>
        
        {conversations.length === 0 ? (
          <div className="text-center py-20 px-8 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">Aún no tienes conversaciones con ningún criador.</p>
            <p className="text-[10px] text-gray-400 mt-2">¡Explora el directorio y contacta a tu favorito!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {conversations.map(c => (
              <div 
                key={c.id} 
                onClick={() => setActiveConv(c)}
                className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-green-100 cursor-pointer transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 font-bold shrink-0 shadow-inner">
                  {(currentUser.role === 'USER' ? c.breederName : c.userName)[0].toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-gray-800 truncate pr-2">
                      {currentUser.role === 'USER' ? c.breederName : c.userName}
                    </h4>
                    <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">
                      {new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.lastMessage || '...'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render Active Chat
  return (
    <div className="flex flex-col h-[calc(100vh-128px)] bg-white animate-in slide-in-from-right duration-300 relative">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b flex items-center gap-3 bg-white z-10 shadow-sm">
        <button onClick={() => setActiveConv(null)} className="p-2 -ml-2 text-gray-400 hover:text-gray-600 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold shadow-inner">
          {(currentUser.role === 'USER' ? activeConv.breederName : activeConv.userName)[0].toUpperCase()}
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-sm text-gray-800 leading-tight truncate">
            {currentUser.role === 'USER' ? activeConv.breederName : activeConv.userName}
          </h3>
          <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
             <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Chat Protegido</span>
          </div>
        </div>
      </div>

      {/* Security Alert Float */}
      {securityAlert && (
        <div className="absolute top-16 left-4 right-4 z-20 animate-in slide-in-from-top-4">
          <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-2 shadow-lg">
            <AlertTriangle size={16} className="text-red-600 shrink-0" />
            <p className="text-[10px] text-red-800 font-bold leading-tight">{securityAlert}</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-3 no-scrollbar bg-gray-50/50"
      >
        <div className="flex flex-col items-center gap-2 py-6 mb-4">
          <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
             <Shield size={14} className="text-green-600" />
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Contacto Seguro Habilitado</p>
          </div>
          <p className="text-[9px] text-gray-400 text-center max-w-[200px]">
            Toda tu información personal está protegida. Evita compartir datos externos.
          </p>
        </div>

        {messages.map(m => {
          const isMine = m.senderId === currentUser.id;
          return (
            <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm ${
                isMine 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                {m.text}
                <div className="text-[8px] mt-1.5 text-right font-medium opacity-60">
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2 items-center">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-gray-100 border-none rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-inner"
        />
        <button 
          type="submit"
          className="w-11 h-11 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 disabled:opacity-40 transition-all"
          disabled={!inputText.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatView;
