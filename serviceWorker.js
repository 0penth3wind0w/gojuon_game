const CACHE = "gojuon"
const urlsToCache = [
  "/gojuon_game/",
  "/gojuon_game/index.html",
  "/gojuon_game/scripts/game.js",
  "/gojuon_game/scripts/pwa.js",
  "/gojuon_game/stylesheets/style.css"
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
})

// when a resource is requested, return cached resource else fetch the resource from server
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse
        if (preloadResp) {
          return preloadResp;
        }
        const networkResp = await fetch(event.request)
        return networkResp
      } catch (error) {
        const cache = await caches.open(CACHE)
        const cachedResp = await cache.match(mainPage)
        return cachedResp
      }
    })())
  }
})


self.addEventListener("message", (event) => {
  event.data && event.data.type === "SKIP_WAITING" ? self.skipWaiting() : null
})
