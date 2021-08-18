import { Sequelize } from 'sequelize-typescript'
import { Plugin, Server } from '@hapi/hapi'
import * as pkg from '../../package.json'
import { UserModel } from './user'
import { SessionModel } from './session'

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
        models: [UserModel, SessionModel],
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
        models: [UserModel, SessionModel]
      })
    }
  }
}
