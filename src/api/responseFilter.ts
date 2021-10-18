import { ResponseObject, ResponseToolkit, Request } from '@hapi/hapi'

/**
 * Http response object
 */
type Response = {
  ok: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: Record<string, any> | {
      message: string | string[]
      stacktrace?: string
  }
}

export const responseFilter = (request: Request, h: ResponseToolkit, err?: Error | undefined): ResponseObject | symbol => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { source: payload, output, statusCode, message } = request.response as any

  let status:number

  if (statusCode) {
    status = statusCode
  }

  if (output && output.statusCode) {
    status = output.statusCode
  }

  /* handler throws error */
  if (!payload) {
    const response : Response = {
      ok: false,
      result: {
        error: message
      }
    }

    return h.response(response).code(status)
  }

  /* all good responses goes through this call */
  return h.response({
    ok: true,
    result: payload
  }).code(status)
}
