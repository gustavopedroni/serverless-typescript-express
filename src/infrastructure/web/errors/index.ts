import { Response } from 'express'
import { getReasonPhrase } from 'http-status-codes'

import settings from '@src/infrastructure/config/settings'
import logger from '@src/infrastructure/utils/logger'

class ResponseError extends Error {
  statusCode: number

  constructor(status: number, message: string) {
    super()
    this.statusCode = status
    this.message = message
  }
}

interface IHandleError {
  err: ResponseError
  res: Response
}

const handleError = ({ err, res }: IHandleError): Response => {
  const { statusCode, message } = err

  logger.error(err.message)
  if (settings.stage !== 'prod') logger.error(err.stack)

  const code = statusCode || 500

  return res.status(code).json({
    status: getReasonPhrase(code),
    message,
  })
}

export { ResponseError, handleError }
