"use client";

import { motion } from "framer-motion";
import { 
  IoAnalyticsOutline, 
  IoPeopleOutline, 
  IoFlashOutline, 
  IoTrophyOutline, 
  IoMegaphoneOutline,
  IoPieChartOutline,
  IoCheckmarkCircleOutline
} from "react-icons/io5";

const campaignTypes = [
  {
    title: "E-Commerce ROAS",
    desc: "Scaling online stores via high-intent purchase conversions. We focus on catalog ads and high-ROAS lookalike scaling.",
    icon: <IoAnalyticsOutline />,
    color: "from-blue-600 to-blue-400"
  },
  {
    title: "High-Intent Lead Gen",
    desc: "Generating consistent pipelines of qualified leads using Meta's native forms and custom-built high-speed landing page funnels.",
    icon: <IoPeopleOutline />,
    color: "from-emerald-600 to-teal-400"
  },
  {
    title: "Brand Dominance",
    desc: "Maximizing reach and frequency to build undeniable authority in your local or global market through video-first awareness campaigns.",
    icon: <IoTrophyOutline />,
    color: "from-purple-600 to-indigo-500"
  }
];

const engineDetails = [
  { t: "Meta Pixel & CAPI", d: "Advanced server-side tracking to ensure no conversion is missed, bypassing iOS privacy hurdles." },
  { t: "A/B Testing Discipline", d: "Rigorous split testing of creatives, headings, and placements to identify winners in under 48 hours." },
  { t: "Audience Scaling", d: "Moving from interest-based groups to advanced 1% Lookalike (LAL) and Broad targeting for scale." }
];

export default function FacebookAdsPage() {
  return (
    <section className="min-h-screen bg-[#F0F2F5] overflow-hidden relative font-sans lg:py-24">
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-blue-100/50 via-transparent to-transparent pointer-events-none -z-10"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10">
        
        {/* Ad Manager Style Hero */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase mb-8 shadow-2xl shadow-blue-600/30"
          >
            <IoMegaphoneOutline size={14} /> Meta Marketing Partners
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-[0.85] mb-8 tracking-tighter"
          >
            Data <br className="hidden md:block"/> <span className="text-blue-600">Driven.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Scaling Facebook and Instagram ads is a science, not a gamble. We utilize intense pixel tracking, A/B testing, and data-driven audiences to scale your revenue exponentially.
          </motion.p>
        </div>

        {/* Campaign Classifications */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-20 tracking-tighter">Campaign Objectives</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {campaignTypes.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200/60 p-10 rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl hover:border-blue-200 transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${type.color} opacity-5 rounded-full blur-[40px] group-hover:opacity-20 transition-opacity`}></div>
                <div className={`text-4xl mb-8 group-hover:scale-110 transition-transform w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-100 shadow-sm`}>
                  {type.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{type.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed text-lg">{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Data Engine Visual */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32 bg-white rounded-[3rem] p-12 lg:p-20 border border-slate-200 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(45deg,transparent_45%,rgba(24,119,242,0.02)_50%,transparent_55%)] bg-[length:10px_10px] opacity-40"></div>
           
           <div className="relative z-10 space-y-12">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">The Data <br/><span className="text-blue-600">Engine.</span></h2>
              <div className="space-y-8">
                 {engineDetails.map((item, idx) => (
                    <div key={idx} className="flex gap-6 items-start group">
                       <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shrink-0 border border-blue-100"><IoCheckmarkCircleOutline /></div>
                       <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">{item.t}</h4>
                          <p className="text-slate-500 font-light leading-relaxed">{item.d}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Metrics Bar Chart Mockup */}
           <div className="flex flex-col gap-6 relative">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="p-8 bg-blue-600 rounded-3xl shadow-2xl text-white">
                 <div className="flex justify-between items-center mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80 underline underline-offset-4 decoration-2">Meta Ads Manager Live</p>
                    <IoFlashOutline className="animate-pulse" />
                 </div>
                 <div className="space-y-2">
                    <p className="text-sm font-bold opacity-70">Total Conversion Value</p>
                    <p className="text-5xl font-black tracking-tighter leading-none">$42,500.00</p>
                 </div>
                 <div className="mt-8 flex gap-2">
                   <div className="px-3 py-1 bg-white/20 rounded-md text-[8px] font-black uppercase">ROAS 4.8x</div>
                   <div className="px-3 py-1 bg-white/20 rounded-md text-[8px] font-black uppercase">CPM $2.4</div>
                 </div>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-6">
                 <div className="p-6 bg-white border border-slate-200 rounded-3xl">
                    <p className="text-[10px] text-slate-400 font-black uppercase mb-2">Daily Spend</p>
                    <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
                       <div className="bg-blue-600 h-full w-[80%]"></div>
                    </div>
                 </div>
                 <div className="p-6 bg-white border border-slate-200 rounded-3xl">
                    <p className="text-[10px] text-slate-400 font-black uppercase mb-2">Audience Size</p>
                    <p className="text-xl font-black text-slate-900">1.2M+</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Ad Performance Footer */}
        <div className="max-w-4xl mx-auto text-center border-t border-slate-200 pt-20">
           <h3 className="text-4xl font-black text-slate-900 mb-10 tracking-tight">Stop burning your budget. Start scaling your sales.</h3>
           <button className="px-12 py-5 bg-blue-600 text-white font-extrabold rounded-full hover:scale-105 transition-transform shadow-2xl shadow-blue-500/30 uppercase tracking-widest text-sm">
             Launch Your First Campaign
           </button>
        </div>
      </div>
    </section>
  );
}
