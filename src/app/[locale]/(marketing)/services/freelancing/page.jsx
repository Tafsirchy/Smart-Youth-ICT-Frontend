"use client";

import Link from "next/link";
import { 
  IoGlobeOutline, 
  IoFlashOutline, 
  IoShieldCheckmarkOutline, 
  IoCheckmarkCircle, 
  IoBriefcaseOutline,
  IoRocketIcon,
  IoSearchOutline,
  IoArrowBackOutline
} from "react-icons/io5";
import api from "@/lib/api";

export default function FreelancingTrainingPage() {
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [freelanceRes, contentRes] = await Promise.all([
        api.get("/cms/services/freelancing"),
        api.get("/cms/services/content/freelancing")
      ]);
      
      if (freelanceRes.data.data && freelanceRes.data.data.length > 0) {
        setData(freelanceRes.data.data[0]);
      }
      setContent(contentRes.data.data);
    } catch (err) {
      console.error("Failed to load freelancing data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative font-sans">
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-emerald-900/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="container-custom py-20 relative z-10">
        
        {/* Massive Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black tracking-widest uppercase mb-8 border border-emerald-500/20"
          >
            {content?.hero?.badge || "Digital Sovereignty"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter"
          >
            {content?.hero?.title || "Freelancing"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-gradient-x">
              {content?.hero?.subtitle || "Success Training"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xl md:text-3xl leading-relaxed font-light max-w-3xl mx-auto"
          >
            {content?.hero?.description || "Master the art of high-ticket client acquisition on global marketplaces."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-12"
          >
            <Link 
              href="/services/freelancing/details"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 hover:text-white transition-colors group"
            >
              View Market Manifest <IoArrowBackOutline className="rotate-180 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {loading ? (
           <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
              {[1, 2, 3].map(i => <div key={i} className="h-96 bg-white/5 rounded-[3rem] animate-pulse border border-white/10" />)}
           </div>
        ) : data?.classifications?.length > 0 ? (
          /* Target Classifications */
          <div className="mb-32">
            <h2 className="text-4xl font-black text-white text-center mb-16 uppercase tracking-tighter italic">Marketplace Strategy Hubs</h2>
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
               {data.classifications.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 group hover:border-emerald-500/50 transition-all overflow-hidden relative"
                  >
                    <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${item.color} opacity-10 rounded-full blur-[60px] group-hover:opacity-30 transition-opacity`}></div>
                    
                    <div className={`w-16 h-16 rounded-2xl ${item.color} text-white flex items-center justify-center text-3xl mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                      <IoGlobeOutline />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">{item.type}</p>
                    <p className="text-slate-400 leading-relaxed font-light mb-8">{item.desc}</p>
                    
                    <div className="space-y-3 pt-6 border-t border-white/5">
                       {item.features.map((f, idx) => (
                         <div key={idx} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                           <IoCheckmarkCircle className="text-emerald-500 text-lg" />
                           {f}
                         </div>
                       ))}
                    </div>
                  </motion.div>
               ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[3rem] mb-32">
             <IoSearchOutline className="text-6xl text-white/20 mb-6" />
             <p className="text-white/40 font-black uppercase tracking-[0.2em]">Strategy Catalog Syncing...</p>
          </div>
        )}

        {/* Dynamic Mastery Roadmap */}
        {data?.phases?.length > 0 && (
          <div className="mb-32 max-w-5xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black text-white text-center mb-20 leading-tight">Mastery <span className="text-emerald-500">Roadmap.</span></h2>
            <div className="space-y-12 relative">
               <div className="absolute left-6 top-10 bottom-10 w-px bg-white/10 hidden md:block"></div>
               {data.phases.map((p, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="flex flex-col md:flex-row gap-8 items-start relative z-10"
                 >
                   <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black shrink-0 shadow-xl shadow-emerald-600/30">
                     {p.step}
                   </div>
                   <div className="flex-1">
                      <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{p.title}</h3>
                      <p className="text-slate-400 text-lg font-light leading-relaxed max-w-2xl">{p.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        )}

        {/* Global Access Banner */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-emerald-600 rounded-[3rem] p-12 lg:p-24 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-20"></div>
          
          <IoShieldCheckmarkOutline className="text-7xl mb-12 mx-auto" />
          <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-none tracking-tighter">Certified Global <br/>Freelance Expert.</h2>
          <p className="text-emerald-100 text-xl font-light mb-12 max-w-2xl mx-auto italic">Receive a high-authority digital credential that proves your proficiency to clients across 180+ countries.</p>
          <button className="px-12 py-6 bg-white text-emerald-600 font-black rounded-xl hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest text-xs">
            Join Next BootCamp
          </button>
        </motion.div>

      </div>
    </section>
  );
}
