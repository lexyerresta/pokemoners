import { getBaseUrl } from './utils';

export async function getTcgCards(page = 1, limit = 20) {
  const res = await fetch(`${getBaseUrl()}/api/cards?type=list&page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch tcg cards');
  return res.json();
}

export async function getTcgCardDetail(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/cards?type=detail&id=${id}`);
  if (!res.ok) throw new Error('Failed to fetch card detail');
  return res.json();
}

export async function searchTcgCards(query: string, page = 1, limit = 20) {
  const res = await fetch(`${getBaseUrl()}/api/cards?type=search&q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch tcg cards');
  return res.json();
}

export async function getCardPrices(name: string, page = 1) {
  const res = await fetch(`${getBaseUrl()}/api/prices?q=${encodeURIComponent(name)}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch prices');
  return res.json();
}

export async function getTcgSets() {
  const res = await fetch(`${getBaseUrl()}/api/sets`);
  if (!res.ok) throw new Error('Failed to fetch sets');
  return res.json();
}

export async function getTcgSetDetail(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/sets/${id}`);
  if (!res.ok) throw new Error('Failed to fetch set detail');
  return res.json();
}
