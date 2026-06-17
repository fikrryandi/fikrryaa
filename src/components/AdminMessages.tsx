import React, { useState } from 'react';
import { Message } from '../types';
import { 
  Mail, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Reply, 
  X, 
  Check, 
  Send, 
  CheckCircle2 
} from 'lucide-react';

interface AdminMessagesProps {
  messages: Message[];
  onMarkMessageRead: (id: string, status: 'READ' | 'UNREAD') => void;
  onDeleteMessage: (id: string) => void;
  isDarkMode?: boolean;
}

export default function AdminMessages({
  messages,
  onMarkMessageRead,
  onDeleteMessage,
  isDarkMode = false
}: AdminMessagesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  
  // Quick Reply simulation state
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);

  const filteredMessages = messages.filter(m => 
    m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (msg.status === 'UNREAD') {
      onMarkMessageRead(msg.id, 'READ');
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText) return;

    setReplySuccess(true);
    setTimeout(() => {
      setReplySuccess(false);
      setReplyText('');
      setSelectedMessage(null);
    }, 3000);
  };

  return (
    <div className={`space-y-6 animate-[fade-in_0.3s_ease-out] ${isDarkMode ? 'text-[#dce3f0]' : 'text-slate-700'}`}>
      <div>
        <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
          <Mail className="text-red-450 w-6 h-6" />
          Inbox Leads & Communications
        </h2>
        <p className={`text-sm ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>View incoming business leads, project proposals, and draft quick email response simulations.</p>
      </div>

      {/* Messages layout builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Messages List Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Search bar input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8c909f]" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-purple-500 outline-none transition-all ${
                isDarkMode 
                  ? 'bg-[#111827]/75 border-[#2e353f] text-white focus:bg-[#181f2a]' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
              }`} 
              placeholder="Search by sender or core text..."
            />
          </div>

          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {filteredMessages.length === 0 ? (
              <div className={`p-8 border rounded-xl text-center ${
                isDarkMode ? 'bg-[#111827]/55 border-[#2e353f] text-[#8c909f]' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <Mail className="w-10 h-10 mx-auto mb-3 opacity-35" />
                <p className="text-sm font-semibold">No matches found.</p>
              </div>
            ) : (
              filteredMessages.map(msg => (
                <div 
                  key={msg.id}
                  onClick={() => handleOpenMessage(msg)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    selectedMessage?.id === msg.id 
                      ? isDarkMode 
                        ? 'border-purple-500 bg-purple-950/20 shadow-lg' 
                        : 'border-purple-500 bg-purple-50 shadow-md shadow-purple-500/5'
                      : msg.status === 'UNREAD'
                        ? isDarkMode 
                          ? 'border-red-500/30 bg-red-950/5 hover:bg-[#1a212e]'
                          : 'border-red-200 bg-red-50/40 hover:bg-red-50'
                        : isDarkMode
                          ? 'border-[#2e353f]/60 bg-[#111827]/55 hover:bg-[#1a212e]'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-bold text-xs sm:text-sm flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                      {msg.status === 'UNREAD' && (
                        <span className="w-2 h-2 bg-red-400 rounded-full animate-ping"></span>
                      )}
                      {msg.sender}
                    </span>
                    <span className="text-[10px] text-[#8c909f] font-semibold">{msg.dateText || 'Just now'}</span>
                  </div>
                  <h4 className={`text-xs font-semibold tracking-tight mb-1 truncate ${isDarkMode ? 'text-[#adc6ff]' : 'text-purple-650'}`}>{msg.subject}</h4>
                  <p className={`text-xs line-clamp-2 leading-relaxed ${isDarkMode ? 'text-[#a0a5b5]' : 'text-slate-500'}`}>
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Message Viewer Column */}
        <div className="lg:col-span-6">
          {selectedMessage ? (
            <div className={`border rounded-xl p-6 space-y-4 ${
              isDarkMode ? 'bg-[#111827]/75 border-[#2e353f]' : 'bg-white border-slate-200 shadow-sm shadow-slate-100/10'
            }`}>
              <div className={`flex justify-between items-start pb-4 border-b ${isDarkMode ? 'border-[#2e353f]/50' : 'border-slate-100'}`}>
                <div className="text-left">
                  <h3 className={`font-bold text-medium ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{selectedMessage.sender}</h3>
                  <a href={`mailto:${selectedMessage.email}`} className={`text-xs font-semibold ${isDarkMode ? 'text-[#adc6ff] hover:underline' : 'text-purple-600 hover:underline'}`}>{selectedMessage.email}</a>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onMarkMessageRead(selectedMessage.id, selectedMessage.status === 'READ' ? 'UNREAD' : 'READ')}
                    className="p-1 px-3 rounded bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border border-purple-500/25 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Mark {selectedMessage.status === 'READ' ? 'Unread' : 'Read'}
                  </button>
                  <button
                    onClick={() => {
                      onDeleteMessage(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                    className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                    title="Delete message permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-left">
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-400'}`}>Subject</p>
                <p className={`font-semibold text-sm mb-4 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>{selectedMessage.subject}</p>
                
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-400'}`}>Content</p>
                <div className={`border rounded-xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  isDarkMode 
                    ? 'bg-[#18212d] border-[#2e353f]/40 text-[#c2c6d6]' 
                    : 'bg-slate-50 border-slate-150 text-slate-700'
                }`}>
                  {selectedMessage.message}
                </div>
              </div>

              {/* Reply form simulation */}
              <div className={`pt-4 space-y-4 border-t ${isDarkMode ? 'border-[#2e353f]/50' : 'border-slate-100'}`}>
                <h4 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-500'}`}>
                  <Reply className={`w-3.5 h-3.5 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                  Send Response Simulation
                </h4>
                
                <form onSubmit={handleSendReply} className="space-y-3 text-left">
                  <textarea 
                    rows={3}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className={`w-full rounded-xl p-3 text-xs outline-none resize-none font-normal leading-relaxed ${
                      isDarkMode 
                        ? 'bg-[#18202b] border border-[#2e353f] text-white focus:border-purple-500 placeholder-[#8c909f]/40' 
                        : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-purple-500 placeholder-slate-400 focus:bg-white'
                    }`} 
                    placeholder={`Compose responsive layout reply back to ${selectedMessage.sender}...`}
                  ></textarea>

                  {replySuccess && (
                    <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 animate-pulse">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Email dispatched! Simulated reply sent successfully.
                    </div>
                  )}

                  <button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 w-full cursor-pointer transition-all"
                  >
                    Deliver Simulated Mail
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>

            </div>
          ) : (
            <div className={`border rounded-xl p-8 text-center h-full flex flex-col justify-center items-center min-h-[350px] ${
              isDarkMode 
                ? 'bg-[#111827]/40 border-[#2e353f]/50 text-[#8c909f]' 
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <Mail className={`w-12 h-12 mb-4 ${isDarkMode ? 'text-[#2e353f]' : 'text-slate-350'}`} />
              <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>Preview Lead Message</h4>
              <p className={`text-xs max-w-xs ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-400'}`}>Select any entry in the inbox column leftwards to view subject, full message content, and draft quick replies.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
