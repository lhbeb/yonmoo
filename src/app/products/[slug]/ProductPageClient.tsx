"use client";

import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductReviews from '@/components/ProductReviews';
import ShippingInfo from '@/components/ShippingInfo';
import ClientOnly from '@/components/ClientOnly';
import RecommendedProducts from '@/components/RecommendedProducts';
import SameDayShipping from '@/components/SameDayShipping';
import SellerBadge from '@/components/SellerBadge';
import { addToCart } from '@/utils/cart';
import { preventScrollOnClick } from '@/utils/scrollUtils';
import { debugNavigation, debugError, debugLog } from '@/utils/debug';
import { trackPixelEvent } from '@/lib/pixel';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, ShoppingCart, Share2, Zap, Eye, ZoomIn, Info, Ruler } from 'lucide-react';
import { useState, useEffect, useMemo, useRef, type CSSProperties } from 'react';
import type { Product } from '@/types/product';
import Image from 'next/image';
import { getConditionDisplayLabel, getConditionTooltip, mapConditionToGmc } from '@/lib/conditions';
import { getMarket, formatMarketPrice } from '@/lib/markets';

interface ProductPageClientProps {
  product: Product | null;
}

interface ProductActivity {
  views: number;
  cartAdds: number;
}

const PRODUCT_IMAGE_QUALITY = 95;
const COLLAPSED_FAQ_COUNT = 2;

