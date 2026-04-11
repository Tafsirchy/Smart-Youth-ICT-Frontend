"use client";

import { useEffect } from "react";

export default function MessengerChat() {
  const pageId = process.env.NEXT_PUBLIC_FB_PAGE_ID;

  useEffect(() => {
    if (!pageId) return;

    // Facebook customer chat is commonly blocked in local development by browser/privacy tooling.
    // Skip loading on localhost to avoid noisy CORS/network errors during dev.
    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");
    if (isLocalhost) return;

    const loadMessenger = () => {
      if (window.FB_SDK_LOADED) return;

      window.fbAsyncInit = function () {
        window.FB.init({ xfbml: true, version: "v18.0" });
      };
      const script = document.createElement("script");
      script.src =
        "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
      window.FB_SDK_LOADED = true;
    };

    // Load after 4 seconds of idle time or on first interaction
    const timer = setTimeout(loadMessenger, 4000);
    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    const handler = () => {
      loadMessenger();
      events.forEach((e) => window.removeEventListener(e, handler));
      clearTimeout(timer);
    };

    events.forEach((e) =>
      window.addEventListener(e, handler, { passive: true }),
    );

    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      clearTimeout(timer);
      // We don't remove the script on unmount to avoid re-loading it if they navigate back
    };
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
