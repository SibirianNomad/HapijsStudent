import * as Hapi from '@hapi/hapi'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as HapiPulse from 'hapi-pulse'
import * as Qs from 'qs'
import { Api } from '../api'
import * as config from '../config'
import { Database, DatabaseOptions } from '../database'
import { Logger } from '../logger'
import { Websocket } from '../websocket'

export const createServer = async (): Promise<Hapi.Server> => {
  const server = new Hapi.Server({
    port: config.Server.port,
    host: config.Server.host,
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

  await server.register<DatabaseOptions>({
    plugin: Database,
    options: {
      dialect: 'mysql',
      host: config.Server.db_host,
      database: config.Server.db_name,
      username: config.Server.db_user,
      password: config.Server.db_pass,
      port: 3306
    }
  })

  await server.register({
    plugin: HapiPulse,
    options: {
      timeout: 15000,
      signals: ['SIGINT']
    }
  })

  await server.register({
    plugin: Logger
  })

  await server.register({
    plugin: Api,
    options: {}
  })

  await server.register({
    /* Write unit tests to test websockets or
     * use https://mdenushev.github.io/nes-cli/
     * to test ws connections
     */
    plugin: Websocket,
    options: {},
    routes: {
      prefix: '/ws'
    }
  })

  return server
}
