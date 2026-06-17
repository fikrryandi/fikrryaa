import React, { useState } from 'react';
import { Experience } from '../types';
import { 
  Plus, 
  Trash2, 
  History, 
  X, 
  Tag, 
  Edit3,
  Upload,
  Activity
} from 'lucide-react';


const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
      if (height > maxHeight) { width = Math.round((width * maxHeight) / height); height = maxHeight; }
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png', 0.9));
      } else { resolve(base64Str); }
    };
    img.onerror = () => resolve(base64Str);
  });
};

interface AdminExperiencesProps {
  experiences: Experience[];
  onAddExperience: (exp: Omit<Experience, 'id'>) => void;
  onUpdateExperience: (exp: Experience) => void;
  onDeleteExperience: (id: string) => void;
  isDarkMode?: boolean;
}

export default function AdminExperiences({
  experiences,
  onAddExperience,
  onUpdateExperience,
  onDeleteExperience,
  isDarkMode = false
}: AdminExperiencesProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [years, setYears] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [editTitle, setEditTitle] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editYears, setEditYears] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTagsInput, setEditTagsInput] = useState('');
  const [editCompanyLogo, setEditCompanyLogo] = useState('');
  const [isEditUploading, setIsEditUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (isEditMode) setIsEditUploading(true);
    else setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      const compressed = await compressImage(base64String);
      if (isEditMode) {
        setEditCompanyLogo(compressed);
        setIsEditUploading(false);
      } else {
        setCompanyLogo(compressed);
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      if (isEditMode) setIsEditUploading(false);
      else setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company || !years || !description) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    onAddExperience({
      title,
      company,
      years,
      location,
      description,
      tags,
      companyLogo
    });

    setTitle('');
    setCompany('');
    setYears('');
    setLocation('');
    setDescription('');
    setTagsInput('');
    setCompanyLogo('');
    setShowAddForm(false);
  };

  const handleStartEdit = (exp: Experience) => {
    setEditingExperience(exp);
    setEditTitle(exp.title);
    setEditCompany(exp.company);
    setEditYears(exp.years);
    setEditLocation(exp.location || '');
    setEditDescription(exp.description);
    setEditTagsInput(exp.tags.join(', '));
    setEditCompanyLogo(exp.companyLogo || '');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience || !editTitle) return;

    const tags = editTagsInput.split(',').map(t => t.trim()).filter(Boolean);

    onUpdateExperience({
      ...editingExperience,
      title: editTitle,
      company: editCompany,
      years: editYears,
      location: editLocation,
      description: editDescription,
      tags,
      companyLogo: editCompanyLogo
    });

    setEditingExperience(null);
  };

  return (
    <div className={`space-y-6 animate-[fade-in_0.3s_ease-out] ${isDarkMode ? 'text-[#dce3f0]' : 'text-slate-700'}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
            <History className="text-blue-500 w-6 h-6" />
            Professional Work Timeline
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>Map chronological jobs, contracts, research roles or academic history displays on the bio card about section.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-600/15 cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Timeline Event
        </button>
      </div>

      {/* Render experience list in a pretty timeline look */}
      <div className="space-y-6 max-w-4xl">
        {experiences.map(exp => (
          <div key={exp.id} className={`relative pl-8 border-l pb-2 group text-left ${isDarkMode ? 'border-[#2e353f]' : 'border-slate-200'}`}>
            {/* Timeline Dot decoration */}
            <div className={`absolute left-[-6px] top-1.5 w-3 h-3 rounded-full border-2 group-hover:bg-purple-500 transition-colors ${
              isDarkMode ? 'bg-blue-500 border-[#111827]' : 'bg-blue-500 border-white'
            }`}></div>

            <div className={`border rounded-xl p-6 hover:border-blue-500/30 transition-all ${
              isDarkMode 
                ? 'bg-[#111827]/75 border-[#2e353f]' 
                : 'bg-white border-slate-200 shadow-sm shadow-slate-100/30'
            }`}>
              <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                <div>
                  <h3 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{exp.title}</h3>
                  <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider">{exp.company}</p>
                </div>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded border ${
                  isDarkMode 
                    ? 'bg-[#1e2530] text-[#a0a5b5] border-[#2e353f]/50' 
                    : 'bg-slate-50 text-slate-500 border-slate-200/60'
                }`}>
                  {exp.years}
                </span>
              </div>
              
              {exp.location && (
                <p className="text-xs text-slate-500 font-semibold mb-3 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {exp.location}
                </p>
              )}

              <p className={`text-sm leading-relaxed mb-4 font-normal ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-600'}`}>{exp.description}</p>

              <div className={`flex flex-wrap justify-between items-center gap-4 pt-3 border-t ${
                isDarkMode ? 'border-[#2e353f]/30' : 'border-slate-100'
              }`}>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map(t => (
                    <span key={t} className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                      isDarkMode 
                        ? 'bg-blue-505/10 border-blue-500/20 text-blue-300' 
                        : 'bg-blue-50 border-blue-150 text-blue-600'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => handleStartEdit(exp)}
                    className={`p-1 px-3 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                      isDarkMode 
                        ? 'bg-[#1e2530] text-[#a0a5b5] hover:text-white border-[#2e353f]' 
                        : 'bg-white text-slate-600 hover:text-slate-800 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Edit3 className="w-3 h-3 text-[#507fff]" />
                    Modify
                  </button>
                  <button
                    onClick={() => onDeleteExperience(exp.id)}
                    className={`p-1 px-3 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                      isDarkMode 
                        ? 'bg-red-500/10 hover:bg-red-500/25 text-red-400 border-red-500/20' 
                        : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200/50'
                    }`}
                  >
                    <Trash2 className="w-3 h-3 text-red-500" />
                    Remove
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Add Experience Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className={`border rounded-2xl max-w-md w-full overflow-y-auto max-h-[90vh] shadow-2xl relative animate-[scale-up_0.2s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${
              isDarkMode ? 'border-[#2e353f] bg-[#0a0f16]' : 'border-slate-200 bg-slate-50/80'
            }`}>
              <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Add Experience Timeline Event</h3>
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
                }`}>Job Title / Designation</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-blue-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:bg-white'
                  }`} 
                  placeholder="e.g. Senior UX Architect"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Company / Institution</label>
                  <input 
                    type="text" 
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-blue-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:bg-white'
                    }`} 
                    placeholder="e.g. Google DeepMind"
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Duration / Years</label>
                  <input 
                    type="text" 
                    required
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-blue-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:bg-white'
                    }`} 
                    placeholder="e.g. 2021 - Present"
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Location</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-blue-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:bg-white'
                  }`} 
                  placeholder="e.g. Jakarta, Indonesia"
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Associated Tech Stack (Comma separated)</label>
                <input 
                  type="text" 
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-blue-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:bg-white'
                  }`} 
                  placeholder="React, TypeScript, Optimization"
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Logo Perusahaan (Opsional)</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                  <div className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 w-full sm:w-1/2 transition-colors ${
                    isDarkMode ? 'border-[#2e353f] hover:bg-[#181f2a]' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, false)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2"><Activity className="w-5 h-5 text-blue-500 animate-spin" /><span className="text-[10px] font-bold text-slate-400">MEMPROSES...</span></div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center"><Upload className="w-6 h-6 text-blue-500" /><span className="text-[11px] font-bold text-slate-500">Pilih / Seret Logo Perusahaan</span></div>
                    )}
                  </div>
                  {companyLogo && <div className="w-full sm:w-1/2 flex justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><img src={companyLogo} alt="Logo" className="max-h-16 object-contain rounded-lg" /></div>}
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Key Contributions & Description</label>
                <textarea 
                  rows={4} 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none resize-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-blue-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:bg-white'
                  }`} 
                  placeholder="Led transitions to clean UI architectures, improved payload efficiencies..."
                ></textarea>
              </div>

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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded cursor-pointer"
                >
                  Save Timeline Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Experience Modal */}
      {editingExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className={`border rounded-2xl max-w-md w-full overflow-y-auto max-h-[90vh] shadow-2xl relative animate-[scale-up_0.2s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${
              isDarkMode ? 'border-[#2e353f] bg-[#0a0f16]' : 'border-slate-200 bg-slate-50/80'
            }`}>
              <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Edit Timeline Job Details</h3>
              <button onClick={() => setEditingExperience(null)} className={`transition-colors cursor-pointer ${
                isDarkMode ? 'text-[#8c909f] hover:text-white' : 'text-slate-400 hover:text-slate-600'
              }`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Job Title</label>
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
                  }`}>Company</label>
                  <input 
                    type="text" 
                    required
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`} 
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Duration</label>
                  <input 
                    type="text" 
                    required
                    value={editYears}
                    onChange={(e) => setEditYears(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`} 
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Location</label>
                <input 
                  type="text" 
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Associated Tech Stack</label>
                <input 
                  type="text" 
                  value={editTagsInput}
                  onChange={(e) => setEditTagsInput(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Logo Perusahaan (Opsional)</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                  <div className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 w-full sm:w-1/2 transition-colors ${
                    isDarkMode ? 'border-[#2e353f] hover:bg-[#181f2a]' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, true)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {isEditUploading ? (
                      <div className="flex flex-col items-center gap-2"><Activity className="w-5 h-5 text-blue-500 animate-spin" /><span className="text-[10px] font-bold text-slate-400">MEMPROSES...</span></div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center"><Upload className="w-6 h-6 text-blue-500" /><span className="text-[11px] font-bold text-slate-500">Pilih / Seret Logo Perusahaan</span></div>
                    )}
                  </div>
                  {editCompanyLogo && <div className="w-full sm:w-1/2 flex justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800"><img src={editCompanyLogo} alt="Logo" className="max-h-16 object-contain rounded-lg" /></div>}
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Key Contributions & Description</label>
                <textarea 
                  rows={4} 
                  required
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none resize-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingExperience(null)}
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
