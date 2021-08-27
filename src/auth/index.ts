import { Plugin, Server } from '@hapi/hapi'
import * as basic from './basic'
import * as bearer from './jwt'
import * as pkg from '../../package.json'
import * as HapiBearer from 'hapi-auth-bearer-token'
import * as HapiBasic from '@hapi/basic'

export type AuthOptions = {
  // TODO: add additional options that needs to be passed to this module
}

export const Auth: Plugin<AuthOptions> = {
  name: 'auth',
  version: pkg.version,
  register: async (server: Server, options: AuthOptions) => {
    await server.register([
      HapiBearer,
      HapiBasic
    ])

    server.auth.strategy('bearer', 'bearer-access-token', {
      validate: bearer.validate
    })

    server.auth.strategy('basic', 'basic', {
      validate: basic.validate
    })
  }
}
