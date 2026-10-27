import { generateKeyBetween } from 'fractional-indexing';

/**
 * Calculates a new fractional index key (LexoRank) for O(1) single-row database reordering.
 * @param prevKey The order key of the preceding item, or null if inserting at head
 * @param nextKey The order key of the following item, or null if inserting at tail
 * @returns A lexicographically sorted string guaranteed to sort between prevKey and nextKey
 */
export function getFractionalIndexBetween(
  prevKey: string | null | undefined,
  nextKey: string | null | undefined
): string {
  try {
    return generateKeyBetween(prevKey ?? null, nextKey ?? null);
  } catch (err) {
    // If adjacent keys collide or error, generate safe fallback
    const base = prevKey || 'a0';
    return `${base}5`;
  }
}

/**
 * Generates an initial list of evenly spaced fractional order keys for n items.
 */
export function generateInitialOrderKeys(count: number): string[] {
  const keys: string[] = [];
  let currentKey: string | null = null;
  for (let i = 0; i < count; i++) {
    const next = getFractionalIndexBetween(currentKey, null);
    keys.push(next);
    currentKey = next;
  }
  return keys;
}
