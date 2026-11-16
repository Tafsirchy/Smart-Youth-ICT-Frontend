"use client";

// ─── Shared Decorative SVG Components ──────────────────────────────────────

export const LoopScribble = ({ className }) => (
  <svg
    className={className}
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 40C20 10 50 10 60 40C70 70 100 70 110 40"
      stroke="#2D5A54"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 4"
      opacity="0.3"
    />
    <path
      d="M110 40L100 45M110 40L100 35"
      stroke="#2D5A54"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.3"
    />
  </svg>
);

export const ArrowScribbleLong = ({ className }) => (
  <svg
    className={className}
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M70 10C75 40 60 80 10 90"
      stroke="#2D5A54"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.2"
    />
    <path
      d="M10 90L20 85M10 90L15 95"
      stroke="#2D5A54"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.2"
    />
  </svg>
);

export const LightbulbIcon = ({ className }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 1 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2v2" />
    <path d="M5 8h2" />
    <path d="M17 8h2" />
    <path d="M7 3l1.5 1.5" />
    <path d="M15.5 4.5L17 3" />
  </svg>
);

export const PieChartIcon = ({ className }) => (
  <svg
    className={className}
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

export const StarIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const DotGrid = ({ className }) => (
  <div className={`grid grid-cols-4 gap-3 ${className}`}>
    {[...Array(16)].map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 bg-[#204E47] opacity-20" />
    ))}
  </div>
);
