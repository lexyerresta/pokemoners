import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), 'data', 'cache');

/**
 * Super simple file-based JSON cache for Server-side only
 * (Useful for API proxy routes to avoid external API hits)
 */
export async function getFileCache<T>(key: string, maxAgeMs = 3600000 * 24): Promise<T | null> {
  const filePath = path.join(CACHE_DIR, `${key.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`);
  
  try {
    if (!fs.existsSync(filePath)) return null;
    
    const stats = fs.statSync(filePath);
    const age = Date.now() - stats.mtime.getTime();
    
    if (age > maxAgeMs) {
      console.log(`[Cache] Stale: ${key} (${Math.round(age / 1000)}s old)`);
      return null;
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`[Cache] Read error: ${key}`, err);
    return null;
  }
}

export async function setFileCache(key: string, data: any): Promise<void> {
  const filePath = path.join(CACHE_DIR, `${key.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`);
  
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`[Cache] Saved: ${key}`);
  } catch (err) {
    console.error(`[Cache] Write error: ${key}`, err);
  }
}

/**
 * Wrapper for easy use in API routes
 */
export async function fetchWithFileCache<T>(
  key: string, 
  fetcher: () => Promise<T>, 
  maxAgeMs = 3600000 * 24
): Promise<T> {
  const cached = await getFileCache<T>(key, maxAgeMs);
  if (cached) return cached;
  
  const data = await fetcher();
  await setFileCache(key, data);
  return data;
}
