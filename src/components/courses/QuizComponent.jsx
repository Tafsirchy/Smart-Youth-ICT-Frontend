'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function QuizComponent({ quiz, onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]); // Array of { questionId, selectedOptions: [] }
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  if (!quiz || !quiz.questions?.length) {
    return <div className="p-4 text-neutral-500 bg-neutral-50 rounded-xl text-center">Quiz content is empty or unavailable.</div>;
  }

  const question = quiz.questions[currentIdx];

  const handleOptionToggle = (optionIdx) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === question._id);
      let selectedOptions = existing ? [...existing.selectedOptions] : [];
      
      if (selectedOptions.includes(optionIdx)) {
        selectedOptions = selectedOptions.filter(idx => idx !== optionIdx);
      } else {
        selectedOptions.push(optionIdx);
      }
      
      const newAnswers = prev.filter(a => a.questionId !== question._id);
      return [...newAnswers, { questionId: question._id, selectedOptions }];
    });
  };

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.post(`/quizzes/${quiz._id}/submit`, { answers });
      if (res.data?.success) {
        setResult(res.data.data);
      } else {
        toast.error(res.data?.message || 'Failed to submit quiz');
      }
    } catch (err) {
      toast.error('An error occurred while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 shadow-md text-center border border-neutral-200">
        {result.passed ? (
          <HiCheckCircle className="mx-auto text-emerald-500 h-16 w-16 mb-4" />
        ) : (
          <HiXCircle className="mx-auto text-red-500 h-16 w-16 mb-4" />
        )}
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {result.passed ? 'Congratulations!' : 'Keep trying!'}
        </h2>
        <p className="text-neutral-600 mb-6">You scored <span className="font-bold text-neutral-900">{result.score}%</span> on this quiz.</p>
        <button onClick={() => onComplete?.(result)} className="btn-primary px-8 py-3 w-full sm:w-auto">
          {result.passed ? 'Continue Course' : 'Review Material'}
        </button>
      </motion.div>
    );
  }

  const currentAnswer = answers.find(a => a.questionId === question._id);
  const selectedOptions = currentAnswer?.selectedOptions || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Quiz Header */}
      <div className="p-5 border-b border-neutral-100 bg-neutral-50 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-neutral-900">{quiz.title}</h3>
          <p className="text-sm text-neutral-500">Passing Score: {quiz.passingScore}%</p>
        </div>
        <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
          Question {currentIdx + 1} of {quiz.questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-neutral-100">
        <div className="h-1 bg-blue-500 transition-all" style={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}></div>
      </div>

      {/* Question Body */}
      <AnimatePresence mode="wait">
        <motion.div
           key={currentIdx}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.2 }}
           className="p-6 md:p-8"
        >
          <h4 className="text-lg font-semibold text-neutral-900 mb-6 leading-relaxed">
            {currentIdx + 1}. {question.questionText}
          </h4>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedOptions.includes(idx);
              return (
                <div 
                  key={idx} 
                  onClick={() => handleOptionToggle(idx)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex-shrink-0 border flex items-center justify-center ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-neutral-300'}`}>
                    {isSelected && <HiCheckCircle className="text-white h-4 w-4" />}
                  </div>
                  <span className={`text-sm ${isSelected ? 'text-blue-900 font-medium' : 'text-neutral-700'}`}>{option}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Footer */}
      <div className="p-5 border-t border-neutral-100 flex justify-between items-center bg-neutral-50">
        <button 
          onClick={handlePrev} 
          disabled={currentIdx === 0}
          className="px-5 py-2 rounded-lg text-sm font-semibold text-neutral-600 border border-neutral-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {currentIdx === quiz.questions.length - 1 ? (
          <button 
            onClick={handleSubmit} 
            disabled={submitting || selectedOptions.length === 0}
            className="btn-primary px-6 py-2 text-sm disabled:opacity-50 flex items-center gap-2"
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        ) : (
          <button 
            onClick={handleNext} 
            disabled={selectedOptions.length === 0}
            className="bg-neutral-900 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-800 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
