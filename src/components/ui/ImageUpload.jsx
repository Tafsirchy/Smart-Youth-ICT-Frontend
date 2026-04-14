"use client";

import { useState, useEffect } from "react";
import { LuUpload, LuImage, LuX, LuRotateCw } from "react-icons/lu";
import toast from "react-hot-toast";

/**
 * ImageUpload Component
 * Handles direct file upload to ImgBB and returns the resulting URL.
 * 
 * @param {string} value - Current image URL
 * @param {function} onChange - Callback with new image URL
 * @param {string} label - Optional label
 */
export default function ImageUpload({ value, onChange, label = "Upload Image" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  // Sync internal preview with component prop after initialization
  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Basic Validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File size is too large (max 5MB)");
      return;
    }

    setUploading(true);
    
    // 2. Immediate local preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      // 3. ImgBB Upload
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API Key is missing. Check .env.local");
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const imageUrl = data.data.url;
        setPreview(imageUrl);
        onChange(imageUrl);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error("[ImageUpload Error]", err);
      toast.error(err.message || "Failed to upload to ImgBB");
      setPreview(value); // Revert preview on failure
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview("");
    onChange("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-black uppercase text-slate-400">
        {label}
      </label>
      
      <div className="relative group">
        {preview ? (
          <div className="relative w-full aspect-video md:aspect-square md:w-32 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm transition-all hover:border-pink-500/50">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay for actions when image exists */}
            <div className={`absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 ${uploading ? 'opacity-100' : ''}`}>
               {uploading ? (
                 <LuRotateCw className="w-8 h-8 text-slate-400 animate-spin" />
               ) : (
                 <button 
                  type="button"
                  onClick={removeImage}
                  className="p-2 bg-white text-rose-600 rounded-full hover:scale-110 transition-transform shadow-lg"
                 >
                   <LuX className="w-4 h-4" />
                 </button>
               )}
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full md:w-32 aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors hover:border-pink-500/50 group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <LuRotateCw className="w-8 h-8 text-slate-400 animate-spin" />
              ) : (
                <>
                  <LuUpload className="w-6 h-6 text-slate-400 group-hover:text-pink-500 transition-colors mb-2" />
                  <p className="text-[10px] font-bold text-slate-400 group-hover:text-pink-600 uppercase">Upload</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        )}
      </div>
      
      <p className="text-[9px] text-slate-400 font-medium">JPG, PNG or WEBP (Max 5MB)</p>
    </div>
  );
}
