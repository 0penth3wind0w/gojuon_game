const CACHE = "gojuon"
const urlsToCache = [
  "/gojuon_game/",
  "/gojuon_game/index.html",
  "/gojuon_game/scripts/game.js",
  "/gojuon_game/scripts/pwa.js",
  "/gojuon_game/stylesheets/style.css",
  "/gojuon_game/params.json",
  "/gojuon_game/manifest.json",
  "/gojuon_game/icons/icon-512x512.png",
  "/gojuon_game/icons/icon-256x256.png",
  "/gojuon_game/icons/icon-192x192.png",
  "/gojuon_game/icons/icon-180x180.png",
  "/gojuon_game/icons/icon-167x167.png",
  "/gojuon_game/icons/icon-152x152.png",
  "/gojuon_game/icons/icon-120x120.png",
  "/gojuon_game/icons/favicon-32x32.png",
  "/gojuon_game/icons/favicon-16x16.png"
]
const mainPage = "/gojuon_game/index.html"

// cache all the selected items when install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("caching started.")
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE) {
            console.log("deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// when a resource is requested, return cached resource else fetch the resource from server
self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      const cache = await caches.open(CACHE)
      const cachedResponse = await cache.match(event.request)

      if (cachedResponse) {
        return cachedResponse
      }

      const networkResponse = await fetch(event.request)

      if (event.request.method === 'GET' && networkResponse.status === 200) {
        cache.put(event.request, networkResponse.clone())
      }

      return networkResponse
    } catch (error) {
      const cache = await caches.open(CACHE)
      const cachedResponse = await cache.match(event.request)

      if (cachedResponse) {
        return cachedResponse
      }

      if (event.request.mode === 'navigate') {
        return cache.match(mainPage)
      }

      return new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
    }
  })())
})

self.addEventListener("message", (event) => {
  event.data && event.data.type === "SKIP_WAITING" ? self.skipWaiting() : null
})
