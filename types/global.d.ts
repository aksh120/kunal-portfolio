import type Lenis from 'lenis';

declare global {
  interface Window {
    lenis?: Lenis;
    __probeCache?: Map<string, boolean>;
    __galleryLookup?: Map<string, string[]>;
  }

  // Global maps used for image probe caching and discovered gallery lists
  // These live on globalThis so both server and client can type-check accesses
  var __probeCache: Map<string, boolean> | undefined;
  var __galleryLookup: Map<string, string[]> | undefined;
}

export {};
