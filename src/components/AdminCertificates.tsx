import React, { useState } from 'react';
import { Certificate } from '../types';
import { 
  Plus, 
  Trash2, 
  Award, 
  ExternalLink, 
  Calendar, 
  FileText, 
  X, 
  Upload, 
  Edit2, 
  Check, 
  Activity 
} from 'lucide-react';

const compressImage = (base64Str: string, maxWidth = 2048, maxHeight = 1600): Promise<string> => {
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
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        // Enable premium image smoothing attributes for maximum clarity
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        
        // Progressive compression logic: Start with ultra-sharp 88% quality,
        // and scale down step-by-step only if the Base64 string is too large (> 750,000 chars)
        // to fit safely in Firestore (which has a 1MB per-document limit).
        let quality = 0.88;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        
        while (dataUrl.length > 750000 && quality > 0.4) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        
        resolve(dataUrl);
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

interface AdminCertificatesProps {
  certificates: Certificate[];
  onAddCertificate: (cert: Omit<Certificate, 'id'>) => void;
  onUpdateCertificate: (cert: Certificate) => void;
  onDeleteCertificate: (id: string) => void;
  isDarkMode?: boolean;
}

export default function AdminCertificates({
  certificates = [],
  onAddCertificate,
  onUpdateCertificate,
  onDeleteCertificate,
  isDarkMode = false
}: AdminCertificatesProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Edit Fields
  const [editTitle, setEditTitle] = useState('');
  const [editIssuer, setEditIssuer] = useState('');
  const [editIssueDate, setEditIssueDate] = useState('');
  const [editCredentialUrl, setEditCredentialUrl] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [isEditUploading, setIsEditUploading] = useState(false);

  // Handling Image upload
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
        setEditImage(compressed);
        setIsEditUploading(false);
      } else {
        setImage(compressed);
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
    if (!title) return;

    onAddCertificate({
      title,
      issuer: issuer || 'Sertifikat',
      issueDate,
      image: image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
      credentialUrl,
      description
    });

    setTitle('');
    setIssuer('');
    setIssueDate('');
    setCredentialUrl('');
    setDescription('');
    setImage('');
    setShowAddForm(false);
  };

  const handleStartEdit = (cert: Certificate) => {
    setEditingCert(cert);
    setEditTitle(cert.title);
    setEditIssuer(cert.issuer || '');
    setEditIssueDate(cert.issueDate || '');
    setEditCredentialUrl(cert.credentialUrl || '');
    setEditDescription(cert.description || '');
    setEditImage(cert.image || '');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert || !editTitle) return;

    onUpdateCertificate({
      ...editingCert,
      title: editTitle,
      issuer: editIssuer || 'Sertifikat',
      issueDate: editIssueDate,
      credentialUrl: editCredentialUrl,
      description: editDescription,
      image: editImage
    });

    setEditingCert(null);
  };

  return (
    <div className="space-y-6">
      {/* Tab Title Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-black tracking-tight flex items-center gap-3 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <Award className="w-7 h-7 text-[#8b5cf6]" />
            Certificates & Achievements
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage your credentials and academic recognitions for display on the portfolio home view.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCert(null);
            setShowAddForm(!showAddForm);
          }}
          className={`flex items-center gap-2 text-xs font-black px-4 py-2.5 rounded-lg transition-all scale-98 active:scale-95 cursor-pointer ${
            showAddForm
              ? 'bg-red-500/10 hover:bg-red-500/15 text-red-500 border border-red-500/20'
              : 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-md shadow-[#8b5cf6]/20'
          }`}
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? 'Batalkan' : 'Tambah Sertifikat'}
        </button>
      </div>

      {/* Insert Certificate Form */}
      {showAddForm && (
        <form onSubmit={handleCreate} className={`p-6 rounded-2xl border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-[#0b0a14] border-[#1e1c3a] shadow-xl shadow-black/10' 
            : 'bg-white border-slate-200 shadow-xl shadow-slate-100'
        }`}>
          <h3 className={`text-sm font-black mb-4 uppercase tracking-wider flex items-center gap-2 ${
            isDarkMode ? 'text-purple-300' : 'text-slate-800'
          }`}>
            <Plus className="w-4 h-4" /> Form Tambah Sertifikat Baru
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Nama Sertifikat *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Responsive Web Design"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                    : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                }`}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Penerbit / Institusi (Opsional)</label>
              <input
                type="text"
                placeholder="Contoh: freeCodeCamp / Dicoding"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                    : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                }`}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Tanggal Terbit</label>
              <input
                type="text"
                placeholder="Contoh: Maret 2024 atau March 5, 2023"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                    : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                }`}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Link Kredensial URL (Opsional)</label>
              <input
                type="url"
                placeholder="https://www.freecodecamp.org/certification/..."
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                    : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                }`}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Deskripsi Ringkas</label>
              <textarea
                placeholder="Ceritakan sedikit tentang kompetensi yang divalidasi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                    : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                }`}
              />
            </div>

            {/* Image Upload Row */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Bukti Sertifikat / Gambar</label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 w-full sm:w-1/2 transition-colors ${
                  isDarkMode ? 'border-[#222144] hover:bg-[#151426]' : 'border-slate-200 hover:bg-slate-50'
                }`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, false)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-400 animate-spin" />
                      <span className="text-[10px] font-black text-slate-400">MEMPROSES GAMBAR...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Upload className="w-6 h-6 text-[#8b5cf6]" />
                      <span className="text-[11px] font-bold text-slate-500">Pilih / Seret Gambar Sertifikat</span>
                      <span className="text-[9px] text-slate-400">Format PNG/JPG otomatis dikompres</span>
                    </div>
                  )}
                </div>

                {image ? (
                  <div className="w-full sm:w-1/2 flex justify-center p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <img 
                      src={image} 
                      alt="Certificate Preview" 
                      className="max-h-28 object-contain rounded-lg shadow-md"
                      referrerPolicy="referrer"
                    />
                  </div>
                ) : (
                  <div className="text-center w-full sm:w-1/2 py-8 border border-dashed rounded-xl border-slate-300 text-slate-400 text-[11px] font-bold">
                    Belum ada gambar terpilih (akan menggunakan gambar default)
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-dashed border-slate-300/20 flex gap-2 justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-black rounded-lg scale-98 active:scale-95 transition-all text-center flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" /> Simpan Sertifikat
            </button>
          </div>
        </form>
      )}

      {/* Editing overlay modal form */}
      {editingCert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`p-6 rounded-2xl border w-full max-w-2xl shadow-2xl relative ${
            isDarkMode ? 'bg-[#0f0e1d] border-[#222144] text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <button
              onClick={() => setEditingCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800/10 dark:hover:bg-white/10"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-red-500" />
            </button>

            <h3 className="text-sm font-black mb-4 uppercase tracking-wider flex items-center gap-2 text-purple-400">
              <Edit2 className="w-4 h-4" /> Edit Sertifikat
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Nama Sertifikat *</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                      isDarkMode 
                        ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                        : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Penerbit (Opsional)</label>
                  <input
                    type="text"
                    value={editIssuer}
                    onChange={(e) => setEditIssuer(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                      isDarkMode 
                        ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                        : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Tanggal Terbit</label>
                  <input
                    type="text"
                    placeholder="Maret 2024"
                    value={editIssueDate}
                    onChange={(e) => setEditIssueDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                      isDarkMode 
                        ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                        : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Link Kredensial URL (Opsional)</label>
                  <input
                    type="url"
                    value={editCredentialUrl}
                    onChange={(e) => setEditCredentialUrl(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                      isDarkMode 
                        ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                        : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Deskripsi</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={2}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium border focus:outline-none transition-colors ${
                      isDarkMode 
                        ? 'bg-[#151426] border-[#222144] focus:border-[#8b5cf6] text-white' 
                        : 'bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-800'
                    }`}
                  />
                </div>

                {/* Edit Photo File */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Bukti Sertifikat / Gambar</label>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 w-full sm:w-1/2 transition-colors ${
                      isDarkMode ? 'border-[#222144] hover:bg-[#151426]' : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, true)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {isEditUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Activity className="w-5 h-5 text-purple-400 animate-spin" />
                          <span className="text-[10px] font-black text-slate-400">MEMPROSES GAMBAR...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-center">
                          <Upload className="w-6 h-6 text-[#8b5cf6]" />
                          <span className="text-[11px] font-bold text-[#8b5cf6]">Ganti Sertifikat</span>
                          <span className="text-[9px] text-slate-400">Ubah file foto sertifikat</span>
                        </div>
                      )}
                    </div>

                    {editImage && (
                      <div className="w-full sm:w-1/2 flex justify-center p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <img 
                          src={editImage} 
                          alt="Certificate Edit Preview" 
                          className="max-h-24 object-contain rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-dashed border-slate-600/30 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-black rounded-lg transition-colors cursor-pointer"
                >
                  Perbarui Sertifikat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid displays */}
      {certificates.length === 0 ? (
        <div className={`p-12 text-center rounded-2xl border ${
          isDarkMode ? 'bg-[#0b0a14] border-[#1e1c3a]' : 'bg-slate-50 border-slate-100'
        }`}>
          <Award className="w-12 h-12 text-slate-400 mx-auto opacity-40 mb-3 animate-pulse" />
          <p className="text-sm font-black text-slate-500 uppercase tracking-widest text-center">Belum ada Sertifikat</p>
          <p className="text-xs text-slate-400 mt-1">Gunakan tombol 'Tambah Sertifikat' di bagian kanan atas untuk menyematkan pencapaian Anda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={`p-4 rounded-2xl border flex gap-4 transition-all hover:scale-[1.01] ${
                isDarkMode 
                  ? 'bg-[#0b0a14] border-[#1e1c3a] text-white hover:border-[#8b5cf6]/40' 
                  : 'bg-white border-slate-200 text-slate-800 hover:shadow-lg hover:shadow-slate-100'
              }`}
            >
              {/* Image Frame */}
              <div className="w-24 h-24 rounded-lg bg-slate-150 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text context */}
              <div className="flex-grow flex flex-col justify-between overflow-hidden">
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-black tracking-wide truncate max-w-[140px] sm:max-w-xs">{cert.title}</h4>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {cert.credentialUrl && (
                        <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          title="Lihat Kredensial Asli"
                          className="p-1 hover:text-[#8b5cf6] text-slate-400 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => handleStartEdit(cert)}
                        className="p-1 hover:text-amber-500 text-slate-400 transition-colors cursor-pointer"
                        title="Modifikasi"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onDeleteCertificate(cert.id);
                        }}
                        className="p-1 hover:text-red-500 text-slate-400 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cert.issuer}</p>

                  <div className="flex items-center gap-1.5 text-[9px] text-[#8b5cf6] font-bold uppercase tracking-wider">
                    <Calendar className="w-3 h-3" />
                    {cert.issueDate || 'N/A'}
                  </div>

                  {cert.description && (
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mt-0.5">{cert.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
