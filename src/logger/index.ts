import { Plugin, Server } from '@hapi/hapi'
import * as pkg from '../../package.json'

export type Options = {}

export const Logging: Plugin<Options> = {
  name: 'logger',
  version: pkg.version,
  register: (server: Server, options: Options) => {

  }
}
