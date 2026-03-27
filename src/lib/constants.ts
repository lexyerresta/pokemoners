export const API_URLS = {
  TCGDEX: (process.env.NEXT_PUBLIC_TCGDEX_API_URL || 'https://api.tcgdex.net/v2/en').replace(/['"]/g, ''),
  POKEMON_TCG: (process.env.NEXT_PUBLIC_POKEMON_TCG_API_URL || 'https://api.pokemontcg.io/v2').replace(/['"]/g, ''),
};

export const SUPPORT_LINKS = {
  SAWERIA: (process.env.NEXT_PUBLIC_SAWERIA_URL || 'https://saweria.co/lexyerresta').replace(/['"]/g, ''),
  TRAKTEER: (process.env.NEXT_PUBLIC_TRAKTEER_URL || 'https://trakteer.id/lexyerresta').replace(/['"]/g, ''),
};


export const FALLBACK_IMAGES = {
  CARD_BACK: '/card-back.png',
};
