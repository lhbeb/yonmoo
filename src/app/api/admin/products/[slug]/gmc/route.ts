import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { jwtVerify } from 'jose';
import { mergeGmcSelection } from '@/lib/gmc';
import { shouldBypassAuth } from '@/lib/supabase/auth';
import { supabaseAdmin } from '@/lib/supabase/server';

async function getAdminAuth(request: NextRequest) {
  if (shouldBypassAuth()) {
    return { authenticated: true, role: 'SUPER_ADMIN', email: 'dev@localhost' };
  }

  const cookieToken = request.cookies.get('admin_token')?.value;
  const authHeader = request.headers.get('authorization');
  const headerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length).trim()
    : undefined;
  const token = cookieToken || headerToken;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    );
    const { payload } = await jwtVerify(token, secret);
    const decoded = payload as {
      email?: string;
      role?: string;
      isActive?: boolean;
    };

    if (!decoded.isActive) return null;

    return {
      authenticated: true,
      role: decoded.role || 'ADMIN',
      email: decoded.email || '',
    };
  } catch (error) {
    console.error('GMC toggle authentication failed:', error);
    return null;
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const auth = await getAdminAuth(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug: rawSlug } = await params;
    const slug = rawSlug.trim();

    const { data: product, error: findError } = await supabaseAdmin
      .from('products')
      .select('slug, meta')
      .eq('slug', slug)
      .maybeSingle();

    if (findError) {
      console.error('Failed to load product for GMC toggle:', findError);
      return NextResponse.json({ error: 'Failed to load product' }, { status: 500 });
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const currentlyEnabled = !(
      product.meta
      && typeof product.meta === 'object'
      && !Array.isArray(product.meta)
      && product.meta.gmc_enabled === false
    );
    const gmcEnabled = !currentlyEnabled;
    const updatedMeta = mergeGmcSelection(product.meta, gmcEnabled);

    const { error: updateError } = await supabaseAdmin
      .from('products')
      .update({
        meta: updatedMeta,
        updated_at: new Date().toISOString(),
      })
      .eq('slug', slug);

    if (updateError) {
      console.error('Failed to update GMC selection:', updateError);
      return NextResponse.json({ error: 'Failed to update GMC selection' }, { status: 500 });
    }

    revalidatePath('/api/feed/google');
    revalidatePath('/feed.xml');

    return NextResponse.json({
      success: true,
      gmcEnabled,
      message: gmcEnabled
        ? 'Product added to Google Merchant Center feed'
        : 'Product removed from Google Merchant Center feed',
    });
  } catch (error) {
    console.error('Unexpected GMC toggle error:', error);
    return NextResponse.json({ error: 'Failed to update GMC selection' }, { status: 500 });
  }
}
