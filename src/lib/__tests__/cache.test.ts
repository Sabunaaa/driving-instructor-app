import { CacheManager } from '@/lib/cache';

describe('CacheManager', () => {
  let cache: CacheManager;

  beforeEach(() => {
    cache = new CacheManager(10);
  });

  it('should store and retrieve values', () => {
    const data = { id: 1, name: 'Test' };
    cache.set('test-key', data, 5000);

    const retrieved = cache.get('test-key');
    expect(retrieved).toEqual(data);
  });

  it('should return null for non-existent keys', () => {
    const retrieved = cache.get('non-existent');
    expect(retrieved).toBeNull();
  });

  it('should check if key exists', () => {
    cache.set('test-key', { data: 'value' }, 5000);
    expect(cache.has('test-key')).toBe(true);
    expect(cache.has('non-existent')).toBe(false);
  });

  it('should delete cache entries', () => {
    cache.set('test-key', { data: 'value' }, 5000);
    expect(cache.has('test-key')).toBe(true);

    cache.delete('test-key');
    expect(cache.has('test-key')).toBe(false);
  });

  it('should clear all cache entries', () => {
    cache.set('key1', { data: 'value1' }, 5000);
    cache.set('key2', { data: 'value2' }, 5000);

    cache.clear();
    expect(cache.get('key1')).toBeNull();
    expect(cache.get('key2')).toBeNull();
  });

  it('should track cache statistics', () => {
    cache.set('test-key', { data: 'value' }, 5000);

    // Cache hit
    cache.get('test-key');
    let stats = cache.getStats();
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(0);

    // Cache miss
    cache.get('non-existent');
    stats = cache.getStats();
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(1);
  });

  it('should enforce max size limit', () => {
    const smallCache = new CacheManager(2);

    smallCache.set('key1', { data: 'value1' }, 5000);
    smallCache.set('key2', { data: 'value2' }, 5000);
    smallCache.set('key3', { data: 'value3' }, 5000);

    // key1 should be removed to make space for key3
    expect(smallCache.has('key1')).toBe(false);
    expect(smallCache.has('key2')).toBe(true);
    expect(smallCache.has('key3')).toBe(true);
  });

  it('should calculate hit rate', () => {
    cache.set('test-key', { data: 'value' }, 5000);

    cache.get('test-key'); // hit
    cache.get('test-key'); // hit
    cache.get('non-existent'); // miss

    const stats = cache.getStats();
    expect(stats.hits).toBe(2);
    expect(stats.misses).toBe(1);
    expect(stats.hitRate).toBeCloseTo(66.67, 1);
  });
});
