import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import routes from '@src/infrastructure/web/routes'
import logging from '@src/infrastructure/web/middlewares/logging'

const app = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  }),
)
app.use(helmet())
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(logging)
app.use(routes)

export default app
