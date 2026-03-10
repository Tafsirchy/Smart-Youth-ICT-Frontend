/**
 * Format a JS Date (or ISO string) to a readable Bangla/English date.
 * @param {string|Date} date
 * @param {'en'|'bn'} locale
 */
export function formatDate(date, locale = 'en') {
  return new Intl.DateTimeFormat(locale === 'bn' ? 'bn-BD' : 'en-GB', {
    day:   '2-digit',
    month: 'long',
    year:  'numeric',
  }).format(new Date(date));
}

/** Relative time (e.g. "3 days ago") */
export function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const rtf  = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const units = [
    { unit: 'year',   ms: 31536000000 },
    { unit: 'month',  ms: 2592000000  },
    { unit: 'week',   ms: 604800000   },
    { unit: 'day',    ms: 86400000    },
    { unit: 'hour',   ms: 3600000     },
    { unit: 'minute', ms: 60000       },
  ];
  for (const { unit, ms } of units) {
    if (Math.abs(diff) >= ms) {
      return rtf.format(-Math.round(diff / ms), unit);
    }
  }
  return 'just now';
}
