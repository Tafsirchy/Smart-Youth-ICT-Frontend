"use client";

import { motion } from "framer-motion";
import { 
  IoImagesOutline, 
  IoVideocamOutline, 
  IoLayersOutline, 
  IoStopwatchOutline, 
  IoFlashOutline, 
  IoTrendingUpOutline, 
  IoCheckmarkCircleOutline 
} from "react-icons/io5";

const creativeFormats = [
  {
    title: "Static Posters",
    desc: "Single-hit high-impact visuals. Perfect for brand awareness and straightforward conversion-first messaging.",
    icon: <IoImagesOutline />,
    color: "from-pink-500 to-rose-400"
  },
  {
    title: "Motion & Reels",
    desc: "Short-form video content (TikTok/Reels) designed to stop the scroll through fast-paced, high-quality motion graphics.",
    icon: <IoVideocamOutline />,
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Story Carousels",
    desc: "Narrative-driven sliding content. Ideal for educational value or showcasing multi-product collections in one go.",
    icon: <IoLayersOutline />,
    color: "from-amber-400 to-orange-500"
  }
];

export default function SocialCreativesPage() {
  return (
    <section className="min-h-screen bg-white overflow-hidden relative font-sans">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-100 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2 opacity-70"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10">
        {/* Vibrant Creative Hero */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/10 text-pink-600 text-xs font-black tracking-widest uppercase mb-8"
          >
            Stop The Scroll
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 leading-[0.85] mb-8 tracking-tighter"
          >
            Scroll <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 font-serif italic">Stoppers.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            In a world of infinite scrolling, attention is the only currency. We design high-engagement social assets that turn passive scrollers into active customers.
          </motion.p>
        </div>

        {/* Format Classifications */}
        <div className="mb-32">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-24 tracking-tighter">Content Formats</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {creativeFormats.map((format, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-100 p-10 rounded-[3rem] relative overflow-hidden group hover:bg-white hover:shadow-2xl transition-all"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${format.color} opacity-5 rounded-full blur-[40px] group-hover:opacity-20 transition-opacity`}></div>
                <div className={`text-4xl mb-8 group-hover:scale-110 transition-transform w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-xl text-slate-900`}>
                  {format.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{format.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed text-lg">{format.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Psychology of Engagement Visual */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32 bg-slate-950 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-pink-500/10 to-transparent"></div>
           
           <div className="relative z-10 space-y-10">
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">The Science of <br/><span className="text-pink-500">Visual Hooks.</span></h2>
              <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">Engagement isn't random. We use proven visual patterns—from the **Rule of Thirds** to **Color Contrast Theory**—to ensure your content is the most interesting thing on their feed.</p>
              
              <div className="grid grid-cols-2 gap-4">
                 {["High Contrast", "Z-Pattern Eye Flow", "Emotional Anchoring", "Clear CTA Focus"].map(item => (
                    <div key={item} className="flex gap-2 items-center text-sm font-bold text-white">
                       <IoCheckmarkCircleOutline className="text-pink-500" /> {item}
                    </div>
                 ))}
              </div>
           </div>

           {/* Creative Masonry Preview */}
           <div className="grid grid-cols-2 gap-4 relative">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="aspect-[4/5] bg-pink-100 rounded-3xl overflow-hidden relative">
                 <div className="absolute bottom-4 left-4 p-4 bg-white/20 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-widest">+12% CTR</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="aspect-square bg-slate-800 rounded-3xl flex items-center justify-center text-pink-500 text-4xl">
                 <IoFlashOutline />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-2 aspect-[16/9] bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center p-8">
                 <div className="w-full space-y-2">
                    <div className="h-4 bg-white/20 rounded-full w-full"></div>
                    <div className="h-4 bg-white/20 rounded-full w-3/4"></div>
                 </div>
              </motion.div>
           </div>
        </div>

        {/* Creative Action Footer */}
        <div className="max-w-4xl mx-auto text-center border-t border-slate-100 pt-20">
           <h3 className="text-4xl font-black text-slate-900 mb-10 tracking-tight underline decoration-pink-500 decoration-8 underline-offset-8">Demand attention. Every single time.</h3>
           <button className="px-12 py-5 bg-slate-900 text-white font-extrabold rounded-full hover:bg-pink-500 transition-colors shadow-2xl uppercase tracking-widest text-sm">
             Request A Campaign Pack
           </button>
        </div>
      </div>
    </section>
  );
}
