'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { notFound } from 'next/navigation';
import { IoPlayCircleOutline, IoCheckmarkCircle, IoTimeOutline, IoDocumentTextOutline, IoLockClosedOutline } from 'react-icons/io5';
import api from '@/lib/api';
import VideoPlayer from '@/components/courses/VideoPlayer';
import toast from 'react-hot-toast';

export default function CourseLearningInterface({ params }) {
  const { slug } = params;
  const [course, setCourse]       = useState(null);
  const [lessons, setLessons]     = useState([]);
  const [progress, setProgress]   = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [completing, setCompleting] = useState(false);

  // Fetch everything in parallel
  useEffect(() => {
    const init = async () => {
      try {
        // Step 1: fetch course by slug to get courseId
        const courseRes = await api.get(`/courses/${slug}`);
        if (!courseRes.data?.success) { setLoading(false); return; }
        const courseData = courseRes.data.data;
        setCourse(courseData);

        const courseId = courseData._id;

        // Step 2: fetch lessons & progress in parallel
        const [lessonsRes, progressRes] = await Promise.allSettled([
          api.get(`/lessons?courseId=${courseId}`),
          api.get(`/progress/${courseId}`),
        ]);

        const fetchedLessons = lessonsRes.status === 'fulfilled' ? lessonsRes.value.data.data : [];
        const fetchedProgress = progressRes.status === 'fulfilled' ? progressRes.value.data.data : null;

        setLessons(fetchedLessons);
        setProgress(fetchedProgress);
        // Auto-select the first lesson
        if (fetchedLessons.length > 0) setActiveLesson(fetchedLessons[0]);
      } catch (err) {
        console.error('Learn page init error:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [slug]);

  const handleMarkComplete = useCallback(async () => {
    if (!activeLesson || !course) return;
    setCompleting(true);
    try {
      const res = await api.put(`/progress/${course._id}/complete-lesson`, { lessonId: activeLesson._id });
      setProgress(res.data.data);
      toast.success('Lesson marked as complete! 🎉');

      // Auto-advance to next lesson
      const idx = lessons.findIndex(l => l._id === activeLesson._id);
      if (idx < lessons.length - 1) setActiveLesson(lessons[idx + 1]);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not mark lesson as complete.');
    } finally {
      setCompleting(false);
    }
  }, [activeLesson, course, lessons]);

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

  const completedIds   = new Set(progress?.completedLessons || []);
  const percentage     = progress?.percentage || 0;
  const totalLessons   = lessons.length;
  const completedCount = completedIds.size;

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] max-h-screen">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 border-b border-neutral-200 pb-4">
          {course.title?.en || course.title}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-2">
          <div className="rounded-2xl overflow-hidden bg-black shadow-lg ring-1 ring-neutral-200">
            <VideoPlayer url={activeLesson?.videoUrl || null} thumbnail={course.thumbnail} />
          </div>

          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm ring-1 ring-neutral-200">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-xl font-bold text-neutral-900">
                {activeLesson?.title || 'Select a lesson to start'}
              </h2>
              {activeLesson && !completedIds.has(activeLesson._id.toString()) && (
                <button
                  onClick={handleMarkComplete}
                  disabled={completing}
                  className="flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50"
                >
                  <IoCheckmarkCircle size={18} />
                  {completing ? 'Saving…' : 'Mark as Complete'}
                </button>
              )}
              {activeLesson && completedIds.has(activeLesson._id.toString()) && (
                <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg">
                  <IoCheckmarkCircle size={18} /> Completed ✓
                </span>
              )}
            </div>
            
            <p className="text-neutral-600 leading-relaxed mb-6">
              {activeLesson?.description || 'Watch the video above and follow along with the lesson content.'}
            </p>

            {/* Resource Files */}
            {activeLesson?.resources?.length > 0 && (
              <div className="border-t border-neutral-100 pt-6">
                <h3 className="font-semibold text-neutral-900 mb-3">Resource Files</h3>
                <div className="flex flex-wrap gap-3">
                  {activeLesson.resources.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-sm hover:bg-neutral-50 cursor-pointer"
                    >
                      <IoDocumentTextOutline className="text-blue-500" /> {r.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Curriculum Sidebar */}
        <div className="w-full lg:w-96 flex flex-col bg-white rounded-2xl shadow-sm ring-1 ring-neutral-200 overflow-hidden shrink-0">
          <div className="p-5 border-b border-neutral-100 bg-neutral-50">
            <h3 className="font-bold text-neutral-900">Course Content</h3>
            <div className="mt-2 text-sm text-neutral-500 flex justify-between">
              <span>{percentage}% Completed</span>
              <span>{completedCount} / {totalLessons} Lessons</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-2">
              <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {lessons.length > 0 ? lessons.map((lesson) => {
              const isActive    = activeLesson?._id === lesson._id;
              const isCompleted = completedIds.has(lesson._id.toString());
              return (
                <div
                  key={lesson._id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`flex items-start gap-3 p-3 text-sm rounded-lg cursor-pointer transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-neutral-50 text-neutral-600'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <IoCheckmarkCircle size={18} className="text-emerald-500" />
                    ) : isActive ? (
                      <IoPlayCircleOutline size={18} className="text-blue-600" />
                    ) : (
                      <IoTimeOutline size={18} className="text-neutral-400" />
                    )}
                  </div>
                  <span className="flex-1 leading-snug">{lesson.title}</span>
                  {lesson.duration ? (
                    <span className="text-xs text-neutral-400 shrink-0">{Math.round(lesson.duration / 60)}m</span>
                  ) : null}
                </div>
              );
            }) : (
              <div className="p-6 text-center text-sm text-neutral-500">
                <IoLockClosedOutline size={28} className="mx-auto mb-2 text-neutral-300" />
                No lessons have been added yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
