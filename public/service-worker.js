const CACHE_NAME = 'instaapp-v1';
const IMAGE_CACHE = 'instaapp-images-v1';
const CACHE_URLS = ['/', '/index.html'];
const IMAGE_PATTERNS = [
  'picsum.photos',
  'i.pravatar.cc',
  'cloudinary.com',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching essential files');
      return cache.addAll(CACHE_URLS).catch((err) => {
        console.log('[Service Worker] Cache addAll error (non-critical):', err);
      });
    }),
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - cache-first strategy for images, network-first for others
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Check if it's an image request
  const isImage = IMAGE_PATTERNS.some((pattern) => url.href.includes(pattern));

  if (isImage) {
    // Cache-first strategy for images
    event.respondWith(
      caches
        .open(IMAGE_CACHE)
        .then((cache) => {
          return cache.match(event.request).then((response) => {
            if (response) {
              console.log('[Service Worker] Image from cache:', url.href);
              return response;
            }

            // Fetch from network if not in cache
            return fetch(event.request)
              .then((networkResponse) => {
                // Only cache successful responses
                if (
                  networkResponse &&
                  networkResponse.status === 200 &&
                  networkResponse.type !== 'error'
                ) {
                  console.log('[Service Worker] Caching image:', url.href);
                  cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
              })
              .catch(() => {
                console.log('[Service Worker] Fetch failed for:', url.href);
                // Return cached version even if stale, or fallback
                return cache.match(event.request);
              });
          });
        })
        .catch((err) => {
          console.log('[Service Worker] Cache error:', err);
          return fetch(event.request);
        }),
    );
  } else {
    // Network-first strategy for other assets
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cache = event.request.method === 'GET' ? CACHE_NAME : null;
          if (cache && response && response.status === 200) {
            caches.open(cache).then((c) => c.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        }),
    );
  }
});
