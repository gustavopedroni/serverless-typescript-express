import _ from 'lodash'
import { inspect } from 'util'
import { createLogger, format, transports } from 'winston'

import settings from '@src/infrastructure/config/settings'
import { requestId } from '@src/infrastructure/web/context'

const customFormat = format.printf(({ level, message, timestamp, ...data }) => {
  const metadata = _.omitBy(data, (__, key) => typeof key === 'symbol')

  return inspect(
    {
      requestId,
      level,
      message,
      metadata,
      timestamp,
    },
    {
      showHidden: false,
    },
  ).replace(/\r?\n/g, '')
})

const logger = createLogger({
  level: settings.logLevel ?? 'ERROR',
  format: format.combine(format.timestamp(), format.splat(), customFormat),
  transports: new transports.Console({
    handleExceptions: true,
  }),
  silent: !settings.logLevel,
})

export default logger
