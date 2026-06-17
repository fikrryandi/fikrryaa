import React, { useState } from 'react';
import { Education } from '../types';
import { 
  Plus, 
  Trash2, 
  GraduationCap, 
  X, 
  Edit3 
} from 'lucide-react';

interface AdminEducationsProps {
  educations: Education[];
  onAddEducation: (edu: Omit<Education, 'id'>) => void;
  onUpdateEducation: (edu: Education) => void;
  onDeleteEducation: (id: string) => void;
  isDarkMode?: boolean;
}

export default function AdminEducations({
  educations,
  onAddEducation,
  onUpdateEducation,
  onDeleteEducation,
  isDarkMode = false
}: AdminEducationsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  // Form Fields
  const [stage, setStage] = useState('');
  const [stageEN, setStageEN] = useState('');
  const [school, setSchool] = useState('');
  const [schoolEN, setSchoolEN] = useState('');
  const [years, setYears] = useState('');

  const [editStage, setEditStage] = useState('');
  const [editStageEN, setEditStageEN] = useState('');
  const [editSchool, setEditSchool] = useState('');
  const [editSchoolEN, setEditSchoolEN] = useState('');
  const [editYears, setEditYears] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stage || !school || !years) return;

    onAddEducation({
      stage,
      stageEN: stageEN || stage,
      school,
      schoolEN: schoolEN || school,
      years
    });

    setStage('');
    setStageEN('');
    setSchool('');
    setSchoolEN('');
    setYears('');
    setShowAddForm(false);
  };

  const handleStartEdit = (edu: Education) => {
    setEditingEducation(edu);
    setEditStage(edu.stage);
    setEditStageEN(edu.stageEN || edu.stage);
    setEditSchool(edu.school);
    setEditSchoolEN(edu.schoolEN || edu.school);
    setEditYears(edu.years);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation || !editStage || !editSchool) return;

    onUpdateEducation({
      ...editingEducation,
      stage: editStage,
      stageEN: editStageEN || editStage,
      school: editSchool,
      schoolEN: editSchoolEN || editSchool,
      years: editYears
    });

    setEditingEducation(null);
  };

  return (
    <div className={`space-y-6 animate-[fade-in_0.3s_ease-out] ${isDarkMode ? 'text-[#dce3f0]' : 'text-slate-700'}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
            <GraduationCap className="text-sky-500 w-6 h-6" />
            Riwayat Pendidikan / Education History
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>
            Kelola dan edit riwayat sekolah, jenjang pendidikan, akademis, dan tahun lulusan yang tampil pada halaman utama.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-5 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-sky-600/15 cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tambah Riwayat
        </button>
      </div>

      {/* Render educations list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educations.length === 0 ? (
          <div className={`col-span-full border border-dashed rounded-xl p-8 text-center ${
            isDarkMode ? 'border-[#2e353f] bg-[#0c121a]' : 'border-slate-200 bg-slate-50'
          }`}>
            <p className="text-sm">Belum ada riwayat pendidikan. Klik tombol di atas untuk menambahkan.</p>
          </div>
        ) : (
          educations.map(edu => (
            <div key={edu.id} className={`border rounded-2xl p-6 relative flex flex-col justify-between hover:border-sky-500/30 transition-all text-left ${
              isDarkMode 
                ? 'bg-[#111827]/75 border-[#2e353f]' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    isDarkMode ? 'bg-sky-950/40 text-sky-400' : 'bg-sky-50 text-sky-600'
                  }`}>
                    {edu.years}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleStartEdit(edu)}
                      className={`p-1.5 rounded hover:bg-sky-500/10 cursor-pointer text-slate-400 hover:text-sky-500 ${
                        isDarkMode ? 'hover:bg-sky-500/15' : ''
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteEducation(edu.id)}
                      className="p-1.5 rounded hover:bg-red-500/10 cursor-pointer text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#727d97]">Jenjang / Stage (ID)</span>
                    <h3 className={`text-base font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {edu.stage}
                    </h3>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#727d97]">Jenjang / Stage (EN)</span>
                    <h4 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {edu.stageEN || edu.stage}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-dashed border-slate-700/10 dark:border-white/5 space-y-2">
                    <div>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>
                        <span className="font-extrabold">Sekolah (ID): </span>{edu.school}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-semibold`}>
                        <span className="font-extrabold">Sekolah (EN): </span>{edu.schoolEN || edu.school}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Education Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className={`border rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-[scale-up_0.2s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${
              isDarkMode ? 'border-[#2e353f] bg-[#0a0f16]' : 'border-slate-200 bg-slate-50/80'
            }`}>
              <h3 className={`font-bold text-base flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                <GraduationCap className="text-sky-500 w-5 h-5" />
                Tambah Riwayat Pendidikan
              </h3>
              <button onClick={() => setShowAddForm(false)} className={`transition-colors cursor-pointer ${
                isDarkMode ? 'text-[#8c909f] hover:text-white' : 'text-slate-400 hover:text-slate-600'
              }`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 text-left">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Jenjang Pendidikan (Bahasa Indonesia)</label>
                <input 
                  type="text" 
                  required
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                  }`} 
                  placeholder="Contoh: Sekolah Menengah Tinggi"
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Jenjang Pendidikan (English Translation)</label>
                <input 
                  type="text" 
                  value={stageEN}
                  onChange={(e) => setStageEN(e.target.value)}
                  className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                  }`} 
                  placeholder="Contoh: Senior High School"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Tahun / Periode</label>
                  <input 
                    type="text" 
                    required
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                    }`} 
                    placeholder="Contoh: 2019 - 2022"
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Sekolah / Instansi</label>
                  <input 
                    type="text" 
                    required
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                    }`} 
                    placeholder="Contoh: SMA Negri 1"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Sekolah (English Translation)</label>
                <input 
                  type="text" 
                  value={schoolEN}
                  onChange={(e) => setSchoolEN(e.target.value)}
                  className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                  }`} 
                  placeholder="Contoh: SMA Negri 1"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className={`px-4 py-2 border text-xs font-bold rounded transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'border-[#2e353f] text-[#c2c6d6] hover:bg-[#1e2530]' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Batal / Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white rounded cursor-pointer"
                >
                  Simpan Riwayat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Education Modal */}
      {editingEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className={`border rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-[scale-up_0.2s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${
              isDarkMode ? 'border-[#2e353f] bg-[#0a0f16]' : 'border-slate-200 bg-slate-50/80'
            }`}>
              <h3 className={`font-bold text-base flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                <GraduationCap className="text-sky-500 w-5 h-5" />
                Edit Riwayat Pendidikan / Edit Education
              </h3>
              <button onClick={() => setEditingEducation(null)} className={`transition-colors cursor-pointer ${
                isDarkMode ? 'text-[#8c909f] hover:text-white' : 'text-slate-400 hover:text-slate-600'
              }`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4 text-left">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Jenjang Pendidikan (Bahasa Indonesia)</label>
                <input 
                  type="text" 
                  required
                  value={editStage}
                  onChange={(e) => setEditStage(e.target.value)}
                  className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                  }`} 
                />
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Jenjang Pendidikan (English)</label>
                <input 
                  type="text" 
                  value={editStageEN}
                  onChange={(e) => setEditStageEN(e.target.value)}
                  className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                  }`} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Tahun / Periode</label>
                  <input 
                    type="text" 
                    required
                    value={editYears}
                    onChange={(e) => setEditYears(e.target.value)}
                    className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                    }`} 
                  />
                </div>

                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Sekolah / Instansi</label>
                  <input 
                    type="text" 
                    required
                    value={editSchool}
                    onChange={(e) => setEditSchool(e.target.value)}
                    className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                    }`} 
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Sekolah (English Translation)</label>
                <input 
                  type="text" 
                  value={editSchoolEN}
                  onChange={(e) => setEditSchoolEN(e.target.value)}
                  className={`w-full rounded px-4 py-2.5 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-sky-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-sky-500 focus:bg-white'
                  }`} 
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setEditingEducation(null)}
                  className={`px-4 py-2 border text-xs font-bold rounded transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'border-[#2e353f] text-[#c2c6d6] hover:bg-[#1e2530]' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Batal / Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white rounded cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
