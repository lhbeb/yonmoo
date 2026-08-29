"use client";

import React from 'react';

interface LiveChatButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function LiveChatButton({ children, className }: LiveChatButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && (window as any).tidioChatApi) {
      (window as any).tidioChatApi.open();
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
