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
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      password: process.env.AUTH_GOOGLE_SECRET,
      isSecure: false
    })

    server.auth.strategy('facebook', 'bell', {
      provider: 'Facebook',
      clientId: Number(process.env.AUTH_FB_ID),
      clientSecret: process.env.AUTH_FB_SECRET,
      password: process.env.AUTH_FB_COOKIE_PASSWORD,
      isSecure: false
    })

    server.auth.strategy('vkontakt', 'bell', {
      provider: 'VK',
      clientId: Number(process.env.AUTH_VK_ID),
      clientSecret: process.env.AUTH_VK_SECRET,
      password: process.env.AUTH_VK_COOKIE_PASSWORD,
      isSecure: false
    })
  }
}
