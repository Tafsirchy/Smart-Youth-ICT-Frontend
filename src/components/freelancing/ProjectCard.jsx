import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineBriefcase, HiOutlineCurrencyDollar, HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';

export default function ProjectCard({ project }) {
  const { title, company, category, budget, duration, type, description, slug } = project;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
      <div className="p-6 relative flex-1 flex flex-col">
        {/* Header Label */}
        <div className="flex justify-between items-start mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider border border-orange-100 shadow-sm">
            <HiOutlineBriefcase size={14} />
            {category || 'Freelance'}
          </span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-md text-xs border border-emerald-100 shadow-sm">
            {type || 'Remote'}
          </span>
        </div>

        {/* Title & Company */}
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-2">
          {title}
        </h3>
        {company && (
          <p className="text-xs sm:text-sm font-medium text-neutral-500 mb-4">{company}</p>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 mt-auto border-t border-neutral-100 pt-4">
          <div className="flex items-center gap-2 text-neutral-600 text-xs sm:text-sm">
            <HiOutlineCurrencyDollar className="text-orange-500" size={18} />
            <span className="font-semibold text-neutral-800">{budget || 'TBD'}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 text-xs sm:text-sm">
            <HiOutlineClock className="text-neutral-400" size={18} />
            <span className="font-medium text-neutral-800">{duration || 'Flexible'}</span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="text-neutral-500 text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <Link 
          href={`/freelancing/${slug || title.toLowerCase().replace(/\s+/g, '-')}`} 
          className="block w-full text-center py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl transition-colors min-h-[44px] flex items-center justify-center text-sm tracking-wide shadow-sm"
        >
          View Project Details
        </Link>
      </div>
    </div>
  );
}
