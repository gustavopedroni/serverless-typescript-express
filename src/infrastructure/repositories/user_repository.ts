import User from '@src/domain/entities/user'

export async function getUsers(): Promise<User[]> {
  return [
    {
      id: 1,
      email: 'teste@teste.com',
      password: '123',
      tokenVersion: 1,
    },
  ]
}

export default {}
