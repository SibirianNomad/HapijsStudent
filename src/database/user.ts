import {
  Column, DataType, Model, Scopes, Table
} from 'sequelize-typescript'
import * as uuid from 'uuid'

/**
 * user data model
 */
export interface User {
  id: string
  email: string
  password: string
  avatar: string
}

/**
 * create user data model
 */
export type CreateUser = Omit<User, 'id'>

/**
 * update user data model
 */
export type UpdateUser = Partial<CreateUser>

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  },
  withPassword: {
    attributes: {
      include: ['password']
    }
  }
}))
@Table
export class UserModel extends Model<User, CreateUser> implements User {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: uuid.v4()
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING
  })
  avatar: string;

  @Column({
    type: DataType.STRING
  })
  password: string;
}
