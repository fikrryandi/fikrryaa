import React, { useState } from 'react';
import { Skill } from '../types';

// Helper to compress/scale uploaded image for skill icon (PNG preferred to support transparency)
const compressImage = (base64Str: string, maxWidth = 120, maxHeight = 120): Promise<string> => {
  return new Promise((resolve) => {
    if (true) {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png'));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};
import { 
  Plus, 
  Trash2, 
  Zap, 
  Database, 
  Code, 
  Cpu, 
  Globe, 
  Sliders, 
  X, 
  Sparkles, 
  Edit,
  Terminal,
  Server,
  Factory,
  Cog,
  Wrench,
  Smartphone,
  Palette,
  Shield,
  Atom
} from 'lucide-react';

interface AdminSkillsProps {
  skills: Skill[];
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
  onUpdateSkill: (skill: Skill) => void;
  onDeleteSkill: (id: string) => void;
  isDarkMode?: boolean;
}

export default function AdminSkills({
  skills,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill,
  isDarkMode = false
}: AdminSkillsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [proficiency, setProficiency] = useState(80);
  const [category, setCategory] = useState<string>('Frontend');
  const [icon, setIcon] = useState('code');

  const [editTitle, setEditTitle] = useState('');
  const [editProficiency, setEditProficiency] = useState(80);
  const [editCategory, setEditCategory] = useState<string>('Frontend');
  const [editIcon, setEditIcon] = useState('code');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddSkill({
      title,
      proficiency,
      category,
      icon
    });

    setTitle('');
    setProficiency(80);
    setCategory('Frontend');
    setIcon('code');
    setShowAddForm(false);
  };

  const handleStartEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setEditTitle(skill.title);
    setEditProficiency(skill.proficiency);
    setEditCategory(skill.category);
    setEditIcon(skill.icon || 'code');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editTitle) return;

    onUpdateSkill({
      ...editingSkill,
      title: editTitle,
      proficiency: editProficiency,
      category: editCategory,
      icon: editIcon
    });

    setEditingSkill(null);
  };

  const getIconElement = (iconName: string) => {
    if (!iconName) {
      return <Code className="w-6 h-6 text-purple-400" />;
    }

    // Check if the icon is a base64 Data URL or direct HTTP URL
    if (iconName.startsWith('data:') || iconName.startsWith('http://') || iconName.startsWith('https://')) {
      return (
        <img 
          src={iconName} 
          alt="Skill Icon" 
          className="w-full h-full object-cover rounded-lg"
          referrerPolicy="no-referrer"
        />
      );
    }

    switch (iconName.toLowerCase()) {
      case 'database':
        return <Database className="w-6 h-6 text-blue-400" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-orange-400" />;
      case 'cloud':
        return <Globe className="w-6 h-6 text-emerald-400" />;
      case 'terminal':
        return <Terminal className="w-6 h-6 text-zinc-400" />;
      case 'server':
        return <Server className="w-6 h-6 text-indigo-400" />;
      case 'factory':
        return <Factory className="w-6 h-6 text-amber-500" />;
      case 'cog':
        return <Cog className="w-6 h-6 text-sky-400" />;
      case 'wrench':
        return <Wrench className="w-6 h-6 text-teal-400" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-pink-400" />;
      case 'palette':
        return <Palette className="w-6 h-6 text-rose-400" />;
      case 'shield':
        return <Shield className="w-6 h-6 text-red-400" />;
      case 'atom':
        return <Atom className="w-6 h-6 text-cyan-400" />;
      default:
        return <Code className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <div className={`space-y-6 animate-[fade-in_0.3s_ease-out] ${isDarkMode ? 'text-[#dce3f0]' : 'text-slate-700'}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
            <Zap className="text-emerald-500 w-6 h-6 animate-pulse" />
            Skills & Tool Stack
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>Manage core tech skills, icons, and categories corresponding to your active areas.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-600/15 cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Skill Category
        </button>
      </div>

      {/* Grid of existing skills arranged by category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(skill => (
          <div key={skill.id} className={`border rounded-xl p-5 flex flex-col justify-between ${
            isDarkMode 
              ? 'bg-[#111827]/75 border-[#2e353f]' 
              : 'bg-white border-slate-200 shadow-sm shadow-slate-100/30'
          }`}>
            <div>
              <div className="flex justify-between items-start mb-4 text-left">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden shrink-0 ${
                    isDarkMode ? 'bg-[#1a212e] border-[#2e353f]' : 'bg-slate-50 border-slate-100'
                  }`}>
                    {getIconElement(skill.icon)}
                  </div>
                  <div>
                    <h3 className={`font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{skill.title}</h3>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${
                      isDarkMode 
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/10' 
                        : 'text-emerald-600 bg-emerald-50 border-emerald-200/50'
                    }`}>
                      {skill.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`pt-3 border-t flex justify-end gap-2 text-xs ${
              isDarkMode ? 'border-[#2e353f]/30' : 'border-slate-100'
            }`}>
              <button
                onClick={() => handleStartEdit(skill)}
                className={`p-1 px-3 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                  isDarkMode 
                    ? 'bg-[#1e2530] text-[#a0a5b5] hover:text-white border-[#2e353f]' 
                    : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Edit className="w-3 h-3 text-[#4d8eff]" />
                Edit
              </button>
              <button
                onClick={() => onDeleteSkill(skill.id)}
                className={`p-1 px-3 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                  isDarkMode 
                    ? 'bg-red-500/10 hover:bg-red-500/25 text-red-450 border-red-500/20' 
                    : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200/50'
                }`}
              >
                <Trash2 className="w-3 h-3 text-red-500" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className={`border rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-[scale-up_0.2s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${
              isDarkMode ? 'border-[#2e353f] bg-[#0a0f16]' : 'border-slate-200 bg-slate-50/80'
            }`}>
              <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Add New Skill</h3>
              <button onClick={() => setShowAddForm(false)} className={`transition-colors cursor-pointer ${
                isDarkMode ? 'text-[#8c909f] hover:text-white' : 'text-slate-400 hover:text-slate-600'
              }`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Skill Name</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-emerald-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500 focus:bg-white'
                  }`} 
                  placeholder="e.g. Kotlin, Docker, CAD Optimization"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Category</label>
                  <input 
                    type="text" 
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-emerald-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500 focus:bg-white'
                    }`} 
                    placeholder="e.g. Frontend, Desain"
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Display Icon</label>
                  <select 
                    value={['code', 'database', 'cpu', 'cloud', 'terminal', 'server', 'factory', 'cog', 'wrench', 'smartphone', 'palette', 'shield', 'atom'].includes(icon) ? icon : 'custom'}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'custom') {
                        setIcon('');
                      } else {
                        setIcon(val);
                      }
                    }}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-emerald-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500 focus:bg-white'
                    }`}
                  >
                    <option value="code">Code (IT / Default)</option>
                    <option value="database">Database SQL (IT)</option>
                    <option value="cpu">Cpu Core (IT Hardware)</option>
                    <option value="cloud">Cloud Hosting (IT Network)</option>
                    <option value="terminal">Terminal Console (IT / Scripting)</option>
                    <option value="server">Server Server (IT / Backend)</option>
                    <option value="factory">Factory Industri (Industri / Manufacture)</option>
                    <option value="cog">Gir Mesin / Cog (Industri / PLC)</option>
                    <option value="wrench">Kunci Inggris / Wrench (Industri)</option>
                    <option value="smartphone">Smartphone (IT Mobile App)</option>
                    <option value="palette">Palet Warna / Palette (Design)</option>
                    <option value="shield">Perisai / Shield (IT / Security)</option>
                    <option value="atom">Atom / ReactJS (IT / Frontend)</option>
                    <option value="custom">🖼️ Unggah / Gunakan Foto Kustom</option>
                  </select>
                </div>
              </div>

              {/* Optional Custom File Icon Upload */}
              {!['code', 'database', 'cpu', 'cloud', 'terminal', 'server', 'factory', 'cog', 'wrench', 'smartphone', 'palette', 'shield', 'atom'].includes(icon) && (
                <div className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-[#181f2a]/50 border-[#2e353f]/60' : 'bg-slate-50 border-slate-200'
                } space-y-3`}>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#adc6ff]' : 'text-emerald-600'
                  }`}>🖼️ Unggah Berkas Foto Ikon</label>
                  
                  <div className="flex gap-3 items-center">
                    <div className={`w-12 h-12 rounded-lg border flex items-center justify-center shrink-0 overflow-hidden ${
                      isDarkMode ? 'border-[#2e353f] bg-black/20' : 'border-slate-200 bg-white'
                    }`}>
                      {icon && icon.startsWith('data:') ? (
                        <img src={icon} alt="Custom Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    
                    <div className="flex-grow text-left">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') {
                                compressImage(reader.result).then(compressed => {
                                  setIcon(compressed);
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className={`w-full text-xs text-gray-550 file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer`}
                      />
                      <p className="text-[9px] text-[#8c909f] mt-1 font-semibold leading-relaxed">
                        Pilih file dari perangkat Anda. Resolusi akan diperkecil otomatis demi performa terbaik.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Proficiency Level input removed as requested */}

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className={`px-4 py-2 border text-xs font-bold rounded transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'border-[#2e353f] text-[#c2c6d6] hover:bg-[#1e2530]' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-105'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded cursor-pointer"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Skill Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className={`border rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-[scale-up_0.2s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${
              isDarkMode ? 'border-[#2e353f] bg-[#0a0f16]' : 'border-slate-200 bg-slate-50/80'
            }`}>
              <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Edit Skill Proficiency</h3>
              <button onClick={() => setEditingSkill(null)} className={`transition-colors cursor-pointer ${
                isDarkMode ? 'text-[#8c909f] hover:text-white' : 'text-slate-400 hover:text-slate-600'
              }`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Skill Name</label>
                <input 
                  type="text" 
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Category</label>
                  <input 
                    type="text" 
                    required
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`} 
                    placeholder="e.g. Frontend, Desain"
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Display Icon</label>
                  <select 
                    value={['code', 'database', 'cpu', 'cloud', 'terminal', 'server', 'factory', 'cog', 'wrench', 'smartphone', 'palette', 'shield', 'atom'].includes(editIcon) ? editIcon : 'custom'}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'custom') {
                        setEditIcon('');
                      } else {
                        setEditIcon(val);
                      }
                    }}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`}
                  >
                    <option value="code">Code (IT / Default)</option>
                    <option value="database">Database SQL (IT)</option>
                    <option value="cpu">Cpu Core (IT Hardware)</option>
                    <option value="cloud">Cloud Hosting (IT Network)</option>
                    <option value="terminal">Terminal Console (IT / Scripting)</option>
                    <option value="server">Server Server (IT / Backend)</option>
                    <option value="factory">Factory Industri (Industri / Manufacture)</option>
                    <option value="cog">Gir Mesin / Cog (Industri / PLC)</option>
                    <option value="wrench">Kunci Inggris / Wrench (Industri)</option>
                    <option value="smartphone">Smartphone (IT Mobile App)</option>
                    <option value="palette">Palet Warna / Palette (Design)</option>
                    <option value="shield">Perisai / Shield (IT / Security)</option>
                    <option value="atom">Atom / ReactJS (IT / Frontend)</option>
                    <option value="custom">🖼️ Unggah / Gunakan Foto Kustom</option>
                  </select>
                </div>
              </div>

              {/* Optional Custom File Icon Upload */}
              {!['code', 'database', 'cpu', 'cloud', 'terminal', 'server', 'factory', 'cog', 'wrench', 'smartphone', 'palette', 'shield', 'atom'].includes(editIcon) && (
                <div className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-[#181f2a]/50 border-[#2e353f]/60' : 'bg-slate-50 border-slate-200'
                } space-y-3`}>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#adc6ff]' : 'text-purple-600'
                  }`}>🖼️ Unggah Berkas Foto Ikon</label>
                  
                  <div className="flex gap-3 items-center">
                    <div className={`w-12 h-12 rounded-lg border flex items-center justify-center shrink-0 overflow-hidden ${
                      isDarkMode ? 'border-[#2e353f] bg-black/20' : 'border-slate-200 bg-white'
                    }`}>
                      {editIcon && editIcon.startsWith('data:') ? (
                        <img src={editIcon} alt="Custom Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                    
                    <div className="flex-grow text-left">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') {
                                compressImage(reader.result).then(compressed => {
                                  setEditIcon(compressed);
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className={`w-full text-xs text-gray-550 file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer`}
                      />
                      <p className="text-[9px] text-[#8c909f] mt-1 font-semibold leading-relaxed">
                        Pilih file dari perangkat Anda. Resolusi akan diperkecil otomatis demi performa terbaik.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Proficiency Level input removed as requested */}

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingSkill(null)}
                  className={`px-4 py-2 border text-xs font-bold rounded transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'border-[#2e353f] text-[#c2c6d6] hover:bg-[#1e2530]' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-105'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white rounded cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
