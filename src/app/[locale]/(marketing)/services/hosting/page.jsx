"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoServerOutline, 
  IoGlobeOutline, 
  IoSearchOutline, 
  IoFlashOutline, 
  IoShieldCheckmarkOutline, 
  IoInfiniteOutline,
  IoHeadsetOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline
} from "react-icons/io5";

const hostingPlans = [
  {
    name: "Cloud Starter",
    monthlyPrice: 5.99,
    annualPrice: 59.90,
    desc: "Perfect for personal blogs and simple portfolio sites.",
    features: ["1 Website", "10GB NVMe SSD", "Unmetered Bandwidth", "Free SSL Certificate", "Email Accounts (5)", "Standard Support"],
    popular: false
  },
  {
    name: "Business Pro",
    monthlyPrice: 14.99,
    annualPrice: 149.90,
    desc: "Optimized for high-traffic business sites and small e-commerce.",
    features: ["Unlimited Websites", "100GB NVMe SSD", "LSCache Optimized", "Daily Backups", "Unlimited Emails", "Priority 24/7 Support"],
    popular: true
  },
  {
    name: "Enterprise VPS",
    monthlyPrice: 49.99,
    annualPrice: 499.00,
    desc: "Dedicated resources for massive scale and ultimate performance.",
    features: ["Fully Managed VPS", "500GB NVMe SSD", "4 Core CPU / 8GB RAM", "Dedicated IP", "Root Access", "Dedicated Developer Support"],
    popular: false
  }
];

const infraPillars = [
  { title: "Pure NVMe SSD", desc: "Up to 50x faster read/write speeds than traditional SSDs.", icon: <IoFlashOutline /> },
  { title: "Global CDN", desc: "Deliver content from the edge with zero-latency globally.", icon: <IoGlobeOutline /> },
  { title: "24/7 Support", desc: "Real human engineers, not just chatbots, ready to assist.", icon: <IoHeadsetOutline /> }
];

export default function HostingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [domainQuery, setDomainQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!domainQuery) return;
    
    setIsSearching(true);
    setSearchResult(null);
    
    // Simulate API search
    setTimeout(() => {
      const isAvailable = Math.random() > 0.3; // 70% chance of being available
      setSearchResult({
        domain: domainQuery.includes(".") ? domainQuery : `${domainQuery}.com`,
        available: isAvailable,
        price: isAvailable ? "$12.99/yr" : null
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-slate-950 overflow-hidden relative font-sans lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 pointer-events-none -z-10"></div>
      
      <div className="container-custom pt-32 pb-20 relative z-10">
        
        {/* Domain Search Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black tracking-widest uppercase mb-8 border border-blue-500/20"
          >
            Launch Your Digital Home
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] mb-8 tracking-tighter"
          >
            Domain & <br className="hidden md:block"/> <span className="text-blue-500">Hosting.</span>
          </motion.h1>
          
          {/* Active Domain Search Engine */}
          <div className="mt-16 max-w-3xl mx-auto relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
             <form onSubmit={handleSearch} className="relative bg-slate-900 border border-white/10 rounded-[2rem] p-3 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 flex items-center px-6 gap-4 w-full">
                   <IoSearchOutline className="text-blue-500 text-2xl" />
                   <input 
                     type="text" 
                     placeholder="Find your perfect domain (e.g. syict.com)" 
                     className="bg-transparent border-none outline-none text-white w-full font-bold placeholder:text-slate-600"
                     value={domainQuery}
                     onChange={(e) => setDomainQuery(e.target.value)}
                   />
                </div>
                <button 
                  disabled={isSearching}
                  className="bg-blue-600 text-white font-black px-10 py-4 rounded-full w-full sm:w-auto hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                >
                   {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Search"}
                </button>
             </form>
             
             {/* Search Results Display */}
             <AnimatePresence>
                {searchResult && (
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     className={`mt-6 p-6 rounded-2xl border flex items-center justify-between ${searchResult.available ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'}`}
                   >
                      <div className="flex items-center gap-4">
                         {searchResult.available ? <IoCheckmarkCircleOutline className="text-emerald-500 text-3xl" /> : <IoCloseCircleOutline className="text-rose-500 text-3xl" />}
                         <div className="text-left">
                            <p className="text-white font-black text-xl">{searchResult.domain}</p>
                            <p className={searchResult.available ? 'text-emerald-500 text-xs font-bold' : 'text-rose-500 text-xs font-bold'}>
                               {searchResult.available ? 'Available for registration!' : 'Already taken by another user.'}
                            </p>
                         </div>
                      </div>
                      {searchResult.available && (
                         <div className="flex items-center gap-4">
                            <p className="text-white font-bold">{searchResult.price}</p>
                            <button className="bg-emerald-500 text-black font-black px-6 py-2 rounded-full text-sm">Add to Cart</button>
                         </div>
                      )}
                   </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>

        {/* Pricing Toggle Section */}
        <div className="mb-12 flex flex-col items-center">
           <h2 className="text-4xl font-black text-white text-center mb-10 tracking-tighter">Choose Your Power</h2>
           <div className="flex items-center gap-4 mb-16 p-1 bg-white/5 border border-white/10 rounded-full w-fit">
              <button 
                onClick={() => setIsAnnual(false)}
                className={`px-8 py-2 rounded-full text-xs font-bold transition-all ${!isAnnual ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsAnnual(true)}
                className={`px-8 py-2 rounded-full text-xs font-bold transition-all relative ${isAnnual ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}
              >
                Annual <span className="absolute -top-6 right-0 text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded-full font-black animate-bounce">-20%</span>
              </button>
           </div>

           <div className="grid lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
              {hostingPlans.map((plan, i) => (
                 <motion.div
                   key={plan.name}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className={`bg-slate-900 border ${plan.popular ? 'border-blue-500' : 'border-white/5'} p-10 rounded-[3rem] relative flex flex-col transition-all hover:translate-y-[-10px] group`}
                 >
                    {plan.popular && (
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                          🔥 Most Popular
                       </div>
                    )}
                    <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">{plan.desc}</p>
                    <div className="mb-10">
                       <p className="text-5xl font-black text-white leading-none">
                          <span className="text-2xl align-top mr-1 font-sans text-blue-500">$</span>
                          {isAnnual ? (plan.annualPrice / 12).toFixed(2) : plan.monthlyPrice}
                          <span className="text-lg text-slate-600">/mo</span>
                       </p>
                       <p className="text-xs text-slate-500 mt-2">Billed {isAnnual ? `$${plan.annualPrice} annually` : 'monthly'}</p>
                    </div>
                    
                    <ul className="flex-1 space-y-4 mb-10 border-t border-white/5 pt-10">
                       {plan.features.map(f => (
                          <li key={f} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                             <IoCheckmarkCircleOutline className="text-blue-500 text-xl" /> {f}
                          </li>
                       ))}
                    </ul>
                    <button className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${plan.popular ? 'bg-blue-600 text-white shadow-xl animate-pulse-slow' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                       Get Started Now
                    </button>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Infrastructure Pillars */}
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto py-32 border-t border-white/10 mt-32">
           {infraPillars.map((p, i) => (
              <motion.div key={i} className="text-center group">
                 <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-8 group-hover:scale-110 transition-transform">{p.icon}</div>
                 <h4 className="text-white font-black text-2xl mb-4">{p.title}</h4>
                 <p className="text-slate-500 font-light leading-relaxed">{p.desc}</p>
              </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
