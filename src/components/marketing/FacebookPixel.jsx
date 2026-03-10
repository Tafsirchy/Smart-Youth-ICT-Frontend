'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FacebookPixel() {
  const pixelId  = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!pixelId || typeof window === 'undefined') return;

    // Inject FB Pixel base code once
    if (!window.fbq) {
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      window.fbq('init', pixelId);
    }

    // Fire PageView on every route change
    window.fbq('track', 'PageView');
  }, [pathname, pixelId]);

  return null;
}
