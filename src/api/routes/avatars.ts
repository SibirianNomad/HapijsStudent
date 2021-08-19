import * as avatars from '../handlers/avatars'
import config from '../../config/config'

export const get = {
  method: 'GET',
  path: '/avatar',
  handler: avatars.get,
  options: {
    id: 'getAvatar',
    description: "Use this method to receive user's avatar as base64 string.",
    tags: ['api', 'getAvatar']
  }
}

export const create = {
  method: 'POST',
  path: '/avatar',
  handler: avatars.create,
  options: {
    id: 'createAvatar',
    auth: false,
    description: "Use this method to upload user's profile picture (avatar).",
    notes: `You have to pass image using **Formdata**. Allowed extensions ${config.files.allowedExtensions}`,
    tags: ['api', 'getAvatar'],
    payload: {
      maxBytes: 1024 * 1024 * 2,
      output: 'data',
      allow: 'multipart/form-data',
      multipart: true,
      parse: true
    }
  }
}
