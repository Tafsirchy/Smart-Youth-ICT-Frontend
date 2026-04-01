'use client';

import React from 'react';
import ImageLoader from '@/components/ui/ImageLoader';
import { HiOutlineBookOpen, HiOutlineUsers } from 'react-icons/hi';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function CourseInstructor({ instructor }) {
  if (!instructor) return null;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Meet Your Instructor</h3>
      
      <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
        <div className="shrink-0 mx-auto sm:mx-0">
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-blue-50">
            <ImageLoader
              src={instructor.avatar || '/images/default-avatar.png'}
              alt={instructor.name || 'Instructor'}
              fill
              className="object-cover"
              onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + (instructor.name || 'Instructor') + '&background=random' }}
            />
          </div>
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-2xl font-bold text-neutral-900">{instructor.name}</h4>
          <p className="text-blue-600 font-medium text-sm mt-1">{instructor.title || 'Senior Instructor'}</p>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-sm tracking-tight text-neutral-600">

            <div className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
              <HiOutlineUsers className="text-blue-500" size={18} />
              <span className="font-bold">{instructor.studentsCount || '2,400+'}</span>
              <span className="text-neutral-400">Students</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
              <HiOutlineBookOpen className="text-emerald-500" size={18} />
              <span className="font-bold">{instructor.coursesCount || '5'}</span>
              <span className="text-neutral-400">Courses</span>
            </div>
          </div>
          
          <p className="text-neutral-600 mt-5 leading-relaxed text-sm">
            {instructor.bio || `${instructor.name} is a passionate educator with over 5 years of industry experience. They specialize in real-world application of concepts and have helped thousands of students launch successful careers in tech.`}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-3 mt-5">
            {instructor.socials?.linkedin && (
              <a href={instructor.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-colors">
                <FaLinkedin size={18} />
              </a>
            )}
            {instructor.socials?.twitter && (
              <a href={instructor.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white rounded-full transition-colors">
                <FaTwitter size={18} />
              </a>
            )}
             {instructor.socials?.facebook && (
              <a href={instructor.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white rounded-full transition-colors">
                <FaFacebook size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
