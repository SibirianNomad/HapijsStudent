import { RegisterOptions } from 'hapi-swagger'
import * as pkg from '../../package.json'

export const swaggerOptions: RegisterOptions = {
  grouping: 'tags',
  info: {
    title: 'API Documentation',
    version: pkg.version,
    description:
      'API Documentation'
  },
  jsonPath: '/documentation.json',
  documentationPath: '/documentation',
  debug: true
}
