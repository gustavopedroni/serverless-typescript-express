import { Request, Response } from 'express'

import { handleError } from '@src/infrastructure/web/errors'
import IUseCase from '@src/domain/use_cases'

export default function defaultMiddleware<T extends IUseCase>(useCase: T) {
  return async (req: Request, res: Response): Promise<Response> => {
    try {
      const { params, query, body, context } = req

      const result = await useCase({
        body,
        context,
        params,
        query,
      })

      return res.json(result)
    } catch (err) {
      return handleError({ err, res })
    }
  }
}
