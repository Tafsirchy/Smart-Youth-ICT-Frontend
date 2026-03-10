'use client';

import { useEffect } from 'react';

export default function MessengerChat() {
  const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID;

  useEffect(() => {
    if (!pageId) return;
    window.fbAsyncInit = function () {
      window.FB.init({ xfbml: true, version: 'v18.0' });
    };
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [pageId]);

  if (!pageId) return null;

  return (
    <>
      <div id="fb-root" />
      <div
        className="fb-customerchat"
        attribution="biz_inbox"
        page_id={pageId}
        theme_color="#FF2C6D"
      />
    </>
  );
}