function hashActivitySeed(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function getProductActivity(slug: string, date = new Date()): ProductActivity {
  // Rotating the seed daily keeps the signal fresh without changing on refresh.
  const dayKey = date.toISOString().slice(0, 10);
  const seed = hashActivitySeed(`${slug}:${dayKey}`);
  const views = 10 + (seed % 31);

  // Keep cart activity within a believable 3–12% range, capped at four adds.
  const maximumCartAdds = Math.min(4, Math.max(1, Math.floor(views * 0.12)));
  const cartAdds = 1 + ((seed >>> 8) % maximumCartAdds);

  return { views, cartAdds };
}

export default function ProductPageClient({ product: initialProduct }: ProductPageClientProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const conditionTriggerRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [productActivity, setProductActivity] = useState<ProductActivity | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isConditionTooltipVisible, setIsConditionTooltipVisible] = useState(false);
  const [conditionTooltipStyle, setConditionTooltipStyle] = useState<CSSProperties>({});
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedSizeRange, setSelectedSizeRange] = useState<'mens' | 'womens' | null>(null);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const sizeSelectorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (product?.meta) {
      if (product.meta.has_mens_sizes) {
        setSelectedSizeRange('mens');
      } else if (product.meta.has_womens_sizes) {
        setSelectedSizeRange('womens');
      } else if (product.meta.hasSizes) {
        setSelectedSizeRange('mens');
      }
    }
  }, [product]);

  const faqItems = useMemo(() => {
    const market = getMarket(product?.meta?.targetMarket);
    return [
      { question: "Are these items new or pre-owned?", answer: "We offer both. The exact condition is shown on every listing, so you can quickly tell whether the item is brand new, open box, gently used, or more heavily used before you buy." },
      { question: "Is local pickup available?", answer: "Yes, local pickup is available for eligible items.", linkHref: "/local-pickup", linkLabel: "Read the Local Pickup Guide." },
      { question: "Do products come with a warranty?", answer: "Brand-new items may include a manufacturer warranty. Pre-owned items are covered by our 30-day Yomnoo Guarantee for returns or exchanges unless a listing clearly states otherwise." },
      { question: "Can I return an item if it is not right for me?", answer: "Yes. We offer a 30-day return window. If something feels off, contact us via 24/7 Live Chat or at contact@yomnoo.com and we’ll help you sort it out." },
      { question: "How long does shipping usually take?", answer: market.faqShippingAnswer },
      { question: "Do you offer free shipping?", answer: market.faqFreeShippingAnswer },
      { question: "Are pre-owned electronics tested?", answer: "Yes. Our second-hand electronics go through a multi-point inspection and are expected to be fully functional unless a listing specifically tells you otherwise." },
      { question: "Are the product photos accurate?", answer: "Yes. For used items, we aim to show the actual product you’re buying. For new items, images are either the exact item or a very close representation." },
      { question: "How can I reach support quickly?", answer: "You can reach our support team anytime via Live Chat (Available 24/7) on our website or email contact@yomnoo.com." }
    ];
  }, [product?.meta?.targetMarket]);

  const parsedMensSizes = useMemo(() => {
    const raw = product?.meta?.sizes_mens || product?.meta?.sizes;
    if (!raw) return [];
    return raw.split(',').map((s: string) => s.trim()).filter(Boolean);
  }, [product?.meta?.sizes_mens, product?.meta?.sizes]);

  const parsedWomensSizes = useMemo(() => {
    const raw = product?.meta?.sizes_womens;
    if (!raw) return [];
    return raw.split(',').map((s: string) => s.trim()).filter(Boolean);
  }, [product?.meta?.sizes_womens]);

  const visibleFaqItems = showAllFaqs ? faqItems : faqItems.slice(0, COLLAPSED_FAQ_COUNT);
  const descriptionText = product?.description ?? "";
  const shouldCollapseDescription = descriptionText.length > 360;
  const descriptionPreview = useMemo(() => {
    if (!shouldCollapseDescription) {
      return descriptionText;
    }

    const preview = descriptionText.slice(0, 360).trimEnd();
    return `${preview}${preview.endsWith(".") ? "" : "…"}`;
  }, [descriptionText, shouldCollapseDescription]);

  // Generate a realistic activity profile that is stable for each product/day.
  useEffect(() => {
    if (!product || typeof window === 'undefined') return;

    setProductActivity(getProductActivity(product.slug));
  }, [product]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import scroll utils dynamically to avoid SSR issues
    const { lockScroll, unlockScroll } = require('@/utils/scrollUtils');

    if (showZoom) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => {
      unlockScroll();
    };
  }, [showZoom]);

  useEffect(() => {
    setShowFullDescription(false);
  }, [product?.slug]);

  useEffect(() => {
    if (!isConditionTooltipVisible || !conditionTriggerRef.current || typeof window === 'undefined') return;

    const tooltipWidth = 288;
    const gap = 12;
    const rect = conditionTriggerRef.current.getBoundingClientRect();
    const isDesktop = window.innerWidth >= 768;

    if (isDesktop) {
      setConditionTooltipStyle({
        position: 'fixed',
        top: rect.top + rect.height / 2,
        left: Math.min(rect.right + gap, window.innerWidth - tooltipWidth - 16),
        transform: 'translateY(-50%)',
      });
      return;
    }

    setConditionTooltipStyle({
      position: 'fixed',
      top: rect.bottom + gap,
      left: Math.max(16, rect.left),
      width: `min(${tooltipWidth}px, calc(100vw - 32px))`,
    });
  }, [isConditionTooltipVisible]);

  // Must live before any early returns — React Hooks rules
  const productImages = product?.images;
  useEffect(() => {
    setImgLoaded(false);
  }, [activeImage, productImages]);

  // Meta Pixel ViewContent Event
  useEffect(() => {
    if (product) {
      trackPixelEvent('ViewContent', {
        content_name: product.title,
        content_ids: [product.slug],
        content_type: 'product',
        value: product.price,
        currency: product.currency || 'USD'
      });
    }
  }, [product]);

  const handleAddToCart = async () => {
    debugLog('handleAddToCart', 'Function called', 'log');

    if (!product) {
      debugError('handleAddToCart: product is null', new Error('Cannot add to cart: product is null'));
      setIsAddingToCart(false);
      return;
    }

    // Check if product is sold out
    if (product.inStock === false) {
      alert('This product is currently sold out.');
      return;
    }

    const hasSizesEnabled = !!(product.meta?.has_mens_sizes || product.meta?.has_womens_sizes || product.meta?.hasSizes);

    // Validate size selection if enabled
    if (hasSizesEnabled && !selectedSize) {
      setSizeError(true);
      if (sizeSelectorRef.current) {
        sizeSelectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setIsAddingToCart(false);
      return;
    }

    debugLog('handleAddToCart', { productId: product.id, productSlug: product.slug, selectedSize, selectedSizeRange }, 'log');
    setIsAddingToCart(true);

    try {
      if (typeof window === 'undefined') {
        throw new Error('Window is not available');
      }

      debugLog('handleAddToCart', 'Calling addToCart...', 'log');

      let sizeValue = selectedSize;
      if (selectedSize) {
        if (product.meta?.has_mens_sizes && product.meta?.has_womens_sizes) {
          sizeValue = `${selectedSize} (${selectedSizeRange === 'mens' ? "Men's" : "Women's"})`;
        } else if (product.meta?.has_mens_sizes || product.meta?.hasSizes) {
          sizeValue = `${selectedSize} (Men's)`;
        } else if (product.meta?.has_womens_sizes) {
          sizeValue = `${selectedSize} (Women's)`;
        }
      }

      // Add to cart - this is client-side only (localStorage)
      addToCart({
        ...product,
        selectedSize: sizeValue || undefined
      } as any);

      // Meta Pixel AddToCart Event
      trackPixelEvent('AddToCart', {
        content_name: product.title,
        content_ids: [product.slug],
        content_type: 'product',
        value: product.price,
        currency: product.currency || 'USD'
      });

      debugLog('handleAddToCart', 'addToCart completed, navigating to /checkout now...', 'log');

      // Navigate immediately after cart is updated — do NOT wait for any async
      // side-effects (Telegram, fingerprinting) before sending the user to checkout.
      debugNavigation('handleAddToCart', 'Attempting navigation to /checkout');
      if (typeof window !== 'undefined') {
        try {
          debugLog('handleAddToCart', 'Using router.push', 'log');
          router.push('/checkout');
          debugLog('handleAddToCart', 'router.push called successfully', 'log');

          setTimeout(() => {
            try {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (scrollError) {
              debugError('handleAddToCart: scroll failed', scrollError);
            }
          }, 50);
        } catch (navError) {
          debugError('handleAddToCart: router.push failed', navError);
          try {
            debugLog('handleAddToCart', 'Using window.location.href as fallback', 'warn');
            window.location.href = '/checkout';
          } catch (fallbackError) {
            debugError('handleAddToCart: fallback navigation failed', fallbackError);
            setIsAddingToCart(false);
            alert('Failed to navigate to checkout. Please try again.');
            return;
          }
        }
      }

      // Send Telegram notification for "Add to Cart" action
      // (runs after navigation is already in progress — component stays mounted
      //  during client-side navigation so this still executes and completes)
      try {
        const { sendTelegramNotification } = await import('@/utils/telegram-notify');
        await sendTelegramNotification({
          url: window.location.href,
          productTitle: product.title,
          productSlug: product.slug,
          productPrice: product.price,
          action: 'add_to_cart',
        });
      } catch (notifyError) {
        // Don't break the flow if notification fails
        console.warn('Failed to send add to cart notification:', notifyError);
      }

      debugLog('handleAddToCart', 'SUCCESS - Navigation completed', 'log');
    } catch (error) {
      debugError('handleAddToCart: CRITICAL ERROR', error);
      setIsAddingToCart(false);
      alert('Failed to add product to cart. Please check the console for details.');
      throw error; // Re-throw for better error tracking
    }
  };

  const handleBuyNow = async () => {
    if (!product) {
      console.error('Cannot proceed to checkout: product is null');
      return;
    }

    // Check if product is sold out
    if (product.inStock === false) {
      alert('This product is currently sold out.');
      return;
    }

    const hasSizesEnabled = !!(product.meta?.has_mens_sizes || product.meta?.has_womens_sizes || product.meta?.hasSizes);

    // Validate size selection if enabled
    if (hasSizesEnabled && !selectedSize) {
      setSizeError(true);
      if (sizeSelectorRef.current) {
        sizeSelectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setIsBuyingNow(false);
      return;
    }

    setIsBuyingNow(true);

    // Use a small delay to ensure the UI updates
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      if (typeof window === 'undefined') {
        throw new Error('Window is not available');
      }

      let sizeValue = selectedSize;
      if (selectedSize) {
        if (product.meta?.has_mens_sizes && product.meta?.has_womens_sizes) {
          sizeValue = `${selectedSize} (${selectedSizeRange === 'mens' ? "Men's" : "Women's"})`;
        } else if (product.meta?.has_mens_sizes || product.meta?.hasSizes) {
          sizeValue = `${selectedSize} (Men's)`;
        } else if (product.meta?.has_womens_sizes) {
          sizeValue = `${selectedSize} (Women's)`;
        }
      }

      addToCart({
        ...product,
        selectedSize: sizeValue || undefined
      } as any);

      // Meta Pixel AddToCart Event
      trackPixelEvent('AddToCart', {
        content_name: product.title,
        content_ids: [product.slug],
        content_type: 'product',
        value: product.price,
        currency: product.currency || 'USD'
      });

      // Redirect to checkout after adding to cart
      setTimeout(() => {
        preventScrollOnClick(() => {
          goToCheckout();
        }, true);
      }, 200);
    } catch (error) {
      console.error('Error in buy now:', error);
      setIsBuyingNow(false);
      alert('Failed to proceed to checkout. Please try again.');
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.5, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  const resetZoom = () => setZoomLevel(1);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distanceX = touchStart.x - touchEnd.x;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(touchStart.y - touchEnd.y) && Math.abs(distanceX) > 50;
    if (isHorizontalSwipe) {
      setActiveImage(prev => (distanceX > 0 ? (prev < product!.images.length - 1 ? prev + 1 : 0) : (prev > 0 ? prev - 1 : product!.images.length - 1)));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleImageClick = (index: number) => {
    setActiveImage(index);
    setShowZoom(true);
    setZoomLevel(1);
  };

  const goToCheckout = () => {
    try {
      router.push('/checkout');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error navigating to checkout:', error);
      // Fallback navigation
      if (typeof window !== 'undefined') {
        window.location.href = '/checkout';
      }
    }
  };

  const handleShare = async () => {
    if (!product) return;

    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = {
      title: product.title,
      text: product.description.substring(0, 200),
      url: url,
    };

    try {
      // Try native share API if available (mobile)
      if (navigator.share && typeof navigator.share === 'function') {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(url);
        alert('Product link copied to clipboard!');
      }
    } catch (error: any) {
      // User cancelled or error occurred
      if (error.name !== 'AbortError') {
        // Fallback: Copy to clipboard
        try {
          await navigator.clipboard.writeText(url);
          alert('Product link copied to clipboard!');
        } catch (clipboardError) {
          console.error('Error sharing:', clipboardError);
          alert('Failed to share. Please copy the URL manually.');
        }
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-[#262626] mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/"
            className="inline-block bg-[#451e84] hover:bg-[#361668] text-[#F8FAFC] px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const { slug, title, description, price, original_price, images, condition, reviews } = product || {};

  // Safety checks
  if (!slug || !title || !images || images.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-[#262626] mb-4">Invalid Product Data</h1>
          <p className="text-gray-600 mb-8">The product information is incomplete.</p>
          <Link
            href="/"
            className="inline-block bg-[#451e84] hover:bg-[#361668] text-[#F8FAFC] px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <main className="flex-grow bg-gray-100 pt-4 pb-24 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start">
            <div className="relative lg:sticky lg:top-0 lg:self-start">
              <div onClick={() => handleImageClick(activeImage)} className="cursor-zoom-in relative group aspect-[4/3] w-full">
                {images && images.length > 0 && images[activeImage] ? (
                  <>
                    {!imgLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-md z-10">
                        <div className="h-16 w-16 bg-gray-300 rounded-full" />
                      </div>
                    )}
                    <Image
                      key={images[activeImage]}
                      src={images[activeImage]}
                      alt={`${title || 'Product'} - Image ${activeImage + 1}`}
                      fill
                      priority
                      quality={PRODUCT_IMAGE_QUALITY}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`object-cover rounded-md transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onError={(e) => {
                        console.error('Image failed to load:', images[activeImage]);
                        (e.target as HTMLImageElement).src = '/placeholder.png';
                      }}
                      onLoadingComplete={() => setImgLoaded(true)}
                    />
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-md flex items-center justify-center">
                  <ZoomIn className="h-12 w-12 text-white opacity-0 group-hover:opacity-75 transition-opacity" />
                </div>
              </div>
              {images && images.length > 1 && (
                <div className="mt-4 flex justify-center space-x-2 overflow-x-auto py-2">
                  {images.map((image, idx) => (
                    image ? (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${activeImage === idx ? 'ring-2 ring-[#451e84]' : 'ring-1 ring-gray-200'}`}
                      >
                        <Image
                          src={image}
                          alt={`${title || 'Product'} thumbnail ${idx + 1}`}
                          fill
                          quality={90}
                          sizes="80px"
                          className="object-cover"
                          onError={(e) => {
                            console.error('Thumbnail failed to load:', image);
                            (e.target as HTMLImageElement).src = '/placeholder.png';
                          }}
                        />
                        {activeImage === idx && <div className="absolute inset-0 bg-white/10"></div>}
                      </button>
                    ) : null
                  ))}
                </div>
              )}
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-[#451e84] hover:text-[#F8FAFC] p-2 rounded-full transition-all duration-300 z-10">
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button onClick={() => setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))} className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-[#451e84] hover:text-[#F8FAFC] p-2 rounded-full transition-all duration-300 z-10">
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            <div className="lg:pr-4">
              <h1 className="text-3xl font-medium text-[#262626] mb-1">{title}</h1>
              <SellerBadge sellerId={product?.sellerId} size="md" />
              {condition && (
                <div className="mt-3 w-fit max-w-full">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Condition
                  </p>
                  <div
                    ref={conditionTriggerRef}
                    className="group relative inline-flex max-w-full flex-col"
                    tabIndex={0}
                    onMouseEnter={() => setIsConditionTooltipVisible(true)}
                    onMouseLeave={() => setIsConditionTooltipVisible(false)}
                    onFocus={() => setIsConditionTooltipVisible(true)}
                    onBlur={() => setIsConditionTooltipVisible(false)}
                    onClick={() => setIsConditionTooltipVisible((current) => !current)}
                  >
                    <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors group-hover:border-[#003087]/30 group-hover:bg-[#003087]/5 group-focus-within:border-[#003087]/30 group-focus-within:bg-[#003087]/5">
                      {/* Hidden machine-readable condition for Google crawler — must match JSON-LD & XML feed */}
                      <meta itemProp="itemCondition" content={`https://schema.org/${{ new: 'NewCondition', refurbished: 'RefurbishedCondition', used: 'UsedCondition' }[mapConditionToGmc(condition)]}`} />
                      <span className="truncate">{getConditionDisplayLabel(condition)}</span>
                      <Info className="h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-[#003087] group-focus-within:text-[#003087]" />
                    </div>
                    {getConditionTooltip(condition) && isConditionTooltipVisible && (
                      <div
                        className="pointer-events-none z-[70] w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-[#451e84]/10 bg-[#451e84] px-3 py-2 text-xs leading-5 text-[#F8FAFC] shadow-xl"
                        style={conditionTooltipStyle}
                      >
                        {getConditionTooltip(condition)}
                        <div className="absolute bottom-full left-5 border-4 border-transparent border-b-[#171717] md:bottom-auto md:left-[-8px] md:right-auto md:top-1/2 md:-translate-y-1/2 md:border-b-transparent md:border-r-[#171717] md:border-l-transparent"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {product && product.inStock === false && product.checkoutLink === '#' && (
                <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-xl py-3 px-4">
                  <p className="text-sm text-amber-800 font-medium">
                    ⚠️ This offer has expired and the product is no longer available for purchase.
                  </p>
                </div>
              )}
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-4xl font-bold text-[#262626]">
                  {formatMarketPrice(price, getMarket(product?.meta?.targetMarket))}
                </span>
                {original_price && original_price > price && (
                  <>
                    <span className="text-xl text-gray-400 line-through font-medium">
                      {formatMarketPrice(original_price, getMarket(product?.meta?.targetMarket))}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                      {Math.round((1 - price / original_price) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              <ClientOnly>
                {productActivity && (
                  <div className="mt-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs text-[#171717]/60 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <strong className="font-semibold text-[#171717]/80">{productActivity.views}</strong>{' '}
                      {productActivity.views === 1 ? 'view' : 'views'}
                    </span>
                    <span className="text-[#171717]/25" aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShoppingCart className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <strong className="font-semibold text-[#171717]/80">{productActivity.cartAdds}</strong>{' '}
                      {productActivity.cartAdds === 1 ? 'cart add' : 'cart adds'}
                    </span>
                    <span className="text-[#171717]/25" aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                      Active in the last 24h
                    </span>
                  </div>
                )}
              </ClientOnly>

              {/* Size Selector Section */}
              {!!(product?.meta?.has_mens_sizes || product?.meta?.has_womens_sizes || product?.meta?.hasSizes) && (
                <div ref={sizeSelectorRef} className="mt-6 border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold text-[#262626] uppercase tracking-wide flex items-center gap-1.5">
                      <Ruler className="h-4 w-4 text-gray-500" /> Select Size <span className="text-red-500 font-bold">*</span>
                    </label>
                  </div>

                  {/* Sizing Tab Selector */}
                  {!!(product?.meta?.has_mens_sizes && product?.meta?.has_womens_sizes) && (
                    <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSizeRange('mens');
                          setSelectedSize('');
                          setSizeError(false);
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
                          selectedSizeRange === 'mens' ? 'bg-[#451e84] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Men&apos;s Sizing
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSizeRange('womens');
                          setSelectedSize('');
                          setSizeError(false);
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
                          selectedSizeRange === 'womens' ? 'bg-[#451e84] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Women&apos;s Sizing
                      </button>
                    </div>
                  )}

                  {/* Sizing Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {(selectedSizeRange === 'womens' ? parsedWomensSizes : parsedMensSizes).map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={`py-3 px-2 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                          selectedSize === size
                            ? 'bg-[#451e84] border-[#451e84] text-white shadow-md transform scale-[1.02]'
                            : sizeError
                            ? 'bg-red-50 border-red-200 text-red-700 hover:border-red-300'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Sticky Buttons */}
              <div className="lg:mt-8 lg:space-y-3 fixed bottom-0 left-0 right-0 z-50 lg:relative lg:z-auto bg-white border-t border-gray-200 lg:border-0 lg:bg-transparent px-3 py-2.5 lg:px-0 lg:py-0 shadow-[0_-4px_18px_rgba(9,10,40,0.08)] lg:shadow-none lg:space-y-3 space-y-2">
                {product && product.inStock === false ? (
                  /* Sold Out / Offer Expired Message */
                  <div className="w-full bg-gray-100 rounded-lg py-3 px-4 text-center">
                    <p className="text-sm text-gray-600">
                      {product.checkoutLink === '#'
                        ? 'Sorry, this offer has expired'
                        : 'Sorry, this product is sold out'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 lg:flex-col lg:gap-3">
                      {/* Share Button - Mobile Only */}
                      <button
                        onClick={handleShare}
                        className="lg:hidden flex h-12 w-12 flex-shrink-0 touch-manipulation items-center justify-center rounded-xl border border-[#451e84]/10 bg-[#F4F5F7] text-[#171717] transition-all duration-150 hover:bg-[#EAECF0] active:scale-95 active:bg-[#E3E5EA]"
                        aria-label="Share product"
                      >
                        <Share2 className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                      </button>
                      <button onClick={handleAddToCart} disabled={isAddingToCart || isBuyingNow} className="flex h-12 flex-1 touch-manipulation items-center justify-center rounded-xl bg-[#451e84] px-6 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#361668] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 lg:h-auto lg:w-full lg:py-4 lg:text-base">
                        {isAddingToCart ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Adding to Cart...</> : <><ShoppingCart className="h-5 w-5 mr-2" />Add to Cart</>}
                      </button>
                    </div>
                    {(product.checkoutFlow === 'paypal-invoice' || product.checkoutFlow === 'paypal-unclaimed' || product.checkoutFlow === 'paypal-direct' || product.checkoutFlow === 'paypal-api') ? (
                      <div className="hidden lg:flex flex-col gap-1.5">
                        <button
                          onClick={handleBuyNow}
                          disabled={isAddingToCart || isBuyingNow}
                          className="w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-95 active:scale-[0.98]"
                          style={{ backgroundColor: '#EFC154' }}
                          aria-label="Checkout with PayPal"
                        >
                          {isBuyingNow ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#003087]" />
                          ) : (
                            <Image
                              src="/PayPal-checkout.png"
                              alt="PayPal Checkout"
                              width={150}
                              height={24}
                              className="h-6 w-auto object-contain"
                            />
                          )}
                        </button>
                        <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium tracking-wide">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          {(product.checkoutFlow === 'paypal-invoice' || product.checkoutFlow === 'paypal-unclaimed')
                            ? "Secure & protected — you'll receive a PayPal invoice by email to complete payment"
                            : 'Secure & protected — pay instantly with your PayPal account'
                          }
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={handleBuyNow}
                        disabled={isAddingToCart || isBuyingNow}
                        className="hidden lg:flex w-full bg-transparent border-2 border-[#451e84] hover:border-[#361668] text-[#451e84] hover:text-[#361668] hover:bg-[#451e84]/5 py-4 px-6 rounded-xl font-semibold transition-colors duration-200 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isBuyingNow ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#451e84] mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="h-5 w-5 mr-2" />
                            Buy Now
                          </>
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="mt-8">
                <ClientOnly><ShippingInfo targetMarket={product?.meta?.targetMarket} /></ClientOnly>
              </div>
              <div className="mt-8 lg:hidden">
                <h2 className="text-xl font-medium text-[#262626] mb-4">Item Description from the Seller</h2>
                <div className="rounded-[20px] border border-[#F3F4F6] bg-white px-5 py-5">
                  <p className="whitespace-pre-line text-sm leading-7 text-[#5B6785]">
                    {showFullDescription ? descriptionText : descriptionPreview}
                  </p>
                  {shouldCollapseDescription && (
                    <button
                      type="button"
                      onClick={() => setShowFullDescription((current) => !current)}
                      className="mt-4 text-sm font-semibold text-[#171717] transition hover:text-[#171717]"
                    >
                      {showFullDescription ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 hidden lg:block">
            <section className="rounded-[24px] border border-[#E5E7EB] bg-white px-8 py-8">
              <h2 className="text-2xl font-semibold text-[#262626]">Item Description from the Seller</h2>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-[#5B6785]">
                {showFullDescription ? descriptionText : descriptionPreview}
              </p>
              {shouldCollapseDescription && (
                <button
                  type="button"
                  onClick={() => setShowFullDescription((current) => !current)}
                  className="mt-5 text-sm font-semibold text-[#171717] transition hover:text-[#171717]"
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              )}
            </section>
          </div>

          {/* FAQ Section - Full Width */}
          <div className="mt-16 w-full">
            <section className="rounded-[24px] border border-[#E5E7EB] bg-white">
              <div className="border-b border-[#F3F4F6] px-6 py-6 sm:px-8">
                <h2 className="text-2xl font-semibold text-[#262626]">Frequently Asked Questions</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5B6785]">
                  Quick answers to the things shoppers usually want to know before placing an order.
                </p>
              </div>

              <div className="px-6 py-2 sm:px-8">
                {visibleFaqItems.map((item, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <div
                      key={item.question}
                      className={`border-b border-[#F3F4F6] py-5 last:border-b-0 ${isOpen ? "" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                        className="flex w-full items-start justify-between gap-4 text-left"
                      >
                        <div className="pr-2">
                          <h3 className="text-base font-medium text-[#262626] sm:text-lg">{item.question}</h3>
                          {!isOpen && (
                            <p className="mt-2 line-clamp-1 text-sm text-[#6B7280]">
                              {item.answer}
                            </p>
                          )}
                        </div>
                        <span className="mt-0.5 flex-shrink-0 text-[#171717]" aria-hidden="true">
                          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="pt-3 text-sm leading-7 text-[#5B6785]">
                          <p>{item.answer}</p>
                          {item.linkHref && item.linkLabel && (
                            <Link
                              href={item.linkHref}
                              className="mt-2 inline-flex text-sm font-semibold text-[#171717] transition hover:text-[#171717]"
                            >
                              {item.linkLabel}
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {faqItems.length > 4 && (
                <div className="border-t border-[#F3F4F6] px-6 py-5 sm:px-8">
                  <button
                    type="button"
                      onClick={() => {
                        setShowAllFaqs((current) => !current);
                        if (showAllFaqs && openFaqIndex >= COLLAPSED_FAQ_COUNT) {
                          setOpenFaqIndex(-1);
                        }
                      }}
                    className="text-sm font-semibold text-[#171717] transition hover:text-[#171717]"
                  >
                    {showAllFaqs ? "Show fewer answers" : "View more answers"}
                  </button>
                </div>
              )}
            </section>
          </div>

          <div className="mt-8">
            <SameDayShipping fullWidth={true} contained={true} />
          </div>
          {reviews && reviews.length > 0 && (
            <div className="mt-16">
              <ProductReviews
                reviews={reviews}
                averageRating={product.rating}
                totalReviews={product.reviewCount}
                sellerName={(product.meta as any)?._sellerName}
                sellerUsername={(product.meta as any)?._sellerUsername}
              />
            </div>
          )}
          <RecommendedProducts currentProductSlug={slug} />
        </div>
      </main>

      {showZoom && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50" onClick={() => setShowZoom(false)}>
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); handleZoomOut(); }} className="p-2 text-white hover:text-[#F8FAFC] transition-colors duration-200" aria-label="Zoom out"><span className="text-2xl">−</span></button>
            <button onClick={(e) => { e.stopPropagation(); handleZoomIn(); }} className="p-2 text-white hover:text-[#F8FAFC] transition-colors duration-200" aria-label="Zoom in"><span className="text-2xl">+</span></button>
            <button onClick={(e) => { e.stopPropagation(); resetZoom(); }} className="p-2 text-white hover:text-[#F8FAFC] transition-colors duration-200" aria-label="Reset zoom"><span className="text-lg">⟲</span></button>
            <button onClick={(e) => { e.stopPropagation(); setShowZoom(false); }} className="p-2 text-white hover:text-[#F8FAFC] transition-colors duration-200" aria-label="Close zoom view"><X className="h-8 w-8" /></button>
          </div>
          <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className="relative w-full h-full">
              <Image
                key={`zoom-${images[activeImage]}`}
                src={images[activeImage]}
                alt={`${title} - Image ${activeImage + 1}`}
                fill
                priority
                quality={100}
                unoptimized={true}
                sizes="100vw"
                className="object-contain transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
                onClick={(e) => e.stopPropagation()}
              />
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1)); setZoomLevel(1); }} className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-white/10 hover:bg-[#451e84] p-3 rounded-full text-white transition-colors duration-200" aria-label="Previous image"><ChevronLeft className="h-8 w-8" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0)); setZoomLevel(1); }} className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-white/10 hover:bg-[#451e84] p-3 rounded-full text-white transition-colors duration-200" aria-label="Next image"><ChevronRight className="h-8 w-8" /></button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
