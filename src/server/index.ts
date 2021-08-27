import * as Hapi from '@hapi/hapi'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as HapiPulse from 'hapi-pulse'
import * as Qs from 'qs'
import { Api } from '../api'
import { Auth } from '../auth'
import config from '../config/config'
import { Database, DatabaseOptions } from '../database'
import { Websocket } from '../websocket'
import { responseFilter } from './responseFilter'

export const createServer = async (): Promise<Hapi.Server> => {
  const server = new Hapi.Server({
    port: config.server.port,
    host: config.server.host,
    query: {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      parser: (query) => Qs.parse(query)
    },
    routes: {
      validate: {
        options: {
          // Handle all validation errors
          abortEarly: false
        },
        failAction: 'error'
      },
      response: {
        failAction: 'log'
      }
    }
  })

  /* plugins required */
  await server.register([
    Inert,
    Vision
  ])

  /* Resonse filter */
  server.ext('onPreResponse', responseFilter)

  await server.register<DatabaseOptions>({
    plugin: Database,
    options: null /* {
      dialect: 'postgres',
      host: '',
      database: '',
      username: '',
      password: '',
      port: 5432
    } */
  })

  await server.register({
    plugin: HapiPulse,
    options: {
      timeout: 15000,
      signals: ['SIGINT']
    }
  })

  await server.register({
    plugin: Api,
    options: {}
  })

  await server.register({
    plugin: Auth,
    options: {}
  })

  await server.register({
    plugin: Websocket,
    options: {}
    /* Write unit tests to test websockets or
     * use https://mdenushev.github.io/nes-cli/
     * to test ws connections
     */
  })

  return server
}
