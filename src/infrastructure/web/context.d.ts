import { PrismaClient } from '@prisma/client/index.d'

export type Context = {
  requestId: string
  database: PrismaClient
  user?: unknown
}

declare global {
  namespace Express {
    interface Request {
      context: Context
    }
  }
}
