import { getUsers } from '@src/domain/entities/user'
import IUseCase from '@src/domain/use_cases'
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '@src/infrastructure/web/auth/token'
import { ResponseError } from '@src/infrastructure/web/errors'

const LoginUseCase: IUseCase = async ({ body, res }) => {
  const { email, password } = body

  const users = getUsers()

  let user

  if (email === users[0].email) {
    ;[user] = users
  }
  // const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new ResponseError(400, 'could not find user')
  }
  const valid = user.password === password
  // const valid = await compare(password, user.password)
  if (!valid) {
    throw new ResponseError(400, 'bad password')
  }

  // login successful
  sendRefreshToken(res, createRefreshToken(user))

  return {
    accessToken: createAccessToken(user),
    user,
  }
}

export default LoginUseCase
