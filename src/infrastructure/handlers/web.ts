/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */

import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import serverless from 'serverless-http'

import app from '@src/infrastructure/web/app'

const serverlessHandler = serverless(app)

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  event.path = event.path === '' ? '/' : event.path

  const result = await serverlessHandler(event, context)

  return result
}
