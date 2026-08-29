"use client";

import React from 'react';
import Image from 'next/image';
import { Instagram, ExternalLink } from 'lucide-react';
import { sendTelegramNotification } from '@/utils/telegram-notify';

const InstagramWidget: React.FC = () => {
  const handleInstagramClick = () => {
    sendTelegramNotification({
      url: typeof window !== 'undefined' ? window.location.href : 'https://yomnoo.com',
      action: 'instagram_click',
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          {/* Profile Picture with Instagram Gradient Ring */}
          <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full p-0.5 flex-shrink-0">
            <div className="w-full h-full bg-[#4c1d95] rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/instagram-avatar.svg"
                alt="Yomnoo Profile"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-grow">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-bold text-[#262626] text-xl">@helloyonmoo</h3>
              <svg className="w-4 h-4 text-[#3897f0] fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm mb-3">Yomnoo • Shopping &amp; retail</p>

            {/* Statistics */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-[#262626]">0</div>
                <div className="text-gray-500 text-xs">posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[#262626]">54.2K</div>
                <div className="text-gray-500 text-xs">followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[#262626]">794</div>
                <div className="text-gray-500 text-xs">following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Follow Button */}
        <a
          href="https://instagram.com/helloyonmoo"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleInstagramClick}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <Instagram className="h-5 w-5 mr-2" />
          Follow on Instagram
          <ExternalLink className="h-4 w-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default InstagramWidget;
