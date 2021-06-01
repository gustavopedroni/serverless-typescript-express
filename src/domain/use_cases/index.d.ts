import { Context } from '@src/infrastructure/web/context.d'
import { Request, Response } from 'express'

export type UseCaseParams = {
  params: Record<string, unknown>
  query: Record<string, unknown>
  body: Record<string, unknown>
  context: Context
  req?: Request
  res?: Response
}

export default interface IUseCase<R = unknown, T = UseCaseParams> {
  (args: T): Promise<R>
}
