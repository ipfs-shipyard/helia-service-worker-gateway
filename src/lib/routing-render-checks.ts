import { isPathOrSubdomainRequest } from './path-or-subdomain.js'

export async function shouldRenderRedirectPage (): Promise<boolean> {
  // eslint-disable-next-line no-console
  console.log('in shouldRenderRedirectPage')
  const { isConfigPage } = await import('../lib/is-config-page.js')
  // eslint-disable-next-line no-console
  console.log(isConfigPage)
  // const isSubdomainRender = isSubdomainGatewayRequest(window.location)
  const isRequestToViewConfigPage = isConfigPage(window.location.hash)
  const shouldRequestBeHandledByServiceWorker = isPathOrSubdomainRequest(window.location) && !isRequestToViewConfigPage
  // const foo = window.self === window.top && isSubdomainRender
  // const result = foo
  const result = shouldRequestBeHandledByServiceWorker

  // eslint-disable-next-line no-console
  console.log('shouldRenderRedirectPage', result)
  return result
}

export async function shouldRenderConfigPage (): Promise<boolean> {
  // eslint-disable-next-line no-console
  console.log('in shouldRenderConfigPage')
  const { isConfigPage } = await import('../lib/is-config-page.js')

  const isRequestToViewConfigPage = isConfigPage(window.location.hash)
  // const isSubdomainRender = isSubdomainGatewayRequest(window.location)
  // const shouldRequestBeHandledByServiceWorker = isPathOrSubdomainRequest(window.location) && !isRequestToViewConfigPage
  // eslint-disable-next-line no-console
  console.log('isRequestToViewConfigPage', isRequestToViewConfigPage)
  return isRequestToViewConfigPage
}
