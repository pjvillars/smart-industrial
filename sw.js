const cacheName = 'smart-v2'; // Cambiamos a v2 para forzar refresco
const assets = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  // Fuerza al Service Worker nuevo a activarse de inmediato
  self.skipWaiting();
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', e => {
  // Limpia versiones viejas del cache para evitar el error 500
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
