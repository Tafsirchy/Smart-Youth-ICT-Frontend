'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { IoPlayCircleOutline, IoCheckmarkCircle, IoTimeOutline, IoDocumentTextOutline } from 'react-icons/io5';
import api from '@/lib/api';
import VideoPlayer from '@/components/courses/VideoPlayer';

export default function CourseLearningInterface({ params }) {
  const { slug } = params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${slug}`);
        if (res.data?.success) {
          setCourse(res.data.data);
        } else {
          setCourse(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-1/3 bg-neutral-200 rounded-lg"></div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 h-[500px] bg-neutral-200 rounded-2xl"></div>
          <div className="w-full lg:w-80 h-[500px] bg-neutral-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!course) return notFound();

  // Current active lesson mock
  const activeModule = course.curriculum?.[activeModuleIndex] || { title: 'Welcome Module', topics: ['Introduction to the Course'] };
  const currentTopic = activeModule.topics?.[activeLessonIndex] || 'Lesson Content';

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] max-h-screen">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 border-b border-neutral-200 pb-4">
          {course.title?.en || course.title}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Main Content Area (Video Player & Info) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-2 custom-scrollbar">
          <div className="rounded-2xl overflow-hidden bg-black shadow-lg ring-1 ring-neutral-200">
             {/* Using the Coming Soon VideoPlayer for now per requirements */}
             <VideoPlayer url={null} thumbnail={course.thumbnail} />
          </div>

          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm ring-1 ring-neutral-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-neutral-900">{currentTopic}</h2>
              <button className="flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors">
                <IoCheckmarkCircle size={18} /> Mark as Complete
              </button>
            </div>
            
            <p className="text-neutral-600 leading-relaxed mb-6">
              This is the detailed description and transcript area for the lesson "{currentTopic}". 
              Follow along with the video, review the source code, and complete the exercise files provided below.
            </p>

            <div className="border-t border-neutral-100 pt-6">
              <h3 className="font-semibold text-neutral-900 mb-3">Resource Files</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-sm hover:bg-neutral-50 cursor-pointer">
                  <IoDocumentTextOutline className="text-blue-500" /> source-code.zip
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-sm hover:bg-neutral-50 cursor-pointer">
                  <IoDocumentTextOutline className="text-red-500" /> slides.pdf
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (Curriculum Navigation) */}
        <div className="w-full lg:w-96 flex flex-col bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 overflow-hidden shrink-0">
          <div className="p-5 border-b border-neutral-100 bg-neutral-50">
            <h3 className="font-bold text-neutral-900">Course Content</h3>
            <div className="mt-2 text-sm text-neutral-500 flex justify-between">
              <span>0% Completed</span>
              <span>0 / {course.curriculum?.reduce((acc, curr) => acc + (curr.topics?.length || 0), 0) || 0} Lessons</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-2">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {course.curriculum?.length > 0 ? (
              course.curriculum.map((module, mIdx) => (
                <div key={mIdx} className="mb-2">
                  <div className="px-4 py-3 bg-neutral-50 rounded-lg font-semibold text-sm text-neutral-800 flex justify-between items-center cursor-pointer">
                    <span>{module.title}</span>
                    <span className="text-xs font-normal text-neutral-500">{module.topics?.length || 0} items</span>
                  </div>
                  
                  <div className="pl-2 pr-2 py-1 space-y-1">
                    {module.topics?.map((topic, tIdx) => {
                      const isActive = mIdx === activeModuleIndex && tIdx === activeLessonIndex;
                      return (
                        <div 
                          key={tIdx} 
                          onClick={() => { setActiveModuleIndex(mIdx); setActiveLessonIndex(tIdx); }}
                          className={`flex items-start gap-3 p-3 text-sm rounded-lg cursor-pointer transition-colors ${
                            isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-neutral-50 text-neutral-600'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isActive ? (
                              <IoPlayCircleOutline size={18} className="text-blue-600" />
                            ) : (
                              <IoTimeOutline size={18} className="text-neutral-400" />
                            )}
                          </div>
                          <span className="flex-1 leading-snug">{topic}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-sm text-neutral-500">
                Curriculum data is missing for this course.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
