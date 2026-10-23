/**
 * Utility functions for safely resolving bilingual or multi-type database fields
 * (e.g. `{ en: string, bn: string }`, strings, numbers, or subdocuments).
 */

export const resolveText = (val, fallback = '') => {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') {
    return val.en || val.bn || Object.values(val)[0] || fallback;
  }
  return String(val);
};

export const resolveCourseTitle = (courseOrTitle, fallback = 'Course') => {
  if (!courseOrTitle) return fallback;
  if (typeof courseOrTitle === 'string') return courseOrTitle;
  if (typeof courseOrTitle === 'object') {
    if (courseOrTitle.title) {
      return resolveText(courseOrTitle.title, fallback);
    }
    return resolveText(courseOrTitle, fallback);
  }
  return String(courseOrTitle);
};
