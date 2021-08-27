import { AuthArtifacts, AuthCredentials, Request, ResponseToolkit } from '@hapi/hapi'
import * as jwt from 'jsonwebtoken'

export type TokenPurpose = 'access' | 'refresh'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TokenVerifyResult = { isValid: boolean, decoded: any }

export type AuthenticationData = {
  isValid: boolean
  credentials: AuthCredentials;
  artifacts?: AuthArtifacts | undefined;
}

export const validate = async (request: Request, token: string, h: ResponseToolkit): Promise<AuthenticationData> => {
  // TODO: use verifyToken to verify token and extract user data
  return { isValid: true, credentials: {}, artifacts: undefined }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createToken = async (data: any, purpose: TokenPurpose, secret: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    jwt.sign({ ...data, purpose }, secret, {
      /* TODO: add necessary options */
      expiresIn: '2 days'
    }, (error, encoded) => {
      if (error) {
        return reject(error)
      }

      resolve(encoded)
    })
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyToken = async (token: string, secret: string, purpose: TokenPurpose): Promise<TokenVerifyResult> => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, secret, {
        /* TODO: add necessary options */
        ignoreExpiration: false

      }, (_, decoded) => {
        if (decoded) {
          if (purpose && (purpose === decoded.purpose)) {
            return resolve({ isValid: true, decoded })
          }
        }

        resolve({ isValid: false, decoded: null })
      })
    } catch (error) {
      reject(error)
    }
  })
}
