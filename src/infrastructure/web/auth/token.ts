import { Response } from 'express'
import { sign } from 'jsonwebtoken'

import settings from '@src/infrastructure/config/settings'
import { REFRESH_TOKEN_COOKIE } from '@src/infrastructure/config/token'
import User from '@src/domain/entities/user'

export function createAccessToken(user: User): string {
  return sign(
    {
      userId: user.id,
    },
    settings.accessTokenSecret,
    {
      expiresIn: '15m',
    },
  )
}

export function createRefreshToken(user: User): string {
  return sign(
    {
      userId: user.id,
      tokenVersion: user.tokenVersion,
    },
    settings.refreshTokenSecret,
    {
      expiresIn: '7d',
    },
  )
}

export function sendRefreshToken(res: Response, token: string): void {
  res.cookie(REFRESH_TOKEN_COOKIE, token, {
    httpOnly: true,
  })
}
