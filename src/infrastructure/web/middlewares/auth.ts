import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import settings from '@src/infrastructure/config/settings'
import logger from '@src/infrastructure/utils/logger'
import IUseCase from '@src/domain/use_cases'
import { handleError, ResponseError } from '@src/infrastructure/web/errors'

export function isAuth(req: Request, _: Response, next: NextFunction): void {
  const { authorization } = req.headers

  if (!authorization) {
    throw new Error('not authenticated')
  }

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, settings.accessTokenSecret)
    req.context.user = payload
  } catch (err) {
    logger.error(err)
    throw new ResponseError(400, 'not authenticated')
  }

  return next()
}

export default function authMiddleware<T extends IUseCase>(useCase: T) {
  return async (req: Request, res: Response): Promise<Response> => {
    try {
      const { params, query, body, context } = req

      const result = await useCase({
        body,
        context,
        params,
        query,
        req,
        res,
      })

      return res.json(result)
    } catch (err) {
      return handleError({ err, res })
    }
  }
}
