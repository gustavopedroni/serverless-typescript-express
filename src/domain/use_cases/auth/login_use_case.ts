import { getUsers } from '@src/infrastructure/repositories/user_repository'
import IUseCase from '@src/domain/use_cases'
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '@src/infrastructure/web/auth/token'
import { ResponseError } from '@src/infrastructure/web/errors'

const LoginUseCase: IUseCase = async ({ body, res }) => {
  const { email, password } = body

  const users = await getUsers()

  let user

  if (email === users[0].email) {
    ;[user] = users
  }
  // const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new ResponseError(401, 'Usuário ou senha inválidos')
  }
  const valid = user.password === password
  // const valid = await compare(password, user.password)
  if (!valid) {
    throw new ResponseError(401, 'Usuário ou senha inválidos')
  }

  // login successful
  sendRefreshToken(res, createRefreshToken(user))

  return {
    accessToken: createAccessToken(user),
    user,
  }
}

export default LoginUseCase
