import { NextResponse } from 'next/server';
import { API_URLS } from '@/lib/constants';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const res = await fetch(`${API_URLS.TCGDEX}/sets/${id}`, { cache: 'force-cache' });
    if (!res.ok) throw new Error('API fetch failed');
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
