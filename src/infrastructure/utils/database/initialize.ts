import { Model, knexSnakeCaseMappers } from 'objection'
import knex, { Knex } from 'knex'

import databaseSettings from '@src/infrastructure/config/database'

export default function initialize(): Knex {
  const { postProcessResponse, wrapIdentifier } = knexSnakeCaseMappers()

  const settings = {
    ...databaseSettings,
    postProcessResponse,
    wrapIdentifier,
  }

  const knexConn = knex(settings)

  Model.knex(knexConn)

  return knexConn
}
