import { Sequelize } from 'sequelize-typescript'
import { Plugin, Server } from '@hapi/hapi'
import * as pkg from '../../package.json'
import { CreateUser, UserDto, UserModel } from './user'

export type DatabaseOptions = {
  /**
   * create an in-memory test database
   */
  test: boolean

  /**
   * database server host
   */
  host: string

  /**
   * database server port
   */
  port: number

  /**
   * database server username
   */
  username: string

  /**
   * database server password
   */
  password: string

  /**
   * database name
   */
  database: string

  /**
   * database dialect
   */
  dialect?: 'postgres' | 'sqlite' /* currently supported */
}

export const Database: Plugin<DatabaseOptions> = {
  name: 'database',
  version: pkg.version,
  register: async (server: Server, options: DatabaseOptions) => {
    const { test, host, port, username, password, database } = options
    let sequelize: Sequelize
    if (test) {
      sequelize = new Sequelize('sqlite::memory:', {
        models: [UserModel],
        logging: false,
        sync: {
          force: true,
          alter: true
        }
      })
      await sequelize.sync()
    } else {
      sequelize = new Sequelize({
        dialect: 'postgres',
        host,
        port,
        database,
        username,
        password,
        models: [UserModel]
      })
    }

    server.expose(sequelize)
    server.method(createUser.name, createUser)
    server.method(getUser.name, getUser)
  }
}

/**
 * Create user
 * @param user user data
 * @returns created user
 */
const createUser = async (user: CreateUser): Promise<UserDto> => {
  return await UserModel.create(user, {
    raw: true
  })
}

/**
 * Get user that matches provided search query
 * @param user search query
 * @returns User that matches search query or null if not found
 */
const getUser = async (user: Pick<UserDto, 'email'>): Promise<UserDto | null> => {
  return await UserModel.findOne({
    where: { email: user.email },
    raw: true
  })
}
