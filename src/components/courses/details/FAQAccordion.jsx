"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDownOutline, IoHelpCircleOutline } from 'react-icons/io5';

const FAQS = [
  {
    question: 'Do I need prior experience?',
    answer: 'No prior experience is necessary! Our courses are designed to take you step-by-step from beginner to advanced levels. We provide all the foundational knowledge you need.'
  },
  {
    question: 'Will I get job support after completing the course?',
    answer: 'Yes! Along with portfolio building, we offer resume reviews, interview preparation, and connect top students with our hiring partners.'
  },
  {
    question: 'Is this live or recorded?',
    answer: 'It depends on the specific course mode. Most of our programs are a hybrid mix of high-quality recorded modules and weekly live interactive Q&A sessions for doubt clearing.'
  },
  {
    question: 'Can I pay in installments?',
    answer: 'Absolutely. We offer flexible 2 and 3-month installment plans for most of our comprehensive courses. Check the enrollment options at checkout.'
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <IoHelpCircleOutline className="text-indigo-600 shrink-0" size={32} />
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 mt-2 font-medium">Everything you need to know about the course and billing.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div 
              key={i}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'border-indigo-600 bg-indigo-50/30 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <button 
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className={`font-bold text-lg ${isOpen ? 'text-indigo-900' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <div className={`p-1 rounded-full shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                  <IoChevronDownOutline size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-6 pt-0 text-slate-600 leading-relaxed max-w-2xl">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
