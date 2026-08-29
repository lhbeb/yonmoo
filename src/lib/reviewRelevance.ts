import type { Product, Review } from '@/types/product';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'by', 'edition', 'for', 'from', 'in', 'new', 'of', 'on',
  'the', 'to', 'with', 'bundle', 'set', 'pack', 'item', 'product',
]);

// Product families provide a semantic guardrail when store categories are broad
// or inconsistently named. A review from one detected family cannot leak into
// another family merely because both titles contain generic words.
const PRODUCT_FAMILIES: Record<string, string[]> = {
  camera: ['camera', 'dslr', 'mirrorless', 'camcorder', 'powershot', 'cybershot', 'instax', 'gopro'],
  gaming_console: ['gaming console', 'playstation', 'ps5', 'ps4', 'xbox', 'nintendo switch', 'steam deck'],
  graphics_card: ['graphics card', 'gpu', 'geforce', 'radeon', 'rtx', 'gtx'],
  computer: ['desktop computer', 'laptop', 'notebook', 'macbook', 'chromebook', 'workstation'],
  phone: ['smartphone', 'mobile phone', 'iphone', 'galaxy phone', 'pixel phone'],
  tablet: ['tablet', 'ipad', 'galaxy tab', 'surface pro'],
  television: ['television', 'smart tv', 'oled tv', 'qled tv'],
  audio: ['headphone', 'headset', 'earbud', 'speaker', 'soundbar', 'amplifier'],
  bicycle: ['bicycle', 'bike', 'mountain bike', 'road bike', 'ebike', 'e-bike'],
  watch: ['watch', 'smartwatch', 'wristwatch'],
  appliance: ['refrigerator', 'freezer', 'washing machine', 'dryer', 'dishwasher', 'microwave', 'air fryer'],
  tool: ['power tool', 'drill', 'saw', 'sander', 'grinder', 'tool kit'],
};

function normalize(value?: string): string {
  return (value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokens(value?: string): Set<string> {
  return new Set(
    normalize(value)
      .split(' ')
      .filter((token) => token.length > 1 && !STOP_WORDS.has(token)),
  );
}

function detectFamily(...values: Array<string | undefined>): string | null {
  const haystack = ` ${normalize(values.filter(Boolean).join(' '))} `;
  if (!haystack.trim()) return null;

  for (const [family, signals] of Object.entries(PRODUCT_FAMILIES)) {
    if (signals.some((signal) => haystack.includes(` ${normalize(signal)} `))) {
      return family;
    }
  }

  return null;
}

function diceSimilarity(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 || right.size === 0) return 0;
  let intersection = 0;
  for (const token of left) {
    if (right.has(token)) intersection += 1;
  }
  return (2 * intersection) / (left.size + right.size);
}

function modelTokens(value?: string): Set<string> {
  return new Set(
    [...tokens(value)].filter((token) => /\d/.test(token) || /^[a-z]{1,4}\d{1,5}[a-z]*$/.test(token)),
  );
}

export function scoreReviewRelevance(product: Product, review: Review): number {
  const targetSlug = normalize(product.slug);
  const sourceSlug = normalize(review.productSlug);
  if (targetSlug && sourceSlug && targetSlug === sourceSlug) return 1;

  const targetTitle = normalize(product.title);
  const sourceTitle = normalize(review.productTitle);
  if (targetTitle && sourceTitle && targetTitle === sourceTitle) return 0.99;

  // Inherited reviews must carry source-product context. Review prose alone is
  // deliberately not trusted because generic comments create false matches.
  if (!sourceSlug && !sourceTitle && !review.productCategory && !review.productBrand) return 0;

  const targetFamily = detectFamily(product.title, product.category, product.brand);
  const sourceFamily = detectFamily(review.productTitle, review.productCategory, review.productBrand);
  if (targetFamily && sourceFamily && targetFamily !== sourceFamily) return 0;

  const targetCategory = normalize(product.category);
  const sourceCategory = normalize(review.productCategory);
  const categoryMatches = Boolean(targetCategory && sourceCategory && targetCategory === sourceCategory);

  const targetBrand = normalize(product.brand);
  const sourceBrand = normalize(review.productBrand);
  const brandMatches = Boolean(targetBrand && sourceBrand && targetBrand === sourceBrand);

  const titleSimilarity = diceSimilarity(tokens(product.title), tokens(review.productTitle));
  const targetModels = modelTokens(product.title);
  const sourceModels = modelTokens(review.productTitle);
  const modelSimilarity = diceSimilarity(targetModels, sourceModels);
  const familyMatches = Boolean(targetFamily && sourceFamily && targetFamily === sourceFamily);

  // A known category conflict requires strong title/model evidence. This keeps
  // broad seller catalogs from cross-pollinating unrelated product pages.
  if (targetCategory && sourceCategory && !categoryMatches && !familyMatches && titleSimilarity < 0.72) {
    return 0;
  }

  let score = 0;
  if (categoryMatches) score += 0.34;
  if (familyMatches) score += 0.30;
  if (brandMatches) score += 0.14;
  score += titleSimilarity * 0.34;
  score += modelSimilarity * 0.18;

  return Math.min(0.98, score);
}

export function getRelevantReviewsForProduct(product: Product, reviews: Review[]): Review[] {
  return reviews
    .map((review) => ({ review, score: scoreReviewRelevance(product, review) }))
    .filter(({ score }) => score >= 0.45)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return new Date(right.review.date).getTime() - new Date(left.review.date).getTime();
    })
    .map(({ review }) => review);
}
