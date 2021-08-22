import Code from '@hapi/code'
import { Server } from '@hapi/hapi'
import Lab from '@hapi/lab'
import { Users } from '../src/api/users'
import { CreateUser, UserDto } from '../src/database/user'

const { describe, it, suite, before } = exports.lab = Lab.script()
const { expect } = Code

suite('Users API', () => {
  describe('register user', () => {
    const server: Server = new Server()
    before(async () => {
      server.method('createUser', (data: UserDto) => ({
        id: '8B00C7C9-BD42-4918-8850-D98C0A8DE17D',
        ...data
      }))

      server.method('isUniqueEmailAddress', (data: string) => true)

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

      server.method('getUser', (data: CreateUser) => ({
        id: '8B00C7C9-BD42-4918-8850-D98C0A8DE17D',
        ...data
      }))

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

      server.method('getUser', (data: CreateUser) => ({
        id: '8B00C7C9-BD42-4918-8850-D98C0A8DE17D',
        ...data
      }))

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
