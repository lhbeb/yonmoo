"use client";

import { usePathname } from 'next/navigation';
import Script from 'next/script';

const LIVECHAT_SCRIPT_SRC = "https://chatapppay-rust.vercel.app/livechat.js";

export default function TidioChat() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isCheckoutRoute = pathname?.startsWith('/checkout');
  const isLiveChatRoute = pathname?.startsWith('/livechat');

  if (isAdminRoute || isCheckoutRoute || isLiveChatRoute) {
    return null;
  }

  return (
    <Script
      id="live-chat-script"
      src={LIVECHAT_SCRIPT_SRC}
      strategy="lazyOnload"
      data-color="#007bff"
      data-position="bottom-right"
      data-button-size="60"
      data-label="Chat with us"
    />
  );
}
