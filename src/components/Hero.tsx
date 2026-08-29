"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const words = ['Limitless Deals', 'Endless Offers', 'Infinite Finds', 'Forever Savings'];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('Limitless Deals');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 90);
      } else {
        // Pause at end of word
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  return (
    <div className="relative min-h-[420px] md:min-h-[385px] bg-[#16033d] overflow-hidden">
      {/* Content Container */}
      <div className="container mx-auto px-4 py-8 md:py-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 max-w-6xl mx-auto min-h-[320px] md:min-h-[315px]">

          {/* Hero Content */}
          <div className="w-full max-w-[340px] md:max-w-[420px] lg:max-w-[440px] p-4 sm:p-6 lg:p-0 flex-shrink-0">
            {/* Heading with typing animation - Inverted colors with exact sizing */}
            <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-white leading-tight">
              <span className="block text-[#C4B5FD] h-[1.2em] mb-1 font-bold">
                {displayedText}
                <span className="inline-block animate-pulse ml-0.5 opacity-80">|</span>
              </span>
              <span className="block leading-tight text-white">
                Where Great Deals Never End
              </span>
            </h1>

            {/* Description - Exact original sizing */}
            <p className="mt-3 text-sm md:text-base text-[#F8FAFC]/80 leading-relaxed">
              Endless deals across fashion, tech, cameras, and more, always verified and always worth discovering.
            </p>

            {/* Shop Now Button - Exact original sizing */}
            <a
              href="#products"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-white text-[#16033d] text-sm font-bold rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
            >
              Shop Now
            </a>
          </div>

          {/* Complementary Geometric Bento Grid - Desktop Only */}
          <div className="hidden lg:grid grid-cols-2 gap-x-7 xl:gap-x-9 w-full max-w-[460px] xl:max-w-[500px] flex-shrink-0 pt-8 pb-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-9 xl:gap-11">
              {/* Card 1: Gaming (Sleek Horizontal Shape) */}
              <Link
                href="/entertainment"
                className="group relative flex flex-col items-center justify-end p-3.5 pb-3 rounded-[26px] bg-[#c4b5fd] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-[124px] xl:h-[134px] overflow-visible border border-[#c4b5fd]/80"
              >
                <div className="absolute -top-8 xl:-top-10 left-1/2 -translate-x-1/2 w-[120%] h-[105px] xl:h-[118px] flex items-center justify-center pointer-events-none overflow-visible">
                  <Image
                    src="/item2.png"
                    alt="Gaming"
                    fill
                    className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <span className="text-xs xl:text-sm font-extrabold text-[#16033d] uppercase tracking-wider block relative z-10">
                  Gaming
                </span>
              </Link>

              {/* Card 2: Fashion (Taller Organic Shape) */}
              <Link
                href="/fashion"
                className="group relative flex flex-col items-center justify-end p-3.5 pb-3.5 rounded-[32px] bg-[#c4b5fd] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-[150px] xl:h-[162px] overflow-visible border border-[#c4b5fd]/80"
              >
                <div className="absolute -top-10 xl:-top-12 left-1/2 -translate-x-1/2 w-[112%] h-[125px] xl:h-[138px] flex items-center justify-center pointer-events-none overflow-visible">
                  <Image
                    src="/item3.png"
                    alt="Fashion"
                    fill
                    className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <span className="text-xs xl:text-sm font-extrabold text-[#16033d] uppercase tracking-wider block relative z-10">
                  Fashion
                </span>
              </Link>
            </div>

            {/* Column 2 (Staggered geometric offset) */}
            <div className="flex flex-col gap-9 xl:gap-11 pt-6 xl:pt-7">
              {/* Card 3: Cameras (Taller Organic Shape) */}
              <Link
                href="/electronics"
                className="group relative flex flex-col items-center justify-end p-3.5 pb-3.5 rounded-[32px] bg-[#c4b5fd] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-[150px] xl:h-[162px] overflow-visible border border-[#c4b5fd]/80"
              >
                <div className="absolute -top-9 xl:-top-11 left-1/2 -translate-x-1/2 w-[118%] h-[120px] xl:h-[132px] flex items-center justify-center pointer-events-none overflow-visible">
                  <Image
                    src="/item1.png"
                    alt="Cameras"
                    fill
                    className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <span className="text-xs xl:text-sm font-extrabold text-[#16033d] uppercase tracking-wider block relative z-10">
                  Cameras
                </span>
              </Link>

              {/* Card 4: Scooters (Sleek Compact Shape) */}
              <Link
                href="/scooters"
                className="group relative flex flex-col items-center justify-end p-3.5 pb-3 rounded-[26px] bg-[#c4b5fd] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-[124px] xl:h-[134px] overflow-visible border border-[#c4b5fd]/80"
              >
                <div className="absolute -top-9 xl:-top-11 left-1/2 -translate-x-1/2 w-[112%] h-[112px] xl:h-[124px] flex items-center justify-center pointer-events-none overflow-visible">
                  <Image
                    src="/item4.png"
                    alt="Scooters"
                    fill
                    className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <span className="text-xs xl:text-sm font-extrabold text-[#16033d] uppercase tracking-wider block relative z-10">
                  Scooters
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
