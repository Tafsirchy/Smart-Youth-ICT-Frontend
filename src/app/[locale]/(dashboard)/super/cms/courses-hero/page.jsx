"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  IoImageOutline, 
  IoLinkOutline, 
  IoSaveOutline, 
  IoCropOutline, 
  IoEyeOutline, 
  IoTrashOutline,
  IoCloseOutline
} from "react-icons/io5";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

export default function CoursesHeroSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState("text_and_search");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFit, setImageFit] = useState("cover");
  const [imagePosition, setImagePosition] = useState("center");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cms/settings/courses_hero_config");
      if (res.data.data) {
        setMode(res.data.data.mode || "text_and_search");
        setImageUrl(res.data.data.imageUrl || "");
        setImageFit(res.data.data.imageFit || "cover");
        setImagePosition(res.data.data.imagePosition || "center");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load hero configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("asset", file);
      formData.append("image", file);
      
      let uploadedUrl = null;
      try {
        const res = await api.post("/assets/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data?.data?.url) {
          uploadedUrl = res.data.data.url;
        }
      } catch (backendErr) {
        console.warn("Backend /assets/upload failed, trying /api/upload:", backendErr.message);
        const nextRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const nextData = await nextRes.json();
        if (nextData.success && nextData.data?.url) {
          uploadedUrl = nextData.data.url;
        } else {
          throw backendErr;
        }
      }

      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = () => {
    setImageUrl("");
    if (mode === "image_only") {
      setMode("text_and_search");
    }
    toast.success("Image removed. Click 'Save Changes' to apply.");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.put("/super/settings", {
        key: "courses_hero_config",
        value: { mode, imageUrl, imageFit, imagePosition },
        category: "general",
        description: "Configuration for the Courses Page Hero Section"
      });
      toast.success("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-500">Loading...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Courses Hero Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage the hero banner display and image cropping for the Courses page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 font-bold text-sm transition-colors disabled:opacity-50 rounded-md shadow-sm shadow-blue-500/20"
        >
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" /> : <IoSaveOutline size={18} />}
          Save Changes
        </button>
      </div>

      {/* Mode Selection */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 shadow-sm rounded-lg">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Display Mode</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label 
            className={`cursor-pointer border-2 p-5 flex flex-col gap-2 transition-all rounded-lg ${mode === 'text_and_search' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Text & Search Bar</span>
              <input 
                type="radio" 
                name="heroMode" 
                value="text_and_search" 
                checked={mode === 'text_and_search'}
                onChange={() => setMode('text_and_search')}
                className="w-5 h-5 text-blue-600"
              />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Shows the image in the background with "Explore Our Courses" heading and interactive search bar on top. (If no image is uploaded, displays the default dark indigo gradient).
            </p>
          </label>

          <label 
            className={`cursor-pointer border-2 p-5 flex flex-col gap-2 transition-all rounded-lg ${mode === 'image_only' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Image Only (Full Banner)</span>
              <input 
                type="radio" 
                name="heroMode" 
                value="image_only" 
                checked={mode === 'image_only'}
                onChange={() => setMode('image_only')}
                className="w-5 h-5 text-blue-600"
              />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Shows ONLY the full banner image with natural full width and height. No text, overlay, or search bar will crop or hide your banner graphic.
            </p>
          </label>
        </div>
      </div>

      {/* Image Sizing / Fit Options */}
      {mode === 'text_and_search' && imageUrl && (
        <div className="bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 rounded-lg">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Image Sizing & Fit (Cropping Control)</h2>
            <p className="text-xs text-slate-500 mt-1">Control how the background image fits the screen to avoid unwanted cropping.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label 
              className={`cursor-pointer border-2 p-4 flex flex-col gap-1.5 transition-all rounded-lg ${imageFit === 'contain' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">Uncropped / Full Image (Contain)</span>
                <input 
                  type="radio" 
                  name="imageFit" 
                  value="contain" 
                  checked={imageFit === 'contain'}
                  onChange={() => setImageFit('contain')}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Shows 100% of the image without any cropping. If the screen is wider than the image, a soft ambient blur fills the sides.
              </p>
            </label>

            <label 
              className={`cursor-pointer border-2 p-4 flex flex-col gap-1.5 transition-all rounded-lg ${imageFit === 'cover' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">Cover (Fill Banner Width & Height)</span>
                <input 
                  type="radio" 
                  name="imageFit" 
                  value="cover" 
                  checked={imageFit === 'cover'}
                  onChange={() => setImageFit('cover')}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fills the entire background. If image aspect ratio is square or tall, edges may be cropped to fill the wide banner.
              </p>
            </label>
          </div>

          {imageFit === 'cover' && (
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">Image Focus / Alignment</label>
              <div className="flex gap-3">
                {[
                  { id: 'top center', label: 'Top' },
                  { id: 'center', label: 'Center' },
                  { id: 'bottom center', label: 'Bottom' },
                ].map((pos) => (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => setImagePosition(pos.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-md border transition-all ${
                      imagePosition === pos.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Upload, Preview, and Delete Options */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Banner Image</h2>
            <p className="text-xs text-slate-500 mt-0.5">Upload a banner or paste a direct image URL.</p>
          </div>
          {imageUrl && (
            <button
              type="button"
              onClick={handleDeleteImage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 transition-all rounded-md shadow-sm"
              title="Delete and reset image"
            >
              <IoTrashOutline size={16} />
              Delete Image
            </button>
          )}
        </div>
        
        {/* Preview with Delete Option */}
        <div className="w-full aspect-[21/9] sm:aspect-[3/1] bg-slate-900 border border-slate-200 overflow-hidden relative flex items-center justify-center rounded-lg group">
          {imageUrl ? (
            <>
              {imageFit === 'contain' ? (
                <>
                  <img src={imageUrl} alt="Ambient bg" className="absolute inset-0 w-full h-full object-cover blur-md opacity-40" />
                  <img src={imageUrl} alt="Hero Preview" className="relative z-10 max-h-full max-w-full object-contain" />
                </>
              ) : (
                <img 
                  src={imageUrl} 
                  alt="Hero Preview" 
                  className="w-full h-full object-cover" 
                  style={{ objectPosition: imagePosition }}
                />
              )}
              
              {/* Quick Delete Overlay Button */}
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-3 right-3 z-20 flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-rose-600/90 hover:bg-rose-600 backdrop-blur-md transition-all rounded-md shadow-md active:scale-95"
                title="Remove Banner Image"
              >
                <IoTrashOutline size={15} />
                Delete Image
              </button>
            </>
          ) : (
            <div className="text-slate-400 flex flex-col items-center gap-2">
              <IoImageOutline size={32} />
              <span className="text-sm font-medium">No Image Uploaded (Default Gradient Active)</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Upload from Device</label>
            <div className="relative">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 rounded-md" 
              />
              <div className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-50 border border-slate-200 border-dashed text-sm font-medium text-slate-600 group hover:bg-slate-100 transition-colors rounded-md">
                {uploading ? "Uploading..." : <><IoImageOutline size={18} /> Click to Upload Image</>}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Or provide Image URL</label>
            <div className="relative">
              <IoLinkOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                placeholder="https://example.com/image.jpg"
                className="w-full pl-10 pr-9 py-3 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-md"
              />
              {imageUrl && (
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Clear input"
                >
                  <IoCloseOutline size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
