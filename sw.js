// Service Worker for Felix Oyeleke Website
const CACHE_NAME = 'felix-oyeleke-v29';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/blog.html',
  '/store.html',
  '/links.html',

  '/js/main.js',
  '/js/modules.js',
  '/js/app-core.js',
  '/js/effects.js',
  '/js/utils.js',
  '/js/blog-pagination.js',
  '/images/profile-picture.jpg',
  '/images/profile-placeholder.svg',
  '/components/header.html',
  '/components/footer.html',
  '/components/seo-analytics.html',
  '/manifest.json',
  '/css/main-styles.css',
  '/css/base.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/pages/store.css',
  '/css/pages/blog.css',
  '/css/utilities.css',
  '/css/responsive.css',
  '/images/course-placeholder-1.svg',
  '/images/course-placeholder-2.svg',
  '/images/course-placeholder-3.svg',
  '/guide.html',
  '/404.html'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Installed');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - network-first for HTML, cache-first for assets
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  const accept = event.request.headers.get('accept') || '';
  const isHTML = event.request.destination === 'document' || accept.includes('text/html');

  if (isHTML) {
    // Network-first for HTML pages to avoid staleness
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          return cached || caches.match('/404.html');
        })
    );
  } else {
    // Cache-first for static assets
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(event.request).then((networkResponse) => {
          // Cache successful same-origin responses
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return networkResponse;
        }).catch(() => {
          // Optional: asset fetch failed and no cache available
        });
      })
    );
  }
});

// Background sync for form submissions when online
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any pending form submissions or data sync
  try {
    // This would sync any pending contact forms, newsletter signups, etc.
    console.log('Service Worker: Performing background sync');
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const title = data.title || 'Felix Oyeleke';
    const options = {
      body: data.body || 'New update available',
      icon: '/images/profile-picture.jpg',
      badge: '/images/profile-picture.jpg',
      data: data.url || '/',
      actions: [
        {
          action: 'open',
          title: 'Open',
          icon: '/images/profile-picture.jpg'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/images/profile-picture.jpg'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    const url = event.notification.data || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
