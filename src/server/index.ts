import * as Hapi from '@hapi/hapi'
import * as Nes from '@hapi/nes'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as Basic from '@hapi/basic'
import * as HapiPulse from 'hapi-pulse'
import * as Qs from 'qs'
import config from '../config/config'
import { handleValidationError, responseHandler } from './utils'

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
        failAction: handleValidationError
      },
      response: {
        failAction: 'log'
      }
    }
  })

  // Регистрируем расширения
  await server.register([
    Basic,
    Nes,
    Inert,
    Vision
  ])

  // Error handler
  server.ext('onPreResponse', responseHandler)
  await server.register({
    plugin: HapiPulse,
    options: {
      timeout: 15000,
      signals: ['SIGINT']
    }
  })

  return server
}
