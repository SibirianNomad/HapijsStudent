import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'

export const register = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  return reply.response()
}

export const login = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  return reply.response()
}

export const profile = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  return reply.response()
}
