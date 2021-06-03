import { v4 as uuid } from 'uuid'
import { PrismaClient } from '@prisma/client'

import { Context } from '@src/infrastructure/web/context.d'

const requestId = uuid()
const database: PrismaClient = new PrismaClient()

export default function createContext(): Context {
  return {
    requestId,
    database,
  }
}
export { requestId }
