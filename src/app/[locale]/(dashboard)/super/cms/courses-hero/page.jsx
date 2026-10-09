"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoImageOutline, IoLinkOutline, IoSaveOutline } from "react-icons/io5";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function CoursesHeroSettings() {
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [mode, setMode] = useState("text_and_search");
 const [imageUrl, setImageUrl] = useState("");
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
 
 // Assuming you have an asset upload endpoint
 const res = await api.post("/assets/upload", formData, {
 headers: { "Content-Type": "multipart/form-data" }
 });
 
 if (res.data.data?.url) {
 setImageUrl(res.data.data.url);
 toast.success("Image uploaded successfully!");
 }
 } catch (err) {
 console.error(err);
 toast.error("Image upload failed.");
 } finally {
 setUploading(false);
 }
 };

 const handleSave = async () => {
 try {
 setSaving(true);
 await api.put("/super/settings", {
 key: "courses_hero_config",
 value: { mode, imageUrl },
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
 <p className="text-sm text-slate-500 mt-1">Manage the hero section on the Courses page.</p>
 </div>
 <button
 onClick={handleSave}
 disabled={saving}
 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 font-bold text-sm transition-colors disabled:opacity-50 rounded-md"
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" /> : <IoSaveOutline size={18} />}
 Save Changes
 </button>
 </div>

 <div className="bg-white -[2rem] border border-slate-200 p-6 sm:p-8 shadow-sm rounded-lg">
 <h2 className="text-lg font-bold text-slate-900 mb-6">Display Mode</h2>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <label 
 className={`cursor-pointer border-2 p-5 flex flex-col gap-2 transition-all ${mode === 'text_and_search' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
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
 <p className="text-xs text-slate-500">Shows the background image with "Explore Our Courses" text and the search bar on top.</p>
 </label>

 <label 
 className={`cursor-pointer border-2 p-5 flex flex-col gap-2 transition-all ${mode === 'image_only' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
 >
 <div className="flex items-center justify-between">
 <span className="font-bold text-slate-900">Image Only (Banner)</span>
 <input 
 type="radio" 
 name="heroMode" 
 value="image_only" 
 checked={mode === 'image_only'}
 onChange={() => setMode('image_only')}
 className="w-5 h-5 text-blue-600"
 />
 </div>
 <p className="text-xs text-slate-500">Shows ONLY the uploaded image. No text or search bar will be displayed over it.</p>
 </label>
 </div>
 </div>

 <div className="bg-white -[2rem] border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 rounded-lg">
 <h2 className="text-lg font-bold text-slate-900">Background Image</h2>
 
 {/* Preview */}
 <div className="w-full aspect-[21/9] sm:aspect-[3/1] bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center">
 {imageUrl ? (
 <Image src={imageUrl} alt="Hero Preview" fill className="object-cover rounded-md" />
 ) : (
 <div className="text-slate-400 flex flex-col items-center gap-2">
 <IoImageOutline size={32} />
 <span className="text-sm font-medium">No Image Uploaded</span>
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
 <div className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-50 border border-slate-200 border-dashed text-sm font-medium text-slate-600 group hover:bg-slate-100 transition-colors">
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
 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
 />
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
