'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import {
  HiCalendar,
  HiClock,
  HiOfficeBuilding,
  HiVideoCamera,
  HiUser,
  HiAcademicCap,
  HiBookOpen,
  HiCheckCircle
} from 'react-icons/hi';
import { resolveCourseTitle } from '@/utils/text';

const DAYS_OF_WEEK = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

export default function StudentRoutinePage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Today's day name in English
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[new Date().getDay()];

  useEffect(() => {
    api
      .get('/routines/my-routine')
      .then((res) => {
        if (res.data?.success) {
          setSchedules(res.data.data || []);
        }
      })
      .catch((err) => console.error('Failed to load my routine:', err))
      .finally(() => setLoading(false));
  }, []);

  const schedulesByDay = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day] = schedules.filter((s) => s.dayOfWeek === day);
    return acc;
  }, {});

  const todayClasses = schedulesByDay[todayName] || [];

  return (
    <div className="space-y-6 pb-16">
      {/* ── Page Header ── */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 bg-purple-50 text-purple-600 rounded-lg">
            <HiCalendar size={24} />
          </span>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            My Weekly Class Routine
          </h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Your active class schedule, lab assignments, and live streaming links across all enrolled courses.
        </p>
      </div>

      {/* ── Today's Schedule Highlight Banner ── */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg border border-purple-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-purple-200 mb-2">
              <HiCalendar size={14} /> Today: {todayName}
            </div>
            <h2 className="text-xl font-bold">
              {todayClasses.length > 0
                ? `You have ${todayClasses.length} class${todayClasses.length > 1 ? 'es' : ''} scheduled today!`
                : 'No classes scheduled for today. Great time for self-practice! 💡'}
            </h2>
            <p className="text-xs text-purple-200 mt-1">
              Be punctual. For lab classes, arrive 10 minutes before the start time.
            </p>
          </div>

          {todayClasses.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {todayClasses.map((cls) => (
                <div key={cls._id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-xs">
                  <div className="font-bold text-white">{cls.batchName}</div>
                  <div className="text-purple-200 text-[11px] mt-0.5">
                    {cls.startTime} - {cls.endTime} • {cls.roomOrLab}
                  </div>
                  {cls.meetingLink && (
                    <a
                      href={cls.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-[11px] font-semibold transition"
                    >
                      <HiVideoCamera size={13} /> Join Live Class
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Full Weekly Timetable ── */}
      {loading ? (
        <div className="py-24 text-center text-sm text-gray-500 bg-white border rounded-xl">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading your routine...
        </div>
      ) : schedules.length === 0 ? (
        <div className="py-20 text-center text-sm text-gray-500 bg-white border border-gray-200 rounded-xl p-6">
          <HiBookOpen className="mx-auto text-gray-300 mb-2" size={44} />
          <h3 className="text-base font-bold text-gray-800">No Routine Assigned Yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
            You don&apos;t have any active classes scheduled right now. Once your branch admin assigns your batch timetable, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DAYS_OF_WEEK.map((day) => {
            const dayClasses = schedulesByDay[day] || [];
            const isToday = day === todayName;

            return (
              <div
                key={day}
                className={`bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col ${
                  isToday ? 'border-purple-500 ring-2 ring-purple-100' : 'border-gray-200'
                }`}
              >
                <div
                  className={`px-4 py-3 border-b flex items-center justify-between ${
                    isToday ? 'bg-purple-50 text-purple-900 border-purple-100' : 'bg-gray-50 text-gray-800 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className={`w-2 h-2 rounded-full ${isToday ? 'bg-purple-600' : 'bg-gray-400'}`} />
                    {day}
                    {isToday && (
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 bg-purple-200 text-purple-800 rounded">
                        Today
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-gray-500">
                    {dayClasses.length} {dayClasses.length === 1 ? 'Slot' : 'Slots'}
                  </span>
                </div>

                <div className="p-4 flex-1 space-y-3">
                  {dayClasses.length === 0 ? (
                    <div className="py-6 text-center text-xs text-gray-400">
                      No classes scheduled
                    </div>
                  ) : (
                    dayClasses.map((item) => (
                      <div
                        key={item._id}
                        className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <HiClock size={13} /> {item.startTime} - {item.endTime}
                          </span>
                          <span className="text-[11px] font-medium text-gray-600 flex items-center gap-1">
                            <HiOfficeBuilding size={13} className="text-gray-400" />
                            {item.roomOrLab}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{item.batchName}</h4>
                          <p className="text-xs text-gray-600 font-medium mt-0.5">
                            {resolveCourseTitle(item.course)}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1 text-[11px]">
                            <HiUser size={12} className="text-gray-400" />
                            {item.trainer?.name}
                          </span>

                          {item.meetingLink && (
                            <a
                              href={item.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1"
                            >
                              <HiVideoCamera size={13} /> Zoom Link
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
