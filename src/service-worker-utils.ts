import { log } from './lib/logger.js'

export async function registerServiceWorker (): Promise<ServiceWorkerRegistration> {
  const swRegistration = await navigator.serviceWorker.register(new URL(/* webpackChunkName: "sw" */'sw.js', import.meta.url))
  return new Promise((resolve, reject) => {
    swRegistration.addEventListener('updatefound', () => {
      const newWorker = swRegistration.installing
      newWorker?.addEventListener('statechange', () => {
        if (newWorker.state === 'activated') {
          log('service worker activated')
          resolve(swRegistration)
        }
      })
    })
  })
}
