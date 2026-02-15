// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/gojuon_game/serviceWorker.js').then((registration) => {
      console.log('serviceWorker registered:', registration.scope)

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        console.log('New service worker found')

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New service worker installed, prompting for reload')
            if (confirm('New version available! Reload to update?')) {
              newWorker.postMessage({ type: 'SKIP_WAITING' })
              window.location.reload()
            }
          }
        })
      })
    }).catch((error) => {
      console.error('serviceWorker registration failed:', error)
    })

    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true
        window.location.reload()
      }
    })
  })
}