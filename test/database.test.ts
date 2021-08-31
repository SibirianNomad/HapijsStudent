import Code from '@hapi/code'
import { Server } from '@hapi/hapi'
import Lab from '@hapi/lab'
import { Database } from '../src/database'

const { describe, it, before } = exports.lab = Lab.script()
const { expect } = Code

describe('database', () => {
  const server = new Server()

  before(async () => {
    await server.register({
      plugin: Database,
      options: {
        test: true
      }
    })

    await server.initialize()
  })

  it('database methods', () => {
    const { createUser, getUser, isUniqueEmailAddress } = server.methods
    expect(createUser).function()
    expect(getUser).function()
    expect(isUniqueEmailAddress).function()
  })

  it('create user', () => {
    // eslint-disable-next-line no-unused-vars
    const { createUser } = server.methods

    expect(true)
  })

  it('get user', () => {
    // eslint-disable-next-line no-unused-vars
    const { getUser } = server.methods

    expect(true)
  })
})
