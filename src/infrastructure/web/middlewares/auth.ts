import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import IUseCase from '@src/domain/use_cases'
import settings from '@src/infrastructure/config/settings'
import logger from '@src/infrastructure/utils/logger'
import { handleError, ResponseError } from '@src/infrastructure/web/errors'

export function isAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): unknown {
  // TODO MELHORAR ESSE MIDDLEWARE
  const { authorization } = req.headers

  try {
    if (!authorization) {
      throw new ResponseError(401, 'Não autorizado')
    }

    const token = authorization.split(' ')[1]
    const payload = verify(token, settings.accessTokenSecret)
    req.context.user = payload
  } catch (err) {
    logger.error(err)

    if (err instanceof ResponseError) {
      handleError({ err, res })
    } else {
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Não autorizado',
      })
    }
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
