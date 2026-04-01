'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiSave, FiX, FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';

const TABS = ['Basic Info', 'Media', 'Curriculum', 'Features & Outcomes', 'Projects', 'FAQs'];

export default function CourseForm({ initialData = null, onSuccess }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Basic Info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: { en: '', bn: '' },
    tagline: '',
    description: { en: '', bn: '' },
    category: 'web-dev',
    price: '',
    originalPrice: '',
    duration: '',
    language: 'Bengali / English',
    mode: 'Online / Hybrid',
    isPublished: false,
    
    // Arrays
    outcomes: [''],
    targetAudience: [''],
    features: [{ iconKey: 'FaCheck', text: '' }],
    faqs: [{ question: '', answer: '' }],
    projects: [{ title: '', desc: '', techs: [], image: '' }],
    curriculum: [{ title: '', duration: '', isFree: false, topics: [''] }],
    
    // Objects
    certification: { included: true, desc: 'Earn an industry-recognized certificate' },
    installmentPlan: { enabled: false, parts: 2 }
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);

  // Initialize data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        outcomes: initialData.outcomes?.length ? initialData.outcomes : [''],
        targetAudience: initialData.targetAudience?.length ? initialData.targetAudience : [''],
        features: initialData.features?.length ? initialData.features : [{ iconKey: 'FaCheck', text: '' }],
        faqs: initialData.faqs?.length ? initialData.faqs : [{ question: '', answer: '' }],
        projects: initialData.projects?.length ? initialData.projects : [{ title: '', desc: '', techs: [], image: '' }],
        curriculum: initialData.curriculum?.length ? initialData.curriculum : [{ title: '', duration: '', isFree: false, topics: [''] }],
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  // Unified dynamic array handlers
  const handleArrayChange = (field, index, value) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };
  const addArrayItem = (field, emptyVal) => setFormData({ ...formData, [field]: [...formData[field], emptyVal] });
  const removeArrayItem = (field, index) => setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });

  // Complex array handlers (Objects)
  const handleObjectArray = (field, index, key, value) => {
    const newArr = [...formData[field]];
    newArr[index] = { ...newArr[index], [key]: value };
    setFormData({ ...formData, [field]: newArr });
  };

  // Curriculum handlers
  const handleTopicChange = (modIdx, topicIdx, value) => {
    const newCurr = [...formData.curriculum];
    newCurr[modIdx].topics[topicIdx] = value;
    setFormData({ ...formData, curriculum: newCurr });
  };
  const addTopic = (modIdx) => {
    const newCurr = [...formData.curriculum];
    newCurr[modIdx].topics.push('');
    setFormData({ ...formData, curriculum: newCurr });
  };
  const removeTopic = (modIdx, topicIdx) => {
    const newCurr = [...formData.curriculum];
    newCurr[modIdx].topics = newCurr[modIdx].topics.filter((_, i) => i !== topicIdx);
    setFormData({ ...formData, curriculum: newCurr });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      if (thumbnailFile) data.append('thumbnail', thumbnailFile);
      
      // Basic strings
      data.append('tagline', formData.tagline);
      data.append('category', formData.category);
      data.append('duration', formData.duration);
      data.append('language', formData.language);
      data.append('mode', formData.mode);
      data.append('price', formData.price);
      data.append('originalPrice', formData.originalPrice);
      data.append('isPublished', formData.isPublished);

      // Stringified JSONs
      data.append('title', JSON.stringify(formData.title));
      data.append('description', JSON.stringify(formData.description));
      data.append('outcomes', JSON.stringify(formData.outcomes.filter(x => x.trim())));
      data.append('targetAudience', JSON.stringify(formData.targetAudience.filter(x => x.trim())));
      data.append('features', JSON.stringify(formData.features.filter(x => x.text.trim())));
      data.append('faqs', JSON.stringify(formData.faqs.filter(x => x.question.trim())));
      data.append('projects', JSON.stringify(formData.projects.filter(x => x.title.trim())));
      data.append('curriculum', JSON.stringify(formData.curriculum.filter(x => x.title.trim())));
      data.append('certification', JSON.stringify(formData.certification));
      data.append('installmentPlan', JSON.stringify(formData.installmentPlan));

      const res = initialData 
        ? await api.put(`/courses/${initialData._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await api.post('/courses', data, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (res.data.success) {
        if (onSuccess) onSuccess(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving course data.');
    } finally {
      setLoading(false);
    }
  };

  // Rendering Helper Components
  const SectionHeader = ({ title, onAdd }) => (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">{title}</h3>
      {onAdd && <button type="button" onClick={onAdd} className="btn-sm bg-neutral-100 flex items-center gap-1 px-3 mt-1 rounded-full text-sm font-semibold hover:bg-neutral-200"><FiPlus /> Add</button>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-neutral-200 p-6 md:p-10">
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4 mb-8">
        {TABS.map(tab => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeTab === tab ? 'bg-neutral-900 text-white shadow-md' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
            {tab}
          </button>
        ))}
      </div>

      {error && <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl font-semibold border border-red-100 flex items-center gap-2"><FiX /> {error}</div>}

      <div className="min-h-[500px]">
      {/* --- BASIC INFO TAB --- */}
      {activeTab === 'Basic Info' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Title (English)</label>
              <input required type="text" className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500" value={formData.title.en} onChange={e => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Title (Bangla)</label>
              <input type="text" className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500" value={formData.title.bn} onChange={e => setFormData({ ...formData, title: { ...formData.title, bn: e.target.value } })} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Tagline (Hero Subtitle)</label>
            <input type="text" className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500" placeholder="Transform your career with..." value={formData.tagline} onChange={e => setFormData({ ...formData, tagline: e.target.value })} />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500 bg-white" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                <option value="web-dev">Web Development</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="smm">SMM</option>
                <option value="ai">AI</option>
                <option value="other">Other</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-semibold mb-2">Price (৳)</label>
              <input required type="number" className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Original Price (৳) (Crossed out)</label>
              <input type="number" className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: e.target.value })} />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Duration String</label>
              <input type="text" placeholder="e.g. 6 Months" className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Language</label>
              <input type="text" placeholder="e.g. Bengali / English" className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500" value={formData.language} onChange={e => setFormData({ ...formData, language: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Course Mode</label>
              <input type="text" placeholder="e.g. Online / Hybrid" className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500" value={formData.mode} onChange={e => setFormData({ ...formData, mode: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Full Description</label>
            <textarea rows={5} className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500" value={formData.description.en} onChange={e => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })} />
          </div>
          
          <div className="flex items-center gap-3 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
             <input type="checkbox" id="published" className="w-5 h-5 rounded cursor-pointer accent-blue-600" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} />
             <label htmlFor="published" className="font-semibold text-neutral-800 cursor-pointer">Publish immediately to Public Website?</label>
          </div>
        </motion.div>
      )}

      {/* --- MEDIA TAB --- */}
      {activeTab === 'Media' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <SectionHeader title="Course Media" />
          <div className="border-2 border-dashed border-neutral-300 rounded-3xl p-10 text-center relative hover:bg-neutral-50 hover:border-blue-400 transition-colors bg-white">
            <input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            
            {thumbnailFile ? (
               <div className="text-emerald-600 font-semibold flex items-center justify-center gap-2"><FiCheckCircle size={24}/> File selected: {thumbnailFile.name}</div>
            ) : initialData?.thumbnail ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={initialData.thumbnail} alt="Thumbnail preview" className="h-40 mx-auto rounded-xl object-cover mb-4 shadow-sm" />
            ) : (
              <div className="text-neutral-500 font-medium">Click instantly or drag image file here for Course Thumbnail</div>
            )}
          </div>
        </motion.div>
      )}

      {/* --- CURRICULUM TAB --- */}
      {activeTab === 'Curriculum' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <SectionHeader title="Course Modules" onAdd={() => addArrayItem('curriculum', { title: '', duration: '', isFree: false, topics: [''] })} />
          
          <div className="space-y-6">
            {formData.curriculum.map((mod, i) => (
              <div key={i} className="border rounded-2xl p-5 bg-neutral-50/50 shadow-sm relative group overflow-hidden">
                 <div className="flex flex-wrap gap-4 mb-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-sm font-bold text-neutral-700">Module {i + 1} Title</label>
                      <input type="text" placeholder="e.g. Introduction to React" className="w-full border rounded-xl p-3 mt-1.5 focus:ring-2 outline-none focus:ring-blue-500 bg-white" value={mod.title} onChange={e => handleObjectArray('curriculum', i, 'title', e.target.value)} />
                    </div>
                    <div className="w-32">
                      <label className="text-sm font-bold text-neutral-700">Duration</label>
                      <input type="text" placeholder="2h 15m" className="w-full border rounded-xl p-3 mt-1.5 focus:ring-2 outline-none focus:ring-blue-500 bg-white" value={mod.duration} onChange={e => handleObjectArray('curriculum', i, 'duration', e.target.value)} />
                    </div>
                    <button type="button" onClick={() => removeArrayItem('curriculum', i)} className="p-3.5 bg-white border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-colors"><FiTrash2 size={18} /></button>
                 </div>
                 
                 {/* Topics */}
                 <div className="pl-6 border-l-2 border-blue-200 space-y-3 mt-6">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Lessons / Topics inside Module {i + 1}</p>
                    {mod.topics.map((t, tidx) => (
                      <div key={tidx} className="flex gap-2 items-center">
                         <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{tidx+1}</div>
                         <input type="text" placeholder={`Lesson name...`} className="flex-1 border-b py-2 bg-transparent focus:border-blue-500 outline-none transition-colors" value={t} onChange={e => handleTopicChange(i, tidx, e.target.value)} />
                         <button type="button" onClick={() => removeTopic(i, tidx)} className="text-neutral-400 hover:text-red-500 p-2"><FiX size={18}/></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addTopic(i)} className="text-sm text-blue-600 font-bold mt-4 flex items-center gap-1 hover:text-blue-800"><FiPlus /> Add Lesson to Module</button>
                 </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* --- FEATURES & OUTCOMES --- */}
      {activeTab === 'Features & Outcomes' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
          
          <div>
            <SectionHeader title="What You Will Learn (Outcomes Checklist)" onAdd={() => addArrayItem('outcomes', '')} />
            <div className="space-y-3 bg-neutral-50 p-6 rounded-2xl border">
              {formData.outcomes.map((out, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <FiCheckCircle className="text-emerald-500 shrink-0" size={20} />
                  <input type="text" placeholder="Outcome description..." className="flex-1 border-b py-2 bg-transparent outline-none focus:border-blue-500" value={out} onChange={e => handleArrayChange('outcomes', i, e.target.value)} />
                  <button type="button" onClick={() => removeArrayItem('outcomes', i)} className="p-2 text-red-400 hover:text-red-600 rounded-xl"><FiTrash2 /></button>
                </div>
              ))}
            </div>
          </div>

          <div>
             <SectionHeader title="Key Features (Grid Icons)" onAdd={() => addArrayItem('features', { iconKey: 'FaCheck', text: '' })} />
             <div className="space-y-4">
              {formData.features.map((feat, i) => (
                <div key={i} className="flex gap-3 bg-white border p-3 rounded-xl shadow-sm items-center">
                  <div className="shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs shadow-inner">ICON</div>
                  <input type="text" placeholder="React-Icon Name (e.g. FaLaptopCode)" className="w-48 border-none bg-transparent outline-none font-mono text-sm text-neutral-500 placeholder-neutral-300" value={feat.iconKey} onChange={e => handleObjectArray('features', i, 'iconKey', e.target.value)} />
                  <div className="h-8 w-px bg-neutral-200"></div>
                  <input type="text" placeholder="Feature title text..." className="flex-1 border-none bg-transparent outline-none font-medium" value={feat.text} onChange={e => handleObjectArray('features', i, 'text', e.target.value)} />
                  <button type="button" onClick={() => removeArrayItem('features', i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 size={18} /></button>
                </div>
              ))}
             </div>
          </div>

        </motion.div>
      )}

      {/* --- PROJECTS --- */}
      {activeTab === 'Projects' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
           <SectionHeader title="Portfolio / Project Showcase" onAdd={() => addArrayItem('projects', { title: '', desc: '', techs: [], image: '' })} />
           
           <div className="grid md:grid-cols-2 gap-6">
             {formData.projects.map((proj, i) => (
                <div key={i} className="border rounded-2xl p-6 bg-white shadow-sm ring-1 ring-neutral-200 relative group overflow-hidden">
                   <button type="button" onClick={() => removeArrayItem('projects', i)} className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><FiTrash2/></button>
                   
                   <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1 mt-2">Project Title</label>
                   <input type="text" className="w-full border-b py-2 focus:border-blue-500 outline-none font-bold text-lg" value={proj.title} onChange={e => handleObjectArray('projects', i, 'title', e.target.value)} />
                   
                   <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mt-6 mb-2">Description</label>
                   <textarea rows={2} className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500 text-sm" value={proj.desc} onChange={e => handleObjectArray('projects', i, 'desc', e.target.value)} />

                   <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mt-6 mb-2">Image URL (Unsplash etc)</label>
                   <input type="text" placeholder="https://..." className="w-full border rounded-xl p-3 focus:ring-2 outline-none focus:ring-blue-500 text-sm" value={proj.image} onChange={e => handleObjectArray('projects', i, 'image', e.target.value)} />
                   
                   <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mt-6 mb-2">Technologies Used</label>
                   <input type="text" placeholder="React, Node, Typescript" className="w-full border rounded-xl p-3 font-mono text-sm focus:ring-2 outline-none focus:ring-blue-500 bg-neutral-50" value={proj.techs?.join(', ') || ''} onChange={e => handleObjectArray('projects', i, 'techs', e.target.value.split(',').map(s=>s.trim()))} />
                </div>
             ))}
           </div>
        </motion.div>
      )}

      {/* --- FAQs --- */}
      {activeTab === 'FAQs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
           <SectionHeader title="Frequently Asked Questions" onAdd={() => addArrayItem('faqs', { question: '', answer: '' })} />
           
           <div className="space-y-4">
             {formData.faqs.map((faq, i) => (
                <div key={i} className="flex gap-4 items-start border rounded-2xl p-5 bg-white shadow-sm ring-1 ring-neutral-200 transition-all hover:ring-blue-300">
                    <div className="flex-1 space-y-3">
                       <input type="text" placeholder="Type Question..." className="w-full border-none bg-transparent outline-none font-bold text-lg text-neutral-800" value={faq.question} onChange={e => handleObjectArray('faqs', i, 'question', e.target.value)} />
                       <textarea rows={2} placeholder="Write detailed answer..." className="w-full border rounded-xl p-3 text-sm text-neutral-600 focus:ring-2 outline-none focus:ring-blue-500" value={faq.answer} onChange={e => handleObjectArray('faqs', i, 'answer', e.target.value)} />
                    </div>
                    <button type="button" onClick={() => removeArrayItem('faqs', i)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl mt-1 shrink-0"><FiTrash2 size={20} /></button>
                </div>
             ))}
           </div>
        </motion.div>
      )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap justify-between items-center gap-4">
        {initialData && <span className="text-sm font-semibold text-neutral-500 border px-3 py-1 rounded-full">Editing ID: {initialData._id}</span>}
        <div className="flex gap-3 ml-auto">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-full font-bold text-neutral-600 hover:bg-neutral-100 transition-colors">Cancel</button>
          <button type="submit" disabled={loading} className="px-8 py-3 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center gap-2">
            <FiSave size={18} />
            {loading ? 'Saving to Database...' : initialData ? 'Update Backend Data' : 'Publish Course Data'}
          </button>
        </div>
      </div>
    </form>
  )
}
