import { dnsJsonOverHttps } from '@helia/ipns/dns-resolvers'
import { createVerifiedFetch, type VerifiedFetch } from '@helia/verified-fetch'
import { getConfig } from './lib/config-db.ts'
import { contentTypeParser } from './lib/content-type-parser.ts'
import { log } from './lib/logger.ts'

export async function getVerifiedFetch (): Promise<VerifiedFetch> {
  const config = await getConfig()
  log(`config-debug: got config for sw location ${self.location.origin}`, config)

  const verifiedFetch = await createVerifiedFetch({
    gateways: config.gateways ?? ['https://trustless-gateway.link'],
    routers: config.routers ?? ['https://delegated-ipfs.dev'],
    dnsResolvers: ['https://delegated-ipfs.dev/dns-query'].map(dnsJsonOverHttps)
  }, {
    contentTypeParser
  })

  return verifiedFetch
}
