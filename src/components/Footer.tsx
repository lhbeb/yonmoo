"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, MapPin, Instagram } from 'lucide-react';
import { BUSINESS_DETAILS } from '@/lib/business';
import { sendTelegramNotification } from '@/utils/telegram-notify';

const Footer = () => {
  const handleInstagramClick = () => {
    sendTelegramNotification({
      url: typeof window !== 'undefined' ? window.location.href : 'https://yomnoo.com',
      action: 'instagram_click',
    });
  };

  return (
    <footer className="bg-[#16033d] text-[#F8FAFC]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              onClick={() => {
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center space-x-2 mb-4 cursor-pointer"
              aria-label="Yomnoo Home"
            >
              <Image
                src="/logosvg-white.svg"
                alt="Yomnoo Logo"
                width={165}
                height={37}
                unoptimized
                className="w-36 sm:w-40 md:w-44 h-auto cursor-pointer"
              />
            </Link>
            <p className="mb-4 text-[#F8FAFC]/80">
              Your trusted destination for quality electronics and second-hand items.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 shrink-0 text-[#C4B5FD] mr-2" />
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).tidioChatApi) {
                      (window as any).tidioChatApi.open();
                    }
                  }}
                  className="text-left hover:text-[#C4B5FD] transition-colors duration-300 cursor-pointer"
                >
                  <span className="font-semibold text-white">Live Chat:</span> Available 24/7
                </button>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#C4B5FD] mr-2" />
                <a href="mailto:contact@yomnoo.com" className="hover:text-[#C4B5FD] transition-colors duration-300">
                  contact@yomnoo.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 shrink-0 text-[#C4B5FD] mr-2 mt-1" />
                <div>
                  <span className="block font-semibold text-white">United States (Fulfillment & Headquarters)</span>
                  <span>{BUSINESS_DETAILS.warehouses[0].street}, {BUSINESS_DETAILS.warehouses[0].cityRegionPostal}, {BUSINESS_DETAILS.warehouses[0].country}</span>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://instagram.com/helloyonmoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleInstagramClick}
                  className="inline-flex items-center text-[#F8FAFC]/80 hover:text-[#451e84] transition-colors duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#451e84] transition-colors duration-300">Home</Link></li>
              <li><Link href="/#products" className="hover:text-[#451e84] transition-colors duration-300">Products</Link></li>
              <li><Link href="/#featured" className="hover:text-[#451e84] transition-colors duration-300">Featured</Link></li>
              <li><Link href="/sell" className="hover:text-[#451e84] transition-colors duration-300">Sell on Yomnoo</Link></li>
              <li><Link href="/track" className="hover:text-[#451e84] transition-colors duration-300">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-[#451e84] transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Policies & Info</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-[#451e84] transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#451e84] transition-colors duration-300">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-[#451e84] transition-colors duration-300">About Us</Link></li>
              <li><Link href="/return-policy" className="hover:text-[#451e84] transition-colors duration-300">Refund & Return Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#451e84] transition-colors duration-300">Shipping Policy</Link></li>
              <li><Link href="/local-pickup" className="hover:text-[#451e84] transition-colors duration-300">Local Pickup Guide</Link></li>
              <li><Link href="/contact" className="hover:text-[#451e84] transition-colors duration-300">Contact Us</Link></li>
              <li><Link href="/cookies" className="hover:text-[#451e84] transition-colors duration-300">Cookies Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center">
              <Image
                src="/secure-checkout.png"
                alt="Secure Checkout"
                width={400}
                height={64}
                className="h-16 w-auto max-w-full object-contain brightness-110 contrast-110"
              />
            </div>
            <p className="text-center text-gray-400 text-sm">© 2025 Yomnoo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
