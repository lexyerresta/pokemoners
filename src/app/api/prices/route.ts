import { NextResponse } from 'next/server';
import { API_URLS } from '@/lib/constants';
import { getSearchTerms } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 21; // cards per page
  
  if (!search) {
    return NextResponse.json({ error: 'Search query required' }, { status: 400 });
  }

  try {
    const terms = getSearchTerms(search);
    const queryChunks = terms.map(term => {
      const safeTerm = term.replace(/[^a-zA-Z0-9-]/g, ''); // alphanumeric and hyphen safe
      return `(name:"*${safeTerm}*" OR set.name:"*${safeTerm}*" OR set.id:"*${safeTerm}*" OR id:"*${safeTerm}*")`;
    });
    
    const queryString = queryChunks.join(' ');

    const res = await fetch(`${API_URLS.POKEMON_TCG}/cards?q=${encodeURIComponent(queryString)}&pageSize=${limit}&page=${page}`);
    if (!res.ok) throw new Error('Failed to fetch prices');
    const data = await res.json();
    return NextResponse.json({
      data: data.data,
      total: data.totalCount,
      page: data.page,
      limit: data.pageSize,
    });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
