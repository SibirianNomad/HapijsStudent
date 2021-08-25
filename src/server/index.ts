import * as Hapi from '@hapi/hapi'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as HapiPulse from 'hapi-pulse'
import * as Qs from 'qs'
import config from '../config/config'
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

  await server.register({
    plugin: HapiPulse,
    options: {
      timeout: 15000,
      signals: ['SIGINT']
    }
  })

  return server
}
