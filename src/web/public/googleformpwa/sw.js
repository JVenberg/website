const CACHE_NAME = "form-viewer-cache-v1";
const urlsToCache = [
  "/", // If your_html_file_name.html is the root
  "your_html_file_name.html", // The main HTML file
  // Add other assets like CSS files or icons if they are separate and you want to cache them
  // 'style.css',
  "icon-192x192.png",
  "icon-512x512.png",
  "manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  // We only want to cache GET requests.
  if (event.request.method !== "GET") {
    return;
  }

  // For Google Forms, always fetch from network to ensure the latest version.
  // Don't cache the iframe content itself as it's dynamic.
  if (event.request.url.includes("docs.google.com/forms")) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Serve from cache
      }
      return fetch(event.request).then((networkResponse) => {
        // Optionally, cache new assets dynamically if needed
        // Be careful with what you cache here if assets change frequently
        return networkResponse;
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});
