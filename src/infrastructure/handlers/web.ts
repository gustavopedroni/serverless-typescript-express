/* eslint-disable no-param-reassign */

import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventHeaders,
  Context as APIContext,
} from 'aws-lambda'
import serverless from 'serverless-http'
import { gzip } from 'zlib'

import app from '@src/infrastructure/web/app'
import createContext from '@src/infrastructure/web/context'
import settings from '@src/infrastructure/config/settings'

const serverlessHandler = serverless(app, {
  request(request: Record<string, unknown>) {
    request.context = createContext()
  },
})

function compress(data: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    gzip(data, (err, buffer) => {
      if (err) reject(err)
      resolve(buffer)
    })
  })
}

function gzipAccepted(headers: APIGatewayProxyEventHeaders) {
  const acceptEncodingHeader = Object.keys(headers).find(
    (k) => k.toLowerCase() === 'accept-encoding',
  )
  return (
    acceptEncodingHeader &&
    headers[acceptEncodingHeader].toLowerCase().indexOf('gzip') > -1
  )
}

export default async function handler(
  event: APIGatewayProxyEvent,
  context: APIContext,
): Promise<
  AWSLambda.APIGatewayProxyResult | AWSLambda.APIGatewayProxyStructuredResultV2
> {
  event.path = event.path === '' ? '/' : event.path

  const result = await serverlessHandler(event, context)

  if (settings.stage !== 'dev' && gzipAccepted(event.headers)) {
    result.body = await compress(result.body).then((t) => t.toString('base64'))
    result.isBase64Encoded = true
    result.headers['Content-Encoding'] = 'gzip'
  }

  return result
}
