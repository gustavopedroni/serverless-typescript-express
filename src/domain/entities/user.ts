type User = {
  id: number
  email: string
  password: string
  tokenVersion: number
}

function getUsers(): User[] {
  return [
    {
      id: 1,
      email: 'teste@teste.com',
      password: '123',
      tokenVersion: 1,
    },
  ]
}

export { getUsers }

export default User
