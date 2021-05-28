import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import serverless from 'serverless-http'

import app from '@src/infrastructure/web/app'

const serverlessHandler = serverless(app)

export default async function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<
  AWSLambda.APIGatewayProxyResult | AWSLambda.APIGatewayProxyStructuredResultV2
> {
  // eslint-disable-next-line no-param-reassign
  event.path = event.path === '' ? '/' : event.path

  const result = await serverlessHandler(event, context)

  return result
}
