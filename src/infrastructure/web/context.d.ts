import { Knex } from 'knex'

export type Context = {
  requestId: string
  knex: Knex
  user?: unknown
}

declare global {
  namespace Express {
    interface Request {
      context: Context
    }
  }
}
