import { Router } from 'express'

import authentication from '@src/infrastructure/web/auth'

const router = Router()

router.use(authentication)

export default router
