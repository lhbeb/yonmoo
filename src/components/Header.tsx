"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { getCartCount } from '@/utils/cart';
import type { Product } from '@/types/product';
import ClientOnly from './ClientOnly';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const announcementIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're on the checkout page
  const isCheckoutPage = pathname === '/checkout';

  const announcements = [
    <span key="nav-1">🚚 <span className="font-bold">Free Shipping</span> across the United States 🇺🇸</span>,
    <span key="nav-2">📦 <span className="font-bold">Free Returns</span> Within <span className="font-bold">30 days</span></span>,
    <span key="nav-3" className="cursor-pointer" onClick={() => { if (typeof window !== 'undefined' && (window as any).tidioChatApi) { (window as any).tidioChatApi.open(); } }}>💬 Questions? <span className="font-bold">Live Chat Available 24/7</span></span>,
  ];

  // Announcement bar animation - PRESERVED EXACTLY
  useEffect(() => {
    const startAnnouncementRotation = () => {
      announcementIntervalRef.current = setInterval(() => {
        setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
      }, 2000);
    };

    startAnnouncementRotation();

    return () => {
      if (announcementIntervalRef.current) {
        clearInterval(announcementIntervalRef.current);
      }
    };
  }, [announcements.length]);

  // PRESERVED EXACTLY
  const handleAnnouncementNavigation = (direction: 'prev' | 'next') => {
    if (announcementIntervalRef.current) {
      clearInterval(announcementIntervalRef.current);
    }

    setCurrentAnnouncement(prev => {
      if (direction === 'prev') {
        return prev === 0 ? announcements.length - 1 : prev - 1;
      } else {
        return (prev + 1) % announcements.length;
      }
    });

    // Restart auto-rotation after manual navigation
    setTimeout(() => {
      announcementIntervalRef.current = setInterval(() => {
        setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
      }, 2000);
    }, 100);
  };

  // PRESERVED EXACTLY
  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window !== 'undefined') {
        setCartCount(getCartCount());
      }
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // PRESERVED EXACTLY
  useEffect(() => {
    const handleScroll = () => {
      // Don't make header sticky on checkout page
      if (pathname === '/checkout') {
        setIsSticky(false);
        return;
      }

      if (typeof window !== 'undefined') {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const promotionalBarHeight = 40;

        if (scrollTop > promotionalBarHeight) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // PRESERVED EXACTLY
  const handleCartClick = () => {
    if (cartCount > 0) {
      router.push('/checkout');
    }
  };

  // PRESERVED EXACTLY
  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Announcement bar - Light Vinted Teal background with dark teal text */}
      <div suppressHydrationWarning={true} className="bg-[#F4F0FB] text-[#451e84] py-2 relative overflow-hidden h-[40px] flex items-center border-b border-[#451e84]/15">
        <div suppressHydrationWarning={true} className="container mx-auto px-4 flex items-center justify-center relative w-full h-full">
          {/* Announcement Text */}
          <div suppressHydrationWarning={true} className="text-center font-medium px-4 sm:px-16 transition-all duration-500 ease-in-out h-full flex items-center justify-center min-h-[24px]">
            <span key={currentAnnouncement} className="inline-block animate-fade-in whitespace-nowrap text-sm sm:text-base h-full flex items-center text-[#451e84]">
              {announcements[currentAnnouncement]}
            </span>
          </div>

          {/* Desktop Arrows */}
          <button
            onClick={() => handleAnnouncementNavigation('prev')}
            className="hidden sm:block absolute left-1/2 transform -translate-x-56 p-1 hover:bg-[#451e84]/10 rounded-full transition-colors duration-200 z-10 text-[#451e84]"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => handleAnnouncementNavigation('next')}
            className="hidden sm:block absolute left-1/2 transform translate-x-52 p-1 hover:bg-[#451e84]/10 rounded-full transition-colors duration-200 z-10 text-[#451e84]"
            aria-label="Next announcement"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Header - Two-tier layout */}
      <header
        ref={headerRef}
        suppressHydrationWarning={true}
        className={`transition-all duration-300 bg-white border-b border-gray-200 ${isSticky
          ? 'fixed top-0 left-0 right-0 z-50 shadow-sm'
          : 'relative'
          }`}
      >
        {/* Top Row: Clean White Header with Blue Logo and Accents */}
        <div suppressHydrationWarning={true} className="bg-white text-gray-800">
          <div suppressHydrationWarning={true} className="container mx-auto px-4 py-3.5 sm:py-4">
            <div suppressHydrationWarning={true} className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center space-x-2 flex-shrink-0 cursor-pointer relative z-20"
              aria-label="Yomnoo Home"
            >
              <Image
                src="/logosvg.svg"
                alt="Yomnoo Logo"
                width={165}
                height={37}
                priority
                unoptimized
                className="w-36 sm:w-40 md:w-44 h-auto cursor-pointer pointer-events-auto select-none"
              />
            </Link>

            {/* Desktop Search Bar */}
            <div suppressHydrationWarning={true} className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div
                suppressHydrationWarning={true}
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center bg-[#F2F4F5] border border-gray-200 rounded-lg px-4 py-2.5 cursor-pointer hover:bg-gray-200/80 transition-colors"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 cursor-pointer"
                  readOnly
                />
                <Search className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Right side actions */}
            <div suppressHydrationWarning={true} className="flex items-center gap-3">
              {/* Sell Now Button - Desktop */}
              <Link
                href="/sell"
                className="hidden lg:flex items-center justify-center bg-[#451e84] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#361668] transition-colors duration-300"
              >
                Sell Now
              </Link>

              {/* Mobile Search Icon - Only visible when scrolling (isSticky) */}
              {isSticky && (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="lg:hidden text-gray-700 hover:text-[#451e84] transition-colors duration-300"
                  aria-label="Search products"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}

              {/* Help Center Icon - Desktop */}
              <Link
                href="/contact"
                className="hidden sm:flex text-gray-700 hover:text-[#451e84] transition-colors duration-300"
                aria-label="Help Center"
              >
                <Info className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative text-gray-700 hover:text-[#451e84] transition-colors duration-300"
                aria-label={`Shopping cart ${cartCount > 0 ? `with ${cartCount} items` : '(empty)'}`}
              >
                <ShoppingCart className="h-5 w-5" />
                <ClientOnly>
                  <span className={`absolute -top-2 -right-2 bg-[#451e84] text-white text-xs rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center font-semibold transition-opacity duration-300 ${cartCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
                    {cartCount}
                  </span>
                </ClientOnly>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-gray-700 hover:text-[#451e84] transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Mobile Search Bar - Below header on mobile (hidden when scrolling or on checkout page) */}
        {!isSticky && !isCheckoutPage && (
          <div suppressHydrationWarning={true} className="lg:hidden bg-white border-t border-b border-gray-200">
            <div suppressHydrationWarning={true} className="container mx-auto px-4 py-3">
              <div
                suppressHydrationWarning={true}
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center bg-[#F2F4F5] border border-gray-200 rounded-lg px-4 py-2.5 cursor-pointer hover:bg-gray-200/80 transition-colors"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 cursor-pointer"
                  readOnly
                />
                <Search className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Bar - Clean White background with gray text */}
        <div suppressHydrationWarning={true} className="hidden lg:block bg-white border-t border-gray-100">
          <div suppressHydrationWarning={true} className="container mx-auto px-4">
            <nav className="flex items-center gap-8 py-3 font-heading">
              <Link href="/#products" className="text-gray-600 hover:text-[#451e84] font-medium text-sm transition-colors duration-300">
                All
              </Link>
              <Link href="/electronics" className="text-gray-600 hover:text-[#451e84] font-medium text-sm transition-colors duration-300">
                Cameras & Electronics
              </Link>
              <Link href="/fashion" className="text-gray-600 hover:text-[#451e84] font-medium text-sm transition-colors duration-300">
                Fashion
              </Link>
              <Link href="/entertainment" className="text-gray-600 hover:text-[#451e84] font-medium text-sm transition-colors duration-300">
                Gaming & Entertainment
              </Link>
              <Link href="/hobbies-collectibles" className="text-gray-600 hover:text-[#451e84] font-medium text-sm transition-colors duration-300">
                Hobbies & Collectibles
              </Link>
              <Link href="/#featured" className="text-gray-600 hover:text-[#451e84] font-medium text-sm transition-colors duration-300">
                Featured
              </Link>
              <Link href="/track" className="text-gray-600 hover:text-[#451e84] font-medium text-sm transition-colors duration-300">
                Track Order
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-[#451e84] font-medium text-sm transition-colors duration-300">
                Contact us
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile menu - Only Track Order, Contact Us, and Sell Now */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col font-heading">
                <Link href="/track" className="text-center text-gray-700 hover:text-[#451e84] font-medium transition-colors duration-300 pb-4 border-b border-gray-100" onClick={handleMobileMenuClose}>
                  Track Order
                </Link>
                <Link href="/contact" className="text-center text-gray-700 hover:text-[#451e84] font-medium transition-colors duration-300 py-4 border-b border-gray-100" onClick={handleMobileMenuClose}>
                  Contact Us
                </Link>
                <Link
                  href="/sell"
                  className="inline-flex items-center justify-center text-center bg-[#451e84] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#361668] transition-colors duration-300 mt-4"
                  onClick={handleMobileMenuClose}
                >
                  Sell Now
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* SearchBar overlay - PRESERVED */}
        <SearchBar open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>

      {/* Mobile Swipeable Menu - Outside header, stays at top of page (hidden on checkout page) */}
      {!isCheckoutPage && (
        <div suppressHydrationWarning={true} className="lg:hidden bg-white border-b border-gray-200">
          <div suppressHydrationWarning={true} className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            <nav className="flex items-center gap-3 px-4 py-3 min-w-max">
              <Link
                href="/#products"
                className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-[#451e84] hover:text-[#451e84] hover:bg-[#F4F0FB] transition-colors duration-300 whitespace-nowrap"
              >
                All
              </Link>
              <Link
                href="/electronics"
                className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-[#451e84] hover:text-[#451e84] hover:bg-[#F4F0FB] transition-colors duration-300 whitespace-nowrap"
              >
                Electronics
              </Link>
              <Link
                href="/fashion"
                className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-[#451e84] hover:text-[#451e84] hover:bg-[#F4F0FB] transition-colors duration-300 whitespace-nowrap"
              >
                Fashion
              </Link>
              <Link
                href="/entertainment"
                className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-[#451e84] hover:text-[#451e84] hover:bg-[#F4F0FB] transition-colors duration-300 whitespace-nowrap"
              >
                Entertainment
              </Link>
              <Link
                href="/hobbies-collectibles"
                className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-[#451e84] hover:text-[#451e84] hover:bg-[#F4F0FB] transition-colors duration-300 whitespace-nowrap"
              >
                Hobbies & Collectibles
              </Link>
              <Link
                href="/#featured"
                className="flex-shrink-0 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-[#451e84] hover:text-[#451e84] hover:bg-[#F4F0FB] transition-colors duration-300 whitespace-nowrap"
              >
                Featured
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
