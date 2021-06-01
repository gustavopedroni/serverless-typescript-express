import { v4 as uuid } from 'uuid'

import initializeDatabase from '@src/infrastructure/utils/database/initialize'
import { Context } from '@src/infrastructure/web/context.d'

const requestId = uuid()

export default function createContext(): Context {
  const knex = initializeDatabase()

  return {
    requestId,
    knex,
  }
}
export { requestId }
