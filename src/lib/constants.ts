export const API_URLS = {
  TCGDEX: process.env.NEXT_PUBLIC_TCGDEX_API_URL || 'https://api.tcgdex.net/v2/en',
  POKEMON_TCG: process.env.NEXT_PUBLIC_POKEMON_TCG_API_URL || 'https://api.pokemontcg.io/v2',
};

export const SUPPORT_LINKS = {
  SAWERIA: process.env.NEXT_PUBLIC_SAWERIA_URL || 'https://saweria.co/lexyerresta',
  TRAKTEER: process.env.NEXT_PUBLIC_TRAKTEER_URL || 'https://trakteer.id/lexyerresta',
};

export const FALLBACK_IMAGES = {
  CARD_BACK: '/card-back.png',
};
