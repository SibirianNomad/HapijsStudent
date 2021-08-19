import * as users from '../handlers/users'

export const get = {
  method: 'GET',
  path: '/',
  handler: users.get,
  options: {
    id: 'getUser',
    tags: ['api', 'getUser']
  }
}
