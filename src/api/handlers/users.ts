import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'

export const get = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  return reply.response()
}
