"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';
import { createVisitorRotationSeed, selectRotatedProducts } from '@/utils/visitorProductRotation';

interface FashionProductsProps {
  products: Product[];
  shuffleForVisitor?: boolean;
  visitorShuffleKey?: string;
}

const FASHION_PRODUCT_COUNT = 8;

const FashionProducts: React.FC<FashionProductsProps> = ({
  products,
  shuffleForVisitor = false,
  visitorShuffleKey = 'home-fashion',
}) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(() =>
    products.slice(0, FASHION_PRODUCT_COUNT),
  );

  useEffect(() => {
    if (!products || products.length === 0) {
      setDisplayedProducts([]);
      return;
    }

    if (!shuffleForVisitor) {
      setDisplayedProducts(products.slice(0, FASHION_PRODUCT_COUNT));
      return;
    }

    const seed = createVisitorRotationSeed(visitorShuffleKey);
    setDisplayedProducts(selectRotatedProducts(products, seed, FASHION_PRODUCT_COUNT));
  }, [products, shuffleForVisitor, visitorShuffleKey]);

  // If no fashion products, don't render the section
  if (!displayedProducts || displayedProducts.length === 0) {
    return null;
  }

  return (
    <section id="fashion" className="py-16 bg-[#ECEEF2]">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-4">
              The Top Shelf Closet
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Top brands. Checked. Ready to wear.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} cardBackground="bg-white" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionProducts;
