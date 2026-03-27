import { NextResponse } from 'next/server';
import { API_URLS } from '@/lib/constants';
import { fetchWithFileCache } from '@/lib/fileCache';

export async function GET() {
  try {
    const data = await fetchWithFileCache('all-sets', async () => {
      const res = await fetch(`${API_URLS.TCGDEX}/sets`, { cache: 'no-store' });
      if (!res.ok) throw new Error('API fetch failed');
      const allSets = await res.json();
      
      return allSets.sort((a: any, b: any) => {
        if (a.releaseDate && b.releaseDate) return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        return b.id.localeCompare(a.id);
      });
    });

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
