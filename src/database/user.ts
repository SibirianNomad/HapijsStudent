import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
  UpdatedAt
} from 'sequelize-typescript'
import * as uuid from 'uuid'

/**
 * user data model
 */
export interface UserDto {
  id: string
  email: string
  password: string
  avatar: string
  createdAt: Date
  updatedAt: Date
}

/**
 * create user data model
 */
export type CreateUser = Omit<UserDto, 'id' | 'avatar' | 'createdAt' | 'updatedAt'>

/**
 * update user data model
 */
export type UpdateUser = Partial<CreateUser>

@Scopes(() => ({
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  }
}))
@Table({
  tableName: 'users'
})
export class UserModel extends Model<UserDto, CreateUser> implements UserDto {
  @Column(DataType.STRING)
  @Default(uuid.v4())
  @PrimaryKey
  id: string

  @Column(DataType.STRING)
  @Unique
  @AllowNull(false)
  email: string

  @Column(DataType.STRING)
  @AllowNull(true)
  avatar: string

  @Column(DataType.STRING)
  @AllowNull(false)
  password: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

/**
 * Create user
 * @param user user data
 * @returns created user
 */
export const createUser = async (user: CreateUser): Promise<UserDto> => {
  return await UserModel.create(user, {
    raw: true
  })
}

/**
 * Get user that matches provided search query
 * @param user search query
 * @returns User that matches search query or null if not found
 */
export const getUser = async (user: Pick<UserDto, 'email' | 'password'>): Promise<UserDto | null> => {
  if (user.password) {
    return await UserModel.findOne({
      where: { email: user.email, password: user.password },
      raw: true
    })
  }

  return await UserModel.findOne({
    where: { email: user.email },
    raw: true
  })
}

export const isUniqueEmailAddress = async (email: string): Promise<boolean> => {
  return (await UserModel.count({ where: { email } })) === 0
}
