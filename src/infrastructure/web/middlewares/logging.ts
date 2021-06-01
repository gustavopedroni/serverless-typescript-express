import { Request, Response, NextFunction, Errback } from 'express'

import logger from '@src/infrastructure/utils/logger'

export default async function logging(
  err: Errback,
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  logger.info('Received request', {
    url: request.originalUrl,
    query: request.query,
    params: request.params,
    body: request.body,
  })

  next(err)
}
