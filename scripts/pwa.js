// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/gojuon_game/serviceWorker.js').then(() => {
    console.log('serviceWorker registered')
  })
}