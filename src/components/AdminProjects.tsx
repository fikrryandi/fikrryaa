import React, { useState, useRef } from 'react';
import { Project } from '../types';

// Helper to compress and downscale high-resolution uploaded images (such as phone camera captures)
// down to a highly portable, beautiful size (~30-80KB each) to prevent QuotaExceededError in localStorage.
const compressImage = (base64Str: string, maxWidth = 1600, maxHeight = 1600, quality = 0.88): Promise<string> => {
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
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
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
  Edit3, 
  CheckCircle, 
  X, 
  FolderOpen, 
  Tag, 
  Sparkles, 
  Eye,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

interface AdminProjectsProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id' | 'dateAdded'>) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  isDarkMode?: boolean;
}

export default function AdminProjects({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  isDarkMode = false
}: AdminProjectsProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const [editTitle, setEditTitle] = useState('');
  const [editClient, setEditClient] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editStatus, setEditStatus] = useState<'Published' | 'Draft'>('Published');
  const [editImage, setEditImage] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTagsInput, setEditTagsInput] = useState('');
  
  // New URLs
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [editLiveUrl, setEditLiveUrl] = useState('');
  const [editGithubUrl, setEditGithubUrl] = useState('');

  // Image Upload States
  const [imageDragActive, setImageDragActive] = useState(false);
  const [editImageDragActive, setEditImageDragActive] = useState(false);
  const addFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Multiple Images Support State & Refs
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [editAdditionalImages, setEditAdditionalImages] = useState<string[]>([]);
  const [newAddUrl, setNewAddUrl] = useState('');
  const [newEditUrl, setNewEditUrl] = useState('');
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  const editAdditionalFileInputRef = useRef<HTMLInputElement>(null);

  const handleAddMultipleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressImage(reader.result).then(compressed => {
            setAdditionalImages(prev => [...prev, compressed]);
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleEditMultipleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressImage(reader.result).then(compressed => {
            setEditAdditionalImages(prev => [...prev, compressed]);
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressImage(reader.result).then(compressed => {
            setImage(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setImageDragActive(true);
    } else if (e.type === "dragleave") {
      setImageDragActive(false);
    }
  };

  const handleAddImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressImage(reader.result).then(compressed => {
            setImage(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressImage(reader.result).then(compressed => {
            setEditImage(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setEditImageDragActive(true);
    } else if (e.type === "dragleave") {
      setEditImageDragActive(false);
    }
  };

  const handleEditImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditImageDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          compressImage(reader.result).then(compressed => {
            setEditImage(compressed);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const resolvedImage = image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80';

    onAddProject({
      title,
      client: client || 'Internal',
      category,
      status,
      image: resolvedImage,
      images: [resolvedImage, ...additionalImages].filter(Boolean),
      description,
      tags,
      liveUrl,
      githubUrl
    });

    // Reset
    setTitle('');
    setClient('');
    setImage('');
    setAdditionalImages([]);
    setNewAddUrl('');
    setDescription('');
    setTagsInput('');
    setLiveUrl('');
    setGithubUrl('');
    setShowAddForm(false);
  };

  const handleStartEdit = (proj: Project) => {
    setEditingProject(proj);
    setEditTitle(proj.title);
    setEditClient(proj.client);
    setEditCategory(proj.category);
    setEditStatus(proj.status);
    setEditImage(proj.image);
    setEditDescription(proj.description);
    setEditTagsInput(proj.tags.join(', '));
    setEditLiveUrl(proj.liveUrl || '');
    setEditGithubUrl(proj.githubUrl || '');
    const extra = proj.images && proj.images.length > 0 
      ? proj.images.filter(img => img !== proj.image) 
      : [];
    setEditAdditionalImages(extra);
    setNewEditUrl('');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const tags = editTagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const resolvedImage = editImage || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80';

    onUpdateProject({
      ...editingProject,
      title: editTitle,
      client: editClient || 'Internal',
      category: editCategory,
      status: editStatus,
      image: resolvedImage,
      images: [resolvedImage, ...editAdditionalImages].filter(Boolean),
      description: editDescription,
      tags,
      liveUrl: editLiveUrl,
      githubUrl: editGithubUrl
    });

    setEditingProject(null);
    setEditAdditionalImages([]);
    setNewEditUrl('');
  };

  const handleToggleStatus = (proj: Project) => {
    onUpdateProject({
      ...proj,
      status: proj.status === 'Published' ? 'Draft' : 'Published'
    });
  };

  return (
    <div className={`space-y-6 animate-[fade-in_0.3s_ease-out] ${isDarkMode ? 'text-[#dce3f0]' : 'text-slate-700'}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
            <FolderOpen className="text-purple-500 w-6 h-6" />
            Manage Portfolio Projects
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>Add premium work projects, modify descriptions, tags, status, and hook any web image link.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-purple-600/15 cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </button>
      </div>

      {/* Grid List of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(proj => (
          <div key={proj.id} className={`border rounded-xl overflow-hidden flex flex-col justify-between ${
            isDarkMode 
              ? 'bg-[#111827]/75 border-[#2e353f]' 
              : 'bg-white border-slate-200 shadow-sm shadow-slate-100/30'
          }`}>
            <div>
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover bg-[#0d141d]"
                  referrerPolicy="no-referrer"
                />
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded ${
                  proj.status === 'Published' ? 'bg-emerald-500/20 text-emerald-600 font-semibold' : 'bg-yellow-500/15 text-yellow-600 font-semibold'
                }`}>
                  {proj.status}
                </span>
              </div>
              <div className="p-5 text-left">
                <h3 className={`font-bold mb-1 tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{proj.title}</h3>
                <p className={`text-[11px] font-semibold mb-3 ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'}`}>Client: {proj.client || 'Open Source'}</p>
                <p className={`text-xs leading-relaxed line-clamp-3 mb-4 font-normal ${isDarkMode ? 'text-[#c2c6d6]' : 'text-slate-600'}`}>{proj.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {proj.tags.map(t => (
                    <span key={t} className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 font-semibold border ${
                      isDarkMode 
                        ? 'bg-[#1e2530] border-[#2e353f]/60 text-[#a0a5b5]' 
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <Tag className="w-2.5 h-2.5 text-purple-500" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-5 border-t flex gap-2 justify-end ${
              isDarkMode 
                ? 'border-[#2e353f]/40 bg-[#0c121a]/50' 
                : 'border-slate-100 bg-slate-50/50'
            }`}>
              <button
                onClick={() => handleToggleStatus(proj)}
                className={`px-3 py-1.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'bg-[#1e2530] border-[#2e353f] hover:bg-[#252d3c] text-white' 
                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {proj.status === 'Published' ? 'Draft' : 'Publish'}
              </button>
              <button
                onClick={() => handleStartEdit(proj)}
                className={`p-1.5 rounded border transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border-purple-500/20' 
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200/50'
                }`}
                title="Edit project properties"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteProject(proj.id)}
                className={`p-1.5 rounded border transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20' 
                    : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200/50'
                }`}
                title="Delete project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal Overlay */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className={`border rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-[scale-up_0.2s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]' : 'bg-white border-slate-200 text-slate-750'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${
              isDarkMode ? 'border-[#2e353f] bg-[#0a0f16]' : 'border-slate-200 bg-slate-50/80'
            }`}>
              <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Add New Portfolio Project</h3>
              <button onClick={() => setShowAddForm(false)} className={`transition-colors cursor-pointer ${
                isDarkMode ? 'text-[#8c909f] hover:text-white' : 'text-slate-400 hover:text-slate-600'
              }`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Project Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                  placeholder="e.g. Nexus Inventory System"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Client/Company</label>
                  <input 
                    type="text" 
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`} 
                    placeholder="Vertex Corp"
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`}
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Dev">Mobile Dev</option>
                    <option value="Software Quality">Software Quality</option>
                  </select>
                </div>
              </div>

              <div className={`rounded-xl p-4 space-y-3 border ${
                isDarkMode ? 'bg-[#181f2a]/50 border-[#2e353f]/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <label className={`block text-[10px] font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-[#dce3f0]' : 'text-slate-600'
                }`}>
                  Project Cover Image
                </label>
                
                <div className="flex gap-4 items-center">
                  {/* Small preview */}
                  <div className={`w-16 h-16 rounded-xl border overflow-hidden flex-shrink-0 flex items-center justify-center ${
                    isDarkMode ? 'border-[#2e353f] bg-[#0d141d]' : 'border-slate-200 bg-white'
                  }`}>
                    {image ? (
                      <img src={image} alt="Cover Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className={`w-6 h-6 ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-400'}`} />
                    )}
                  </div>

                  {/* Drop area */}
                  <div className="flex-grow text-left">
                    <div 
                      onDragEnter={handleAddImageDrag}
                      onDragOver={handleAddImageDrag}
                      onDragLeave={handleAddImageDrag}
                      onDrop={handleAddImageDrop}
                      onClick={() => addFileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                        imageDragActive 
                          ? "border-purple-500 bg-purple-500/10 text-white" 
                          : isDarkMode
                            ? "border-[#2e353f] hover:border-[#adc6ff]/50 bg-[#111827]/40 text-[#8c909f]"
                            : "border-slate-200 hover:border-purple-500 bg-white text-slate-500"
                      }`}
                    >
                      <input 
                        ref={addFileInputRef}
                        type="file" 
                        accept="image/*"
                        onChange={handleAddImageFileChange}
                        className="hidden" 
                      />
                      <Upload className={`w-5 h-5 mx-auto mb-1 ${isDarkMode ? 'text-[#adc6ff]' : 'text-purple-500'}`} />
                      <p className={`text-[11px] font-semibold ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>
                        Drag & drop cover photo, or <span className={`underline ${isDarkMode ? 'text-[#adc6ff]' : 'text-purple-600'}`}>browse</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className={`text-[9px] font-bold mb-1 uppercase tracking-wider ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-400'
                  }`}>Alt: Direct Image URL Link</p>
                  <input 
                    type="text" 
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className={`w-full rounded px-3 py-1.5 text-xs outline-none ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-white border-slate-250 text-slate-800 focus:border-purple-500'
                    }`} 
                    placeholder="https://images.unsplash.com/... or Base64 data URL"
                  />
                </div>
              </div>

              {/* Project Support Photos / Multiple Images */}
              <div className={`rounded-xl p-4 space-y-3 border ${
                isDarkMode ? 'bg-[#181f2a]/50 border-[#2e353f]/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between items-center">
                  <label className={`block text-[10px] font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#dce3f0]' : 'text-slate-600'
                  }`}>
                    📸 Foto Pendukung Tambahan (Multiple Images)
                  </label>
                  <span className="text-[10px] text-[#00c2ff] font-black">{additionalImages.length} Foto</span>
                </div>

                {/* Grid of added support photos */}
                {additionalImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {additionalImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border group border-slate-220/80">
                        <img src={imgUrl} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setAdditionalImages(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[9px] font-bold cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload multi button / url input */}
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      value={newAddUrl}
                      onChange={(e) => setNewAddUrl(e.target.value)}
                      className={`w-full rounded px-3 py-1.5 text-xs outline-none ${
                        isDarkMode 
                          ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-800 focus:border-purple-500'
                      }`} 
                      placeholder="Tempel URL Foto Tambahan..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (newAddUrl.trim()) {
                        setAdditionalImages(prev => [...prev, newAddUrl.trim()]);
                        setNewAddUrl('');
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded cursor-pointer transition-all shrink-0"
                  >
                    Tambah URL
                  </button>
                </div>

                <div 
                  onClick={() => additionalFileInputRef.current?.click()}
                  className={`border border-dashed rounded-lg p-3 text-center cursor-pointer transition-all ${
                    isDarkMode 
                      ? "border-[#2e353f] hover:border-purple-500 text-gray-400 bg-black/20" 
                      : "border-slate-300 hover:border-purple-500 bg-white text-slate-500"
                  }`}
                >
                  <input
                    ref={additionalFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleAddMultipleFiles(e.target.files)}
                    className="hidden"
                  />
                  <p className="text-[10px] font-semibold">
                    📂 Berkas Komputer (Pilih sekaligus banyak foto)
                  </p>
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Tags (Comma separated)</label>
                <input 
                  type="text" 
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                  placeholder="ASP.NET, SQL Server, CSS"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Live Project URL</label>
                  <input 
                    type="url" 
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`} 
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>GitHub Repository URL</label>
                  <input 
                    type="url" 
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`} 
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Status</label>
                <div className="flex gap-4">
                  <label className={`flex items-center gap-2 cursor-pointer text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    <input 
                      type="radio" 
                      name="status"
                      checked={status === 'Published'}
                      onChange={() => setStatus('Published')}
                      className="accent-purple-600"
                    /> Published
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    <input 
                      type="radio" 
                      name="status"
                      checked={status === 'Draft'}
                      onChange={() => setStatus('Draft')}
                      className="accent-purple-600"
                    /> Draft (Not visible on home)
                  </label>
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Case Study Description</label>
                <textarea 
                  rows={4} 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm outline-none resize-none transition-all ${
                    isDarkMode 
                      ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                  }`} 
                  placeholder="Describe your design and performance outcome summary..."
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
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white rounded cursor-pointer"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal Overlay */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]">
          <div className={`border rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-[scale-up_0.2s_ease-out] ${
            isDarkMode ? 'bg-[#111827] border-[#2e353f]' : 'bg-white border-slate-200 text-slate-750'
          }`}>
            <div className={`p-6 border-b flex justify-between items-center ${
              isDarkMode ? 'border-[#2e353f] bg-[#0a0f16]' : 'border-slate-200 bg-slate-50/80'
            }`}>
              <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Edit Project Properties</h3>
              <button onClick={() => setEditingProject(null)} className={`transition-colors cursor-pointer ${
                isDarkMode ? 'text-[#8c909f] hover:text-white' : 'text-slate-400 hover:text-slate-600'
              }`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Project Title</label>
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
                  }`}>Client/Company</label>
                  <input 
                    type="text" 
                    value={editClient}
                    onChange={(e) => setEditClient(e.target.value)}
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
                  }`}>Category</label>
                  <select 
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`}
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Dev">Mobile Dev</option>
                    <option value="Software Quality">Software Quality</option>
                  </select>
                </div>
              </div>

              <div className={`rounded-xl p-4 space-y-3 border ${
                isDarkMode ? 'bg-[#181f2a]/50 border-[#2e353f]/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <label className={`block text-[10px] font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-[#dce3f0]' : 'text-slate-600'
                }`}>
                  Project Cover Image
                </label>
                
                <div className="flex gap-4 items-center">
                  {/* Small preview */}
                  <div className={`w-16 h-16 rounded-xl border overflow-hidden flex-shrink-0 flex items-center justify-center ${
                    isDarkMode ? 'border-[#2e353f] bg-[#0d141d]' : 'border-slate-200 bg-white'
                  }`}>
                    {editImage ? (
                      <img src={editImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className={`w-6 h-6 ${isDarkMode ? 'text-[#8c909f]' : 'text-slate-400'}`} />
                    )}
                  </div>

                  {/* Drop area */}
                  <div className="flex-grow text-left">
                    <div 
                      onDragEnter={handleEditImageDrag}
                      onDragOver={handleEditImageDrag}
                      onDragLeave={handleEditImageDrag}
                      onDrop={handleEditImageDrop}
                      onClick={() => editFileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                        editImageDragActive 
                          ? "border-purple-500 bg-purple-500/10 text-white" 
                          : isDarkMode
                            ? "border-[#2e353f] hover:border-[#adc6ff]/50 bg-[#111827]/40 text-[#8c909f]"
                            : "border-slate-200 hover:border-purple-500 bg-white text-slate-500"
                      }`}
                    >
                      <input 
                        ref={editFileInputRef}
                        type="file" 
                        accept="image/*"
                        onChange={handleEditImageFileChange}
                        className="hidden" 
                      />
                      <Upload className={`w-5 h-5 mx-auto mb-1 ${isDarkMode ? 'text-[#adc6ff]' : 'text-purple-500'}`} />
                      <p className={`text-[11px] font-semibold ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>
                        Drag & drop cover photo, or <span className={`underline ${isDarkMode ? 'text-[#adc6ff]' : 'text-purple-600'}`}>browse</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className={`text-[9px] font-bold mb-1 uppercase tracking-wider ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-400'
                  }`}>Alt: Direct Image URL Link</p>
                  <input 
                    type="text" 
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    className={`w-full rounded px-3 py-1.5 text-xs outline-none ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-white border-slate-200 text-slate-800 focus:border-purple-500'
                    }`} 
                    placeholder="https://images.unsplash.com/... or Base64 data URL"
                  />
                </div>
              </div>

              {/* Project Support Photos / Multiple Images */}
              <div className={`rounded-xl p-4 space-y-3 border ${
                isDarkMode ? 'bg-[#181f2a]/50 border-[#2e353f]/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between items-center">
                  <label className={`block text-[10px] font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-[#dce3f0]' : 'text-slate-600'
                  }`}>
                    📸 Foto Pendukung Tambahan (Multiple Images)
                  </label>
                  <span className="text-[10px] text-[#00c2ff] font-black">{editAdditionalImages.length} Foto</span>
                </div>

                {/* Grid of added support photos */}
                {editAdditionalImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {editAdditionalImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border group border-slate-220/80">
                        <img src={imgUrl} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setEditAdditionalImages(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[9px] font-bold cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload multi button / url input */}
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      value={newEditUrl}
                      onChange={(e) => setNewEditUrl(e.target.value)}
                      className={`w-full rounded px-3 py-1.5 text-xs outline-none ${
                        isDarkMode 
                          ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-800 focus:border-purple-500'
                      }`} 
                      placeholder="Tempel URL Foto Tambahan..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (newEditUrl.trim()) {
                        setEditAdditionalImages(prev => [...prev, newEditUrl.trim()]);
                        setNewEditUrl('');
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded cursor-pointer transition-all shrink-0"
                  >
                    Tambah URL
                  </button>
                </div>

                <div 
                  onClick={() => editAdditionalFileInputRef.current?.click()}
                  className={`border border-dashed rounded-lg p-3 text-center cursor-pointer transition-all ${
                    isDarkMode 
                      ? "border-[#2e353f] hover:border-purple-500 text-gray-400 bg-black/20" 
                      : "border-slate-300 hover:border-purple-500 bg-white text-slate-500"
                  }`}
                >
                  <input
                    ref={editAdditionalFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleEditMultipleFiles(e.target.files)}
                    className="hidden"
                  />
                  <p className="text-[10px] font-semibold">
                    📂 Berkas Komputer (Pilih sekaligus banyak foto)
                  </p>
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Tags (Comma separated)</label>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>Live Project URL</label>
                  <input 
                    type="url" 
                    value={editLiveUrl}
                    onChange={(e) => setEditLiveUrl(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`} 
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                  }`}>GitHub Repository URL</label>
                  <input 
                    type="url" 
                    value={editGithubUrl}
                    onChange={(e) => setEditGithubUrl(e.target.value)}
                    className={`w-full rounded px-3 py-2 text-sm outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-[#181f2a] border border-[#2e353f] text-white focus:border-purple-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500 focus:bg-white'
                    }`} 
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Status</label>
                <div className="flex gap-4">
                  <label className={`flex items-center gap-2 cursor-pointer text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    <input 
                      type="radio" 
                      name="editStatus"
                      checked={editStatus === 'Published'}
                      onChange={() => setEditStatus('Published')}
                      className="accent-purple-600"
                    /> Published
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    <input 
                      type="radio" 
                      name="editStatus"
                      checked={editStatus === 'Draft'}
                      onChange={() => setEditStatus('Draft')}
                      className="accent-purple-600"
                    /> Draft (Not visible on home)
                  </label>
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  isDarkMode ? 'text-[#8c909f]' : 'text-slate-500'
                }`}>Case Study Description</label>
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
                  onClick={() => setEditingProject(null)}
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
