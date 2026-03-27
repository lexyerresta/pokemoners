import { NextResponse } from 'next/server';

const POKEMON_TCG_URL = 'https://api.pokemontcg.io/v2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q');
  
  if (!search) {
    return NextResponse.json({ error: 'Search query required' }, { status: 400 });
  }

  try {
    const terms = search.trim().split(/\s+/);
    const queryChunks = terms.map(term => {
      const safeTerm = term.replace(/[^a-zA-Z0-9-]/g, ''); // alphanumeric and hyphen safe
      return `(name:"*${safeTerm}*" OR set.name:"*${safeTerm}*" OR set.id:"*${safeTerm}*" OR id:"*${safeTerm}*")`;
    });
    
    const queryString = queryChunks.join(' ');

    const res = await fetch(`${POKEMON_TCG_URL}/cards?q=${encodeURIComponent(queryString)}&pageSize=20`);
    if (!res.ok) throw new Error('Failed to fetch prices');
    const data = await res.json();
    return NextResponse.json(data);
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
