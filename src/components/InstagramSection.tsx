"use client";

import React from 'react';
import Image from 'next/image';
import { Instagram, ExternalLink } from 'lucide-react';
import { sendTelegramNotification } from '@/utils/telegram-notify';

const InstagramSection: React.FC = () => {
  const handleInstagramClick = () => {
    sendTelegramNotification({
      url: typeof window !== 'undefined' ? window.location.href : 'https://yomnoo.com',
      action: 'instagram_click',
    });
  };

  return (
    <section className="py-8 bg-[#ECEEF2] border-t border-gray-200/60">
      <div className="w-full px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Info */}
              <div className="flex items-center space-x-4">
                {/* Profile Picture with Instagram Gradient Border */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full p-0.5 flex-shrink-0">
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

                {/* Profile Details */}
                <div className="flex-grow">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-bold text-[#262626] text-lg sm:text-xl">@helloyonmoo</h3>
                    <svg className="w-4 h-4 text-[#3897f0] fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2">
                    <span className="font-medium text-gray-700">Yomnoo</span>
                    <span>•</span>
                    <span>Shopping &amp; retail</span>
                  </div>

                  {/* Statistics */}
                  <div className="flex items-center space-x-4 sm:space-x-6 text-sm">
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

              {/* Follow Us Button */}
              <div className="flex-shrink-0">
                <a
                  href="https://instagram.com/helloyonmoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleInstagramClick}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Follow Us</span>
                  <span className="sm:hidden">Follow</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
