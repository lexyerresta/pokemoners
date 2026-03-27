import { NextResponse } from 'next/server';

const TCGDEX_URL = 'https://api.tcgdex.net/v2/en';

export async function GET(request: Request) {
  try {
    const res = await fetch(`${TCGDEX_URL}/sets`, { cache: 'force-cache' });
    if (!res.ok) throw new Error('API fetch failed');
    const allSets = await res.json();
    
    // Sort sets descending (newest usually have higher IDs or release dates, but TCGdex sets have releaseDate)
    const sortedSets = allSets.sort((a: any, b: any) => {
      // Sometimes releaseDate is missing, fallback to string compare
      if (a.releaseDate && b.releaseDate) return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      return b.id.localeCompare(a.id);
    });

    return NextResponse.json(sortedSets);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
