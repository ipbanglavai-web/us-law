import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Send, ShieldCheck, User } from 'lucide-react';

export const ClientMessageWidget: React.FC = () => {
  const { currentRole, currentUser, messages, sendDirectMessage, markMessageRead } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const clientId = currentUser && 'id' in currentUser ? (currentUser as any).id : '';
  const clientMessages = messages.filter(m => m.clientId === clientId);
  const unreadCount = clientMessages.filter(m => m.sender === 'admin' && !m.isRead).length;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Mark admin messages as read
      clientMessages.forEach(m => {
        if (m.sender === 'admin' && !m.isRead) {
          markMessageRead(m.id);
        }
      });
    }
  }, [isOpen, clientMessages]);

  if (currentRole !== 'client' || !currentUser) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendDirectMessage(inputMessage, clientId);
    setInputMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="relative px-3.5 py-2.5 sm:px-4 sm:py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full shadow-2xl flex items-center gap-2 transition-all transform hover:scale-105 border-2 border-amber-300"
          title="Open Direct Admin Message Portal"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs tracking-wide hidden sm:inline">Direct Support Desk</span>
          <span className="text-xs tracking-wide sm:hidden">Support</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      ) : (
        <div className="w-[calc(100vw-2rem)] max-w-[400px] h-[480px] sm:h-[500px] bg-slate-900 border-2 border-amber-500/50 rounded-2xl shadow-2xl flex flex-col text-white overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-slate-950 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-legal font-bold text-xs text-slate-100">
                  US Law Enforcement Desk
                </h4>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Direct Secure Channel Active
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/60 font-sans text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-[11px] leading-relaxed">
              <strong className="text-amber-400 block mb-1">Official Legal Assistance</strong>
              Welcome to the direct messaging desk. Send inquiries, document clarifications, or urgent case updates directly to our compliance officers.
            </div>

            {clientMessages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'client' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed shadow-sm ${
                    m.sender === 'client'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none'
                      : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none font-sans'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1 text-[9px] opacity-75 font-mono">
                    <span>{m.sender === 'client' ? 'You' : 'Admin Duty Officer'}</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{m.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Type your message to admin..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-sans"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
