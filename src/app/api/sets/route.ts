import { NextResponse } from 'next/server';
import { API_URLS } from '@/lib/constants';

export async function GET() {
  try {
    const res = await fetch(`${API_URLS.TCGDEX}/sets`, { cache: 'force-cache' });
    if (!res.ok) throw new Error('API fetch failed');
    const allSets = await res.json();
    
    const sortedSets = allSets.sort((a: any, b: any) => {
      if (a.releaseDate && b.releaseDate) return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      return b.id.localeCompare(a.id);
    });

    return NextResponse.json(sortedSets);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
