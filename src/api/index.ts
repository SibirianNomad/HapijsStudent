import { Plugin, Server } from '@hapi/hapi'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as HapiSwagger from 'hapi-swagger'
import * as pkg from '../../package.json'
import { Users } from './users'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Api: Plugin<any> = {
  name: 'api',
  version: pkg.version,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: async (server: Server, options: any) => {
    server.realm.modifiers.route.prefix = '/api'
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: {
          info: {
            title: 'API Documentation',
            version: pkg.version
          },
          basePath: '/api',
          grouping: 'tags'

        }
      }
    ])

    server.register(Users)
  }
}
