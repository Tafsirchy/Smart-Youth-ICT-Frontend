import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Badge({ className, variant = 'default', ...props }) {
  const baseStyles =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  const variants = {
    default:
      'border-transparent bg-blue-600 text-white hover:bg-blue-600/80',
    secondary:
      'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80',
    destructive:
      'border-transparent bg-red-500 text-red-50 hover:bg-red-500/80',
    success:
      'border-transparent bg-emerald-500 text-white hover:bg-emerald-500/80',
    outline: 'text-foreground',
  };

  const classes = cn(baseStyles, variants[variant], className);

  return <div className={classes} {...props} />;
}
