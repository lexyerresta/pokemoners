import { NextResponse } from 'next/server';
import { API_URLS } from '@/lib/constants';
import { getSearchTerms } from '@/lib/utils';
import { fetchWithFileCache } from '@/lib/fileCache';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'list';
  const id = searchParams.get('id');
  const query = searchParams.get('q');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  try {
    if (type === 'list' || type === 'search') {
      const allCards = await fetchWithFileCache('all-cards-list', async () => {
        const res = await fetch(`${API_URLS.TCGDEX}/cards`, { cache: 'no-store' });
        if (!res.ok) throw new Error('API fetch failed');
        return res.json();
      });
      
      let filtered = allCards;
      if (type === 'search' && query) {
        const terms = getSearchTerms(query);
        filtered = allCards.filter((c: any) => {
          return terms.every(term => 
            (c.name && c.name.toLowerCase().includes(term)) || 
            (c.id && c.id.toLowerCase().includes(term))
          );
        }).slice(0, 50);
        return NextResponse.json(filtered);
      }
      
      const start = (page - 1) * limit;
      return NextResponse.json({
        data: filtered.slice(start, start + limit),
        total: filtered.length,
        page,
        limit,
      });
    } else if (type === 'detail') {
      const data = await fetchWithFileCache(`card-detail-${id}`, async () => {
        const res = await fetch(`${API_URLS.TCGDEX}/cards/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('API fetch failed');
        return res.json();
      });
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
