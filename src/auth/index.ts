import { Plugin, Server } from '@hapi/hapi'
import * as basic from './basic'
import * as bearer from './jwt'
import * as pkg from '../../package.json'

export type AuthOptions = {
  // TODO: add additional options that needs to be passed to this module
}

export const Auth: Plugin<AuthOptions> = {
  name: 'auth',
  version: pkg.version,
  register: async (server: Server, options: AuthOptions) => {
    server.auth.strategy('bearer', 'bearer-access-token', {
      validate: bearer.validate
    })

    server.auth.strategy('basic', 'basic', {
      validate: basic.validate
    })

    server.auth.strategy('session', 'cookie')

    /* Авторизация через соцсети */
    server.auth.strategy('google', 'bell', {
      provider: 'Google',
      clientId: '',
      clientSecret: '',
      password: '',
      isSecure: false
    })

    server.auth.strategy('facebook', 'bell', {
      provider: 'Facebook',
      clientId: Number(0),
      clientSecret: '',
      password: '',
      isSecure: false
    })

    server.auth.strategy('vkontakt', 'bell', {
      provider: 'VK',
      clientId: Number(0),
      clientSecret: '',
      password: '',
      isSecure: false
    })
  }
}
