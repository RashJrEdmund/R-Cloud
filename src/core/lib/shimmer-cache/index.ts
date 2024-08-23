import { CLIENT_STORAGE } from "../client-storage";

interface UpdateOptions {
  /** Weather or not to update the shimmer cache if files in document have changed  */
  update?: boolean;
}

class ShimmerCache {
  /** key in session storage */
  private cacheKey = "shimmer_cache";
  private defaultFolderVal = 16;
  private sessionStorage: CLIENT_STORAGE;
  private cache: () => Record<string, number>;

  constructor() {
    this.sessionStorage = new CLIENT_STORAGE("session");

    this.cache = () => {
      const cache = this.sessionStorage.get<Record<string, number>>(this.cacheKey, { isString: false });

      if (!cache || typeof cache !== "object" || Array.isArray(cache)) return {}; // "if statement" is checking if line 14 returns an object

      return cache;
    };
  };

  get cacheVal() {
    return this.cache();
  }

  getFolderCache(folder_id: string) {
    return this.cache()[folder_id] || this.defaultFolderVal;
  };

  updateShimmerCache(folder_id: string, folder_length: number, options?: UpdateOptions) {
    const shimmerCache = { ...this.cache() };

    if (!shimmerCache[folder_id] || options?.update) {
      shimmerCache[folder_id] = folder_length || this.defaultFolderVal;

      this.sessionStorage.save(this.cacheKey, shimmerCache);
    }
  }

  clearCache() {
    return this.sessionStorage.remove(this.cacheKey);
  }
};

export { ShimmerCache };
