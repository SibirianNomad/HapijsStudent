import { ServerRoute } from '@hapi/hapi'
import { LoginSchema } from '../schemes'
import * as users from './handlers/users'

export const register: ServerRoute = {
  method: 'POST',
  path: '/register',
  handler: users.register,
  options: {
    id: 'register',
    tags: ['api', 'register'],
    payload: {
      allow: ['application/json', 'application/*+json'],
      parse: true,
      failAction: 'error'
    },
    validate: {
      failAction: 'error',
      payload: null
    }
  }
}

export const login: ServerRoute = {
  method: 'POST',
  path: '/login',
  handler: users.login,
  options: {
    id: 'login',
    tags: ['api', 'login'],
    payload: {
      allow: ['application/json', 'application/*+json'],
      parse: true,
      failAction: 'error'
    },
    validate: {
      failAction: 'error',
      payload: LoginSchema()
    }
  }
}

export const profile: ServerRoute = {
  method: 'GET',
  path: '/profile',
  handler: users.profile,
  options: {
    id: 'login',
    tags: ['api', 'login']
  }
}
