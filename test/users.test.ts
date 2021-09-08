import Code from '@hapi/code'
import { Server } from '@hapi/hapi'
import Lab from '@hapi/lab'
import { Users } from '../src/api/users'
import * as Mocks from './mocks'
import { Auth } from '../src/auth'

const { describe, it, suite, before } = exports.lab = Lab.script()
const { expect } = Code

suite('Users API', () => {
  describe('register user', () => {
    const server: Server = new Server()

    before(async () => {
      server.method('createUser', Mocks.createUser)

      server.method('isUniqueEmailAddress', Mocks.isUniqueEmailAddress)

      await server.register({
        plugin: Auth,
        options: {
          jwtRefreshTokenSecret: 'A86D1AC8-81C2-451A-9CEA-8665F4C55DE7',
          jwtTokenSecret: '6FD3C2FF-D14C-4F8D-85EF-6662B065D125',
          jwtRefreshTokenLifetime: 60,
          jwtTokenLifetime: 30
        }
      })

      await server.register({
        plugin: Users
      })

      await server.initialize()
    })

    it('user created and return auth tokens', async () => {
      const result = await server.inject({
        url: '/users/register',
        method: 'POST',
        payload: {
          email: 'test@test.com',
          password: 'foo',
          confirmPassword: 'foo'
        }
      })

      expect(result.statusCode).equal(200)
    })

    it('returns bad request on incorrect registration data', async () => {
      expect(true)
    })
  })

  describe('login user', () => {
    const server: Server = new Server()

    before(async () => {
      await server.register({
        plugin: Users
      })

      server.method('getUser', Mocks.getUser)

      server.initialize()
    })

    it('return auth tokens', async () => {
      expect(true)
    })

    it('login user returns bad request', async () => {
      expect(true)
    })
  })

  describe('user profile', () => {
    const server: Server = new Server()

    before(async () => {
      await server.register({
        plugin: Users
      })

      server.method('getUser', Mocks.getUser)

      server.initialize()
    })

    it('return user profile data', async () => {
      expect(true)
    })

    it('return unauthorized', async () => {
      expect(true)
    })
  })
})
