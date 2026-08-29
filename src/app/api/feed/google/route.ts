import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/data';
import { formatValidSku, mapConditionToGmc } from '@/lib/conditions';
import { isGmcFeedEligibleProduct } from '@/lib/gmc';
import { enrichGmcDescription } from '@/lib/gmc-description';

const BASE_URL = 'https://yomnoo.com';
const USD_TO_GBP_RATE = 0.79;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryParam = (searchParams.get('country') || searchParams.get('target') || '').toUpperCase();
    const currencyParam = (searchParams.get('currency') || '').toUpperCase();

    // Determine target country and matching currency
    const isUkTarget = countryParam === 'GB' || countryParam === 'UK' || currencyParam === 'GBP';
    const isUsTarget = countryParam === 'US' || currencyParam === 'USD';

    let products: any[] = [];
    try {
      products = await getAllProducts();
    } catch (e) {
      console.error('Error fetching products for Google feed:', e);
    }

    const itemsXml = products
      .filter(isGmcFeedEligibleProduct)
      .map((p) => {
        const sku = formatValidSku(p);
        const title = escapeXml(p.title || 'Product');
        const description = escapeXml(enrichGmcDescription(p));
        const link = `${BASE_URL}/products/${p.slug}`;
        
        let itemPrice = Number(p.price || 0);
        let itemCurrency = (p.currency || 'USD').toUpperCase();

        if (isUkTarget) {
          // UK Target feed: Force GBP and accurate currency conversion if product was in USD
          if (itemCurrency === 'USD') {
            itemPrice = Math.round(itemPrice * USD_TO_GBP_RATE * 100) / 100;
          }
          itemCurrency = 'GBP';
        } else if (isUsTarget) {
          // US Target feed: Ensure USD
          if (itemCurrency === 'GBP') {
            itemPrice = Math.round((itemPrice / USD_TO_GBP_RATE) * 100) / 100;
          }
          itemCurrency = 'USD';
        }

        const priceStr = `${itemPrice.toFixed(2)} ${itemCurrency}`;
        const availability = p.inStock === false ? 'out_of_stock' : 'in_stock';
        const condition = mapConditionToGmc(p.condition);
        const brand = escapeXml(p.brand || 'Yomnoo');
        const category = escapeXml(p.category || 'General Store');

        let imageLink = '';
        if (p.images && p.images.length > 0) {
          try {
            imageLink = new URL(p.images[0], BASE_URL).toString();
          } catch {
            imageLink = p.images[0];
          }
        }
        imageLink = escapeXml(imageLink);

        const additionalImageTags = Array.isArray(p.images) && p.images.length > 1
          ? p.images.slice(1, 11).map((imgUrl: string) => {
              let fullUrl = imgUrl;
              try { fullUrl = new URL(imgUrl, BASE_URL).toString(); } catch {}
              return `\n      <g:additional_image_link>${escapeXml(fullUrl)}</g:additional_image_link>`;
            }).join('')
          : '';

        const gtin = escapeXml(p.gtin || p.meta?.gtin || p.meta?.upc || p.meta?.ean || p.meta?.barcode || '');
        const mpn = escapeXml(p.mpn || p.meta?.mpn || '');
        const hasIdentifier = Boolean(gtin || mpn);

        const identifierTags = hasIdentifier
          ? `${gtin ? `\n      <g:gtin>${gtin}</g:gtin>` : ''}${mpn ? `\n      <g:mpn>${mpn}</g:mpn>` : ''}\n      <g:identifier_exists>yes</g:identifier_exists>`
          : `\n      <g:identifier_exists>no</g:identifier_exists>`;

        // Target-specific shipping definitions with strictly matching local currency
        let shippingTags = '';
        if (isUkTarget) {
          shippingTags = `
      <g:shipping>
        <g:country>GB</g:country>
        <g:service>Standard Delivery</g:service>
        <g:price>0.00 GBP</g:price>
      </g:shipping>`;
        } else if (isUsTarget) {
          shippingTags = `
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard Shipping</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>`;
        } else {
          // Multi-country / Default combined feed: each destination uses its native currency
          shippingTags = `
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard Shipping</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>GB</g:country>
        <g:service>Standard Delivery</g:service>
        <g:price>0.00 GBP</g:price>
      </g:shipping>`;
        }

        return `
    <item>
      <g:id>${sku}</g:id>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <g:image_link>${imageLink}</g:image_link>${additionalImageTags}
      <g:price>${priceStr}</g:price>
      <g:availability>${availability}</g:availability>
      <g:condition>${condition}</g:condition>
      <g:brand>${brand}</g:brand>
      <g:product_type>${category}</g:product_type>${identifierTags}${shippingTags}
    </item>`;
      })
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Yomnoo Google Merchant Center Feed</title>
    <link>${BASE_URL}</link>
    <description>Product feed for Yomnoo online store</description>
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating GMC feed:', error);
    return new NextResponse('Error generating feed', { status: 500 });
  }
}

