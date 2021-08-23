import * as Hapi from '@hapi/hapi'
import * as Nes from '@hapi/nes'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import * as Pino from 'hapi-pino'
import * as Basic from '@hapi/basic'
import * as HapiCors from 'hapi-cors'
import * as HapiBearer from 'hapi-auth-bearer-token'
import * as HapiPulse from 'hapi-pulse'
import * as Qs from 'qs'
import config from '../config/config'
import { handleValidationError, responseHandler } from './utils'
import SwaggerOptions from '../config/swagger'
import { pinoConfig } from '../config/pino'

const HapiSwagger = require('hapi-swagger')
const Package = require('../../package.json')

SwaggerOptions.info.version = Package.version

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
    Vision,
    HapiBearer,
    { plugin: Pino, options: pinoConfig(false) },
    { plugin: HapiSwagger, options: SwaggerOptions }
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

  // Enable CORS (Do it last required!)
  await server.register({
    plugin: HapiCors,
    options: config.cors
  })

  return server
}
