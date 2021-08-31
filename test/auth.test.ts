import Code from '@hapi/code'
import { Server } from '@hapi/hapi'
import Lab from '@hapi/lab'
import { Auth } from '../src/auth'

const { describe, it, before } = exports.lab = Lab.script()
const { expect } = Code

describe('auth', () => {
  const server = new Server()

  before(async () => {
    await server.register({
      plugin: Auth
    })

    await server.initialize()
  })

  it('auth methods', () => {
    const { createToken, verifyToken } = server.methods
    expect(createToken).to.be.function()
    expect(verifyToken).to.be.function()
  })

  it('create access token', async () => {
    const result = await server.methods.createToken({
      id: 'D312C8FE-39A1-493B-9B06-5954E97F8E9F',
      email: 'test@test.com'
    }, { purpose: 'access', lifetime: 3600 }, '37D6E247-CE52-4F7B-8747-BFC6279A0972')

    expect(result).to.be.string()
  })

  it('create refresh token', async () => {
    const result = await server.methods.createToken({
      id: 'D312C8FE-39A1-493B-9B06-5954E97F8E9F',
      email: 'test@test.com'
    }, { purpose: 'refresh', lifetime: 5000 }, '37D6E247-CE52-4F7B-8747-BFC6279A0972')

    expect(result).to.be.string()
  })

  it('verify access token', async () => {
    const secret = '37D6E247-CE52-4F7B-8747-BFC6279A0972'
    const purpose = 'access'

    const token = await server.methods.createToken({
      id: 'D312C8FE-39A1-493B-9B06-5954E97F8E9F',
      email: 'test@test.com'
    }, { purpose: purpose, lifetime: 5000 }, secret)

    const result = await server.methods.verifyToken(
      token,
      purpose,
      secret
    )

    expect(result).to.be.object()
    expect(result.isValid).to.be.true()
    expect(result.decoded).to.be.object()
    expect(result.decoded.email).to.be.string()
    expect(result.decoded.id).to.be.string()
    expect(result.decoded.purpose).to.be.equal(purpose)
  })

  it('verify refresh token', async () => {
    const secret = '37D6E247-CE52-4F7B-8747-BFC6279A0972'
    const purpose = 'refresh'
    const token = await server.methods.createToken({
      id: 'D312C8FE-39A1-493B-9B06-5954E97F8E9F',
      email: 'test@test.com'
    }, { purpose: 'refresh', lifetime: 5000 }, secret)

    const result = await server.methods.verifyToken(
      token,
      purpose,
      secret
    )

    expect(result).to.be.object()
    expect(result.isValid).to.be.true()
    expect(result.decoded).to.be.object()
    expect(result.decoded.email).to.be.string()
    expect(result.decoded.id).to.be.string()
    expect(result.decoded.purpose).to.be.equal(purpose)
  })
})
