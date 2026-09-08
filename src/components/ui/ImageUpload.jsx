"use client";

import { useState, useEffect } from "react";
import { LuUpload, LuLink, LuX, LuRotateCw, LuImage, LuCheck } from "react-icons/lu";
import toast from "react-hot-toast";

/**
 * ImageUpload Component
 * Supports both:
 * 1. Device upload (Local computer / phone file -> /api/upload)
 * 2. Web Image Link (Paste direct HTTPS URL)
 * 
 * @param {string} value - Current image URL
 * @param {function} onChange - Callback with new image URL
 * @param {string} label - Optional label
 * @param {string} aspect - "square" (default) or "video" or "banner"
 */
export default function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
  aspect = "square",
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const [activeTab, setActiveTab] = useState("device"); // 'device' | 'link'
  const [linkInput, setLinkInput] = useState("");

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  // Handle local device file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size is too large (max 5MB)");
      return;
    }

    setUploading(true);

    // Immediate local preview while uploading
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.data?.url) {
        const imageUrl = data.data.url;
        setPreview(imageUrl);
        onChange(imageUrl);
        toast.success("Image uploaded from device successfully!");
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error("[ImageUpload Error]", err);
      toast.error(err.message || "Failed to upload image");
      setPreview(value || "");
    } finally {
      setUploading(false);
    }
  };

  // Handle URL Link input
  const handleApplyLink = () => {
    const trimmed = linkInput.trim();
    if (!trimmed) return;

    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://") && !trimmed.startsWith("/")) {
      toast.error("Please enter a valid URL (starting with https:// or http://)");
      return;
    }

    setPreview(trimmed);
    onChange(trimmed);
    setLinkInput("");
    toast.success("Image URL applied!");
  };

  const removeImage = () => {
    setPreview("");
    onChange("");
    setLinkInput("");
  };

  // Aspect ratio class helper
  const aspectClass =
    aspect === "video"
      ? "aspect-video w-full max-w-sm"
      : aspect === "banner"
      ? "aspect-[21/9] w-full"
      : "aspect-square w-32";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-[10px] font-black uppercase text-slate-400">
          {label}
        </label>
        {!preview && (
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("device")}
              className={`min-h-[36px] px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 active:scale-95 ${
                activeTab === "device"
                  ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LuUpload size={14} /> Device
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("link")}
              className={`min-h-[36px] px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 active:scale-95 ${
                activeTab === "link"
                  ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LuLink size={14} /> Web Link
            </button>
          </div>
        )}
      </div>

      {preview ? (
        // Preview State with Replace & Clear
        <div className="space-y-2">
          <div
            className={`relative ${aspectClass} rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-sm transition-all group bg-slate-100 dark:bg-slate-800`}
          >
            <picture>
              <img
                src={preview}
                alt="Uploaded Preview"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.png";
                }}
              />
            </picture>

            {/* Touch-Friendly Action Overlay: Persistent on SM (touchscreens), Hover on MD+ */}
            <div
              className={`absolute inset-0 bg-slate-900/40 sm:bg-slate-900/60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 ${
                uploading ? "opacity-100" : ""
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-1 text-white">
                  <LuRotateCw className="w-7 h-7 animate-spin text-pink-400" />
                  <span className="text-xs font-bold">Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <label className="min-h-[44px] px-4 py-2.5 bg-white text-slate-800 rounded-xl active:scale-95 transition-transform shadow-lg cursor-pointer text-xs font-black uppercase tracking-wider flex items-center gap-1.5 select-none">
                    <LuUpload size={16} />
                    <span>Replace</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={removeImage}
                    title="Remove Image"
                    aria-label="Remove Image"
                    className="min-h-[44px] min-w-[44px] p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl active:scale-95 transition-transform shadow-lg flex items-center justify-center"
                  >
                    <LuX size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <input
              type="text"
              readOnly
              value={preview}
              title={preview}
              className="flex-1 px-2.5 py-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-mono text-slate-500 truncate"
            />
            <button
              type="button"
              onClick={removeImage}
              className="text-[10px] text-rose-600 font-bold hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ) : activeTab === "device" ? (
        // Mode 1: Device File Upload
        <label className="flex flex-col items-center justify-center w-full max-w-sm p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hover:border-pink-500/50 group">
          <div className="flex flex-col items-center justify-center text-center">
            {uploading ? (
              <LuRotateCw className="w-7 h-7 text-pink-500 animate-spin mb-2" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-900/20 text-pink-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <LuUpload size={20} />
                </div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Click or drag image from device
                </p>
                <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                  JPG, PNG, WEBP or GIF (Max 5MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      ) : (
        // Mode 2: Web Link / URL Input
        <div className="space-y-2 max-w-sm">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LuLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="url"
                placeholder="Paste direct image link (https://...)"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApplyLink();
                  }
                }}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-pink-500/20 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyLink}
              disabled={!linkInput.trim()}
              className="px-4 py-2 bg-slate-900 dark:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-40"
            >
              Apply
            </button>
          </div>
          <p className="text-[10px] text-slate-400">
            Paste any direct image URL from Unsplash, Google Drive, or your CDN.
          </p>
        </div>
      )}
    </div>
  );
}
