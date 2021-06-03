export type Context = {
  requestId: string
  user?: unknown
}

declare global {
  namespace Express {
    interface Request {
      context: Context
    }
  }
}
