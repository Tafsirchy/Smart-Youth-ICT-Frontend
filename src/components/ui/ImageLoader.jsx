"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * A wrapper around next/image that shows a skeleton loader while the image is loading.
 */
export default function ImageLoader({
  src,
  alt,
  className,
  wrapperClassName,
  skeletonClassName,
  disableTransition,
  priority,
  fetchPriority,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "relative overflow-hidden", 
        props.fill ? "w-full h-full" : "w-max h-max",
        wrapperClassName
      )}
    >
      {/* Skeleton loader - skip if transition is disabled (assume priority image) */}
      {!isLoaded && !disableTransition && (
        <div
          className={cn(
            "absolute inset-0 bg-slate-200 animate-pulse z-0",
            skeletonClassName
          )}
        />
      )}
      
      {/* Actual Image */}
      <Image
        src={src}
        alt={alt || "Image"}
        className={cn(
          !disableTransition && "transition-opacity duration-500 ease-in-out",
          (isLoaded || disableTransition) ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        priority={priority}
        fetchPriority={fetchPriority}
        {...props}
      />
    </div>
  );
}
