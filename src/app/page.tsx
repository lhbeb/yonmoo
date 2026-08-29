import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import SameDayShipping from '@/components/SameDayShipping';
import HomeFeaturedSection from '@/components/HomeFeaturedSection';
import ProductGrid from '@/components/ProductGrid';
import HomeReviews from '@/components/HomeReviews';
import FashionProducts from '@/components/FashionProducts';
import { getProducts, getFeaturedProducts, getProductsByCollection } from '@/lib/data';
import { homeReviews, homeReviewsStats } from '@/lib/homeReviews';
import ScrollToTop from '@/components/ScrollToTop';

export default async function HomePage() {
  try {
    const [allProducts, featuredFromAdmin, electronicsProducts, fashionProducts] = await Promise.all([
      getProducts(),
      getFeaturedProducts(),
      getProductsByCollection('electronics'),
      getProductsByCollection('fashion'),
    ]);

    const featuredProductsPool = (featuredFromAdmin && featuredFromAdmin.length > 0)
      ? featuredFromAdmin
      : (allProducts || []);

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Hero />

      <HomeFeaturedSection products={featuredProductsPool} />
      
      <SameDayShipping />
      
      <FashionProducts products={fashionProducts} shuffleForVisitor visitorShuffleKey="home-fashion" />
      
      {electronicsProducts.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid 
            products={electronicsProducts} 
            title="Gadgets & Electronics"
            randomizeForVisitor
            visitorShuffleKey="home-electronics"
          />
        </Suspense>
      )}
      
      <HomeReviews
        reviews={homeReviews}
        averageRating={homeReviewsStats.averageRating}
        totalReviews={homeReviewsStats.totalReviews}
      />
    </>
  );
  } catch (error) {
    console.error('Error loading homepage:', error);
    // Return a minimal error page that won't break
    return (
      <>
        <Hero />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#262626] mb-4">Unable to load products</h2>
          <p className="text-gray-600">Please refresh the page or try again later.</p>
        </div>
      </>
    );
  }
}
