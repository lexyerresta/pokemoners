import { NextResponse } from 'next/server';
import { API_URLS } from '@/lib/constants';
import { fetchWithFileCache } from '@/lib/fileCache';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const data = await fetchWithFileCache(`set-detail-${id}`, async () => {
      const res = await fetch(`${API_URLS.TCGDEX}/sets/${id}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('API fetch failed');
      return res.json();
    });
    
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
