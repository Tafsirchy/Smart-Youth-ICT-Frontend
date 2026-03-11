import React from 'react';
import { default as Link } from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      href,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      destructive:
        'bg-red-500 text-red-50 hover:bg-red-500/90',
      outline:
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary:
        'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-blue-600 underline-offset-4 hover:underline',
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={classes} ref={ref} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
