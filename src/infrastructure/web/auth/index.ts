import { Router } from 'express'

import authMiddleware from '@src/infrastructure/web/middlewares/auth'
import { LoginUseCase, RefreshTokenUseCase } from '@src/domain/use_cases/auth'

const router = Router()

router.post('/refresh_token', authMiddleware(RefreshTokenUseCase))
router.post('/login', authMiddleware(LoginUseCase))

export default router
