const settings = {
  get logLevel(): string {
    return process.env.LOG_LEVEL
  },
  get stage(): string {
    return process.env.STAGE
  },
  get dbDriver(): string {
    return process.env.DB_DRIVER
  },
  get dbFilename(): string {
    return process.env.DB_FILENAME
  },
  get dbHost(): string {
    return process.env.DB_HOST
  },
  get dbPort(): string {
    return process.env.DB_PORT
  },
  get dbDatabase(): string {
    return process.env.DB_DATABASE
  },
  get dbUsername(): string {
    return process.env.DB_USERNAME
  },
  get dbPassword(): string {
    return process.env.DB_PASSWORD
  },
  get accessTokenSecret(): string {
    return process.env.ACCESS_TOKEN_SECRET
  },
  get refreshTokenSecret(): string {
    return process.env.REFRESH_TOKEN_SECRET
  },
}

export default settings
