"use client";

import { useState, useEffect } from "react";
import { LuUpload, LuLink, LuX, LuRotateCw, LuImage, LuCheck } from "react-icons/lu";
import toast from "react-hot-toast";

/**
 * Client-side Canvas Image Compression
 * Resizes large images to max dimensions and compresses to JPEG ~80KB-150KB
 */
const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    // If not an image or SVG/GIF, return as-is
    if (!file || !file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") {
      resolve(file);
      return;
    }

    // If already tiny (< 100KB), return as-is
    if (file.size < 100 * 1024) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const cleanName = (file.name || "image").replace(/\.[^/.]+$/, ".jpg");
            const compressedFile = new File([blob], cleanName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
};

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * ImageUpload Component
 * Supports both:
 * 1. Device upload (Local computer / phone file -> Compressed -> /api/upload)
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

  // Handle local device file upload with automatic compression
  const handleFileUpload = async (e) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    if (!rawFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    setUploading(true);

    try {
      // 1. Compress image client-side to prevent 413 Content Too Large errors
      const file = await compressImage(rawFile, 1200, 1200, 0.78);

      // Immediate local preview while uploading
      const localDataUrl = await readFileAsDataURL(file);
      setPreview(localDataUrl);

      // 2. Upload compressed file to /api/upload
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success && data.data?.url) {
          const imageUrl = data.data.url;
          setPreview(imageUrl);
          onChange(imageUrl);
          toast.success("Image uploaded successfully!");
          return;
        }
      } catch (uploadFetchErr) {
        console.warn("[ImageUpload] /api/upload fetch failed, using compressed Data URL:", uploadFetchErr.message);
      }

      // Fallback: If /api/upload fails or is serverless without storage,
      // use the client-compressed Data URL which is only ~80KB and safe from 413 limits!
      onChange(localDataUrl);
      toast.success("Image applied!");
    } catch (err) {
      console.error("[ImageUpload Error]", err);
      toast.error("Failed to process image");
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
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-[10px] font-black uppercase text-slate-400 leading-[1.4]">
          {label}
        </label>
        {!preview && (
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-bold rounded-sm">
            <button
              type="button"
              onClick={() => setActiveTab("device")}
              className={`min-h-[28px] px-2.5 py-1 transition-all flex items-center gap-1.5 active:scale-95 leading-[1.4] ${
                activeTab === "device"
                  ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LuUpload size={13} /> Device
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("link")}
              className={`min-h-[28px] px-2.5 py-1 transition-all flex items-center gap-1.5 active:scale-95 leading-[1.4] ${
                activeTab === "link"
                  ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <LuLink size={13} /> Web Link
            </button>
          </div>
        )}
      </div>

      {preview ? (
        // Preview State with Replace & Clear
        <div className="space-y-1.5">
          <div
            className={`relative ${aspectClass} overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-sm transition-all group bg-slate-100 dark:bg-slate-800 rounded-md`}
          >
            <picture>
              <img
                src={preview}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.png";
                }}
              />
            </picture>

            {/* Touch-Friendly Action Overlay */}
            <div
              className={`absolute inset-0 bg-slate-900/40 sm:bg-slate-900/60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2 ${
                uploading ? "opacity-100" : ""
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-1 text-white">
                  <LuRotateCw className="w-6 h-6 animate-spin text-pink-400" />
                  <span className="text-xs font-bold leading-[1.4]">Compressing & Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-stretch w-full max-w-[110px] gap-1.5">
                  <label className="min-h-[30px] w-full px-2 py-1 bg-white text-slate-800 active:scale-95 transition-transform shadow-lg cursor-pointer text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 select-none rounded leading-[1.4]">
                    <LuUpload size={13} />
                    <span>Replace</span>
                    <input
                      type="file"
                      className="hidden rounded-md"
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
                    className="min-h-[30px] w-full p-1 bg-rose-600 hover:bg-rose-700 text-white active:scale-95 transition-transform shadow-lg flex items-center justify-center gap-1 rounded leading-[1.4]"
                  >
                    <LuX size={13} />
                    <span className="text-[10px] uppercase font-black">Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 max-w-sm">
            <input
              type="text"
              readOnly
              value={preview.startsWith("data:") ? `${preview.substring(0, 30)}... [Optimized ${Math.round(preview.length / 1024)} KB]` : preview}
              title={preview}
              className="flex-1 px-2 py-0.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-500 truncate rounded leading-[1.4]"
            />
            <button
              type="button"
              onClick={removeImage}
              className="text-[10px] text-rose-600 font-bold hover:underline rounded leading-[1.4]"
            >
              Remove
            </button>
          </div>
        </div>
      ) : activeTab === "device" ? (
        // Mode 1: Device File Upload
        <label className="flex flex-col items-center justify-center w-full max-w-sm p-3.5 border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hover:border-pink-500/50 group rounded-md">
          <div className="flex flex-col items-center justify-center text-center">
            {uploading ? (
              <>
                <LuRotateCw className="w-6 h-6 text-pink-500 animate-spin mb-1.5" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-[1.4]">
                  Optimizing & Uploading...
                </p>
              </>
            ) : (
              <>
                <div className="w-8 h-8 bg-pink-50 dark:bg-pink-900/20 text-pink-600 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform rounded-md">
                  <LuUpload size={16} />
                </div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-[1.4]">
                  Click or drag image from device
                </p>
                <p className="text-[10px] font-medium text-slate-400 mt-0.5 leading-[1.4]">
                  JPG, PNG, WEBP (Auto-optimized)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden rounded-md"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      ) : (
        // Mode 2: Web Link / URL Input
        <div className="space-y-1.5 max-w-sm">
          <div className="flex gap-1.5">
            <div className="relative flex-1">
              <LuLink className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
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
                className="w-full pl-8 pr-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium outline-none focus:ring-2 focus:ring-pink-500/20 dark:text-white rounded-md leading-[1.4]"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyLink}
              disabled={!linkInput.trim()}
              className="px-3 py-1.5 bg-slate-900 dark:bg-pink-600 text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-40 rounded-md leading-[1.4]"
            >
              Apply
            </button>
          </div>
          <p className="text-[10px] text-slate-400 leading-[1.4]">
            Paste any direct image URL from Unsplash, ImgBB, or your CDN.
          </p>
        </div>
      )}
    </div>
  );
}
