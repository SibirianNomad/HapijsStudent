import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import { User } from './User';
import { Session } from './Session';
import { UserAvatar } from './UserAvatar';
import { Plugin, Server } from '@hapi/hapi';
import * as pkg from '../../package.json'


export const Database: Plugin<any> = {
  name: 'database',
  version: pkg.version,
  register: async (server: Server, options: any) => {
    const { test } = options
    const sequelize: Sequelize = new Sequelize(config.dbLink, {
      dialect: 'postgres',
      models: [User, Session, UserAvatar],
    });
    
    if(test) {

    } else {

    }
  }
}