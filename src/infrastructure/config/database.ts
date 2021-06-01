import settings from '@src/infrastructure/config/settings'

const database = {
  client: settings.dbDriver,
  migrations: {
    directory: 'src/database/migrations',
  },
  seeds: {
    directory: 'src/database/seeds',
  },
  debug: settings.stage === 'dev',
}

const drivers = {
  sqlite3: {
    connection: {
      filename: 'settings.dbFilename',
    },
    useNullAsDefault: true,
  },
  pg: {
    connection: {
      charset: 'utf8',
      host: settings.dbHost,
      port: settings.dbPort,
      database: settings.dbDatabase,
      user: settings.dbUsername,
      password: settings.dbPassword,
    },
    pool: {
      min: 1,
      max: 1,
    },
  },
}

export default {
  ...database,
  ...drivers[settings.dbDriver],
}
