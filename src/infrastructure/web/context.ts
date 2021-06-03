import { v4 as uuid } from 'uuid'

import { Context } from '@src/infrastructure/web/context.d'

const requestId = uuid()

export default function createContext(): Context {
  return {
    requestId,
  }
}
export { requestId }
