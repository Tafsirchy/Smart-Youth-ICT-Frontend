"use client";

import { useState, useEffect } from "react";
import { LuSearch, LuStar, LuStarOff } from "react-icons/lu";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function FeaturedMentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      // Find all instructors
      const res = await api.get("/users?role=instructor");
      setMentors(res.data.data);
    } catch (err) {
      toast.error("Failed to load instructors");
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (id, currentStatus) => {
    try {
      await api.patch(`/cms/mentors/${id}/toggle`, { isFeaturedMentor: !currentStatus });
      toast.success(currentStatus ? "Removed from Featured" : "Marked as Featured");
      fetchMentors();
    } catch (err) {
      toast.error("Toggle failed");
    }
  };

  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Our Mentors Showcase</h1>
          <p className="text-slate-500">Feature your best instructors on the About Us page.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search instructors by name/email..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-rose-500/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Instructor</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Expertise</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider text-center">Featured Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredMentors.map((mentor) => (
              <tr key={mentor._id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0">
                      <img src={mentor.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"} className="w-full h-full rounded-xl object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{mentor.name}</p>
                      <p className="text-xs text-slate-400">{mentor.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-wrap gap-1">
                    {(mentor.expertise || []).slice(0, 2).map(e => (
                      <span key={e} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                        {e}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  {mentor.isFeaturedMentor ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-full border border-amber-100">
                      <LuStar className="w-3 h-3 fill-current" /> Featured
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-black uppercase rounded-full">
                      Standard
                    </span>
                  )}
                </td>
                <td className="px-8 py-5 text-right">
                  <button 
                    onClick={() => toggleFeatured(mentor._id, mentor.isFeaturedMentor)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mentor.isFeaturedMentor ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-slate-900 text-white hover:bg-black'}`}
                  >
                    {mentor.isFeaturedMentor ? 'Unfeature' : 'Mark as Featured'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!loading && filteredMentors.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">No instructors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
