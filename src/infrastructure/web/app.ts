import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import routes from '@web/routes'

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())

app.use(express.json())

app.use(routes)

export default app
