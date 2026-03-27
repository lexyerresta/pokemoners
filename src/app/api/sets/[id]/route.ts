import { NextResponse } from 'next/server';

const TCGDEX_URL = 'https://api.tcgdex.net/v2/en';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const res = await fetch(`${TCGDEX_URL}/sets/${id}`, { cache: 'force-cache' });
    if (!res.ok) throw new Error('API fetch failed');
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
