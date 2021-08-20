import { ServerRoute } from '@hapi/hapi'
import { AuthenticationResultSchema, LoginSchema, RegisterSchema, UserSchema } from '../schemes'
import * as users from './handlers/users'

export const register: ServerRoute = {
  method: 'POST',
  path: '/accounts/register',
  handler: users.register,
  options: {
    id: 'register',
    tags: ['api', 'Accounts'],
    payload: {
      allow: ['application/json', 'application/*+json'],
      parse: true,
      failAction: 'error'
    },
    validate: {
      failAction: 'error',
      payload: RegisterSchema()
    },
    response: {
      schema: AuthenticationResultSchema()
    }
  }
}

export const login: ServerRoute = {
  method: 'POST',
  path: '/accounts/login',
  handler: users.login,
  options: {
    id: 'login',
    tags: ['api', 'Accounts'],
    payload: {
      allow: ['application/json', 'application/*+json'],
      parse: true,
      failAction: 'error'
    },
    validate: {
      failAction: 'error',
      payload: LoginSchema()
    },
    response: {
      schema: AuthenticationResultSchema()
    }
  }
}

export const profile: ServerRoute = {
  method: 'GET',
  path: '/accounts',
  handler: users.profile,
  options: {
    id: 'profile',
    tags: ['api', 'Accounts'],
    validate: {
      failAction: 'error'
    },
    response: {
      schema: UserSchema()
    }
  }
}
