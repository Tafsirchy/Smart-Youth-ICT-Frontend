"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuImage,
  LuCheck,
  LuX,
  LuEye,
} from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  const { locale } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    thumbnail: "",
    tags: "",
    isPublished: true,
    isFeatured: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/blog?limit=100");
      setBlogs(res.data.data);
    } catch (err) {
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        thumbnail: blog.thumbnail || "",
        tags: blog.tags ? blog.tags.join(", ") : "",
        isPublished: blog.isPublished,
        isFeatured: blog.isFeatured || false,
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        thumbnail: "",
        tags: "",
        isPublished: true,
        isFeatured: false,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert tags from comma separated to array
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const submissionData = {
      ...formData,
      tags: tagsArray,
    };

    try {
      if (editingBlog) {
        await api.put(`/blog/${editingBlog._id}`, submissionData);
        toast.success("Blog post updated");
      } else {
        await api.post("/blog", submissionData);
        toast.success("Blog post created");
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post? This action cannot be undone.")) return;
    try {
      await api.delete(`/blog/${id}`);
      toast.success("Post deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="py-4 sm:py-5">
      <div className="flex justify-between items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 leading-[1.4]">
            Blog Posts
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-[1.6]">
            Manage news, articles, and updates.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-brand-green text-white px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 shrink-0"
        >
          <LuPlus className="w-5 h-5 shrink-0" />
          <span className="hidden sm:inline">Add Post</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-green rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all flex flex-col"
            >
              {/* Thumbnail Header */}
              <div className="h-40 sm:h-48 bg-slate-50 relative overflow-hidden group-hover:h-44 sm:group-hover:h-52 transition-all duration-500">
                {blog.thumbnail ? (
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    priority={index <= 1}
                    loading={index <= 1 ? undefined : "lazy"}
                    decoding={index <= 1 ? undefined : "async"}
                    onError={(e) => { e.target.srcset = ''; e.target.src = '/images/placeholder.png'; }}
                    className="object-cover transition-transform duration-700 group-hover:scale-110 bg-[#f0f0f0]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                    <LuImage className="w-10 h-10 stroke-[1.5]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      No Thumbnail
                    </span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2">
                  <div
                    className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm flex items-center gap-1.5 ${blog.isPublished ? "bg-white/90 text-green-600" : "bg-slate-900/80 text-white"}`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${blog.isPublished ? "bg-green-500 animate-pulse" : "bg-slate-400"}`}
                    />
                    {blog.isPublished ? "Published" : "Draft"}
                  </div>
                  {blog.isFeatured && (
                    <div className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm bg-brand-pink/90 text-white flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Featured
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-[1.4] mb-2">
                  {blog.title}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-[1.5]">
                  {blog.excerpt || "No excerpt provided."}
                </p>

                <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleOpenModal(blog)}
                      className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shrink-0"
                      aria-label="Edit Blog"
                    >
                      <LuPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shrink-0"
                      aria-label="Delete Blog"
                    >
                      <LuTrash2 className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/${locale || 'en'}/blog/${blog.slug}`}
                      className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all shrink-0"
                      aria-label="View Blog"
                    >
                      <LuEye className="w-4 h-4" />
                    </Link>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {blog.views || 0} Views
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          {blogs.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              No blog posts found. Create your first post!
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[999] flex items-end sm:items-center justify-center p-0 sm:p-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-4xl rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col custom-scrollbar"
          >
            <div className="flex items-center justify-between mb-4 shrink-0">
              <h3 className="text-xl font-black text-slate-900 leading-[1.4]">
                {editingBlog ? "Edit Blog Post" : "Create New Post"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-11 h-11 flex items-center justify-center bg-slate-50 text-slate-500 rounded-full active:bg-slate-100 lg:hover:bg-slate-200 transition-all shrink-0"
                aria-label="Close"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left Column: Image & Meta */}
                <div className="md:col-span-1 space-y-4">
                  <ImageUpload
                    value={formData.thumbnail}
                    onChange={(url) =>
                      setFormData({ ...formData, thumbnail: url })
                    }
                    label="Blog Thumbnail"
                  />
                  
                  <div className="bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-100">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-2 border-slate-200 text-indigo-600 focus:ring-transparent transition-all"
                        checked={formData.isPublished}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isPublished: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                        Publish Immediately
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-2 border-slate-200 text-brand-pink focus:ring-transparent transition-all"
                        checked={formData.isFeatured}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isFeatured: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm font-bold text-slate-700 group-hover:text-brand-pink transition-colors">
                        Featured (Learn & Stay Ahead)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Right Column: Content Fields */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Post Title
                    </label>
                    <input
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none font-bold text-slate-900"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g. 10 Ways to Master Next.js"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Tags (Comma Separated)
                    </label>
                    <input
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm font-medium"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tags: e.target.value,
                        })
                      }
                      placeholder="React, Nextjs, Web Development"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Short Excerpt
                    </label>
                    <textarea
                      rows="2"
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm resize-none"
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          excerpt: e.target.value,
                        })
                      }
                      placeholder="A short summary of what this post is about..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-0.5 leading-[1.4]">
                      Full Content (HTML Supported)
                    </label>
                    <textarea
                      required
                      rows="10"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white transition-all rounded-xl outline-none text-sm resize-y font-mono"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="<h2>Your Header</h2><p>Your content here...</p>"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 pb-2 sm:pb-0 sticky bottom-0 bg-white z-10 border-t border-slate-50 sm:border-none mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest text-[10px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3 bg-slate-900 text-white font-black rounded-xl shadow-xl shadow-slate-900/10 hover:bg-black transition-all flex items-center justify-center gap-1.5"
                >
                  <LuCheck className="w-5 h-5" />
                  {editingBlog ? "Save Changes" : "Publish Post"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
