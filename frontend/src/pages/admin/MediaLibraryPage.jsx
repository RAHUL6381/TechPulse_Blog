import React, { useState, useEffect } from 'react';
import { UploadCloud, Copy, Check, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

export const MediaLibraryPage = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const fetchMedia = () => {
    setLoading(true);
    api.getMedia()
      .then(res => {
        if (res.success) setMediaList(res.media);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', file.name);

    setUploading(true);
    try {
      await api.uploadMedia(formData);
      fetchMedia();
    } catch (err) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (item) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this media asset?')) {
      await api.deleteMedia(id);
      fetchMedia();
    }
  };

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy-900 tracking-tight">
            Media Asset Repository
          </h1>
          <p className="text-xs text-slate-500">
            Upload and organize technical diagrams, infographics, and article hero visuals.
          </p>
        </div>

        {/* Upload Button */}
        <label className="px-4 py-2.5 rounded-xl bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors flex items-center space-x-2 cursor-pointer">
          <UploadCloud className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Dropzone Hint */}
      <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-borderGray text-center space-y-2">
        <UploadCloud className="w-8 h-8 text-slate-300 mx-auto" />
        <p className="text-xs font-semibold text-navy-900">
          Upload WebP, AVIF, PNG, SVG or JPG images up to 10MB
        </p>
        <p className="text-[11px] text-slate-400">
          Optimized for responsive srcset rendering across the publication.
        </p>
      </div>

      {/* Grid of Media */}
      {loading ? (
        <div className="py-16 flex justify-center">
          <div className="w-8 h-8 border-4 border-electric border-t-transparent rounded-full animate-spin" />
        </div>
      ) : mediaList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-borderGray overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
              
              <div className="aspect-video bg-cloud overflow-hidden relative">
                <img
                  src={item.url}
                  alt={item.altText || item.originalName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3.5 space-y-2">
                <span className="font-semibold text-xs text-navy-900 block truncate" title={item.originalName}>
                  {item.originalName}
                </span>

                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{(item.sizeBytes / 1024).toFixed(0)} KB</span>
                  <span className="uppercase">{item.mimeType?.split('/')[1] || 'IMG'}</span>
                </div>

                <div className="pt-2 border-t border-borderGray flex items-center justify-between">
                  <button
                    onClick={() => handleCopyUrl(item)}
                    className="inline-flex items-center space-x-1 text-[11px] font-semibold text-electric hover:underline"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-slate-400 text-xs">
          No media uploaded yet. Use the upload button above to add assets.
        </div>
      )}

    </div>
  );
};
