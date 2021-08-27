import { ServerRoute } from '@hapi/hapi'
import { AuthenticationResultSchema, LoginSchema, RefreshTokenSchema, RegisterSchema, UserSchema } from '../schemes'
import * as users from './handlers/users'

export const register: ServerRoute = {
  method: 'POST',
  path: '/users/register',
  handler: users.register,
  options: {
    id: 'register',
    tags: ['api', 'Users'],
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
  path: '/users/login',
  handler: users.login,
  options: {
    id: 'login',
    tags: ['api', 'Users'],
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

export const refresh: ServerRoute = {
  method: 'PATCH',
  path: '/users/refresh',
  handler: users.refreshToken,
  options: {
    id: 'refresh',
    tags: ['api', 'Users'],
    payload: {
      allow: ['application/json', 'application/*+json'],
      parse: true,
      failAction: 'error'
    },
    validate: {
      failAction: 'error',
      payload: RefreshTokenSchema()
    },
    response: {
      schema: AuthenticationResultSchema()
    }
  }
}

export const profile: ServerRoute = {
  method: 'GET',
  path: '/users',
  handler: users.profile,
  options: {
    id: 'profile',
    tags: ['api', 'Users'],
    validate: {
      failAction: 'error'
    },
    response: {
      schema: UserSchema()
    }
  }
}
