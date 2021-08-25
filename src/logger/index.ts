import { Plugin, Server } from '@hapi/hapi'
import * as Pino from 'hapi-pino'
import * as pkg from '../../package.json'

export type Options = {}

export const Logging: Plugin<Options> = {
  name: 'logger',
  version: pkg.version,
  register: (server: Server, options: Options) => {
    server.register({
      plugin: Pino,
      options: {
        prettyPrint: {
          colorize: true,
          crlf: true
        },
        redact: ['req.headers.authorization'],
        timestamp: () => `, time: "${new Date(Date.now()).toLocaleString()}"`
      } as unknown
    })
  }
}
