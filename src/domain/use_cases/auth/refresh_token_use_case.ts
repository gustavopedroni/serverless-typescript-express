import { verify } from 'jsonwebtoken'

import IUseCase from '@src/domain/use_cases'
import settings from '@src/infrastructure/config/settings'
import { REFRESH_TOKEN_COOKIE } from '@src/infrastructure/config/token'
import { getUsers } from '@src/infrastructure/repositories/user_repository'
import logger from '@src/infrastructure/utils/logger'
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '@src/infrastructure/web/auth/token'

type RefreshResponse = {
  ok: boolean
  accessToken: string
}

const RefreshTokenUseCase: IUseCase<RefreshResponse> = async ({ req, res }) => {
  const token = req.cookies[REFRESH_TOKEN_COOKIE]

  const users = await getUsers()

  if (!token) {
    return {
      ok: false,
      accessToken: '',
    }
  }

  let payload

  try {
    payload = verify(token, settings.refreshTokenSecret)
  } catch (err) {
    logger.info(err)
    return {
      ok: false,
      accessToken: '',
    }
  }

  // token is valid and
  // we can send back an access token
  const user = users[0]
  if (!user) {
    return {
      ok: false,
      accessToken: '',
    }
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return {
      ok: false,
      accessToken: '',
    }
  }

  sendRefreshToken(res, createRefreshToken(user))

  return {
    ok: true,
    accessToken: createAccessToken(user),
  }
}

export default RefreshTokenUseCase
