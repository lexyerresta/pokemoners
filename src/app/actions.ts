'use server';

export async function checkPsaCert(certNumber: string) {
  try {
    const res = await fetch(`https://api.psacard.com/publicapi/cert/GetByCertNumber/${certNumber}`, {
      headers: {
        'Accept': 'application/json'
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
        // usually 429 when quota exceeded, or 401 if they now require auth strictly, though the test returned error text
        const errText = await res.text();
        return { error: true, message: errText };
    }

    const data = await res.json();
    return { error: false, data };
  } catch(e: any) {
    return { error: true, message: e.message };
  }
}
