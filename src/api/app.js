import express from 'express'
import config from '../config/index.js'
import cors from 'cors'
import { corsConfig } from './libs/index.js'
import helmet from 'helmet'
import { globalLimiter } from './libs/index.js'
import morgan from 'morgan'

const app = express()

app.set('port', config.NODE_INTERNAL_PORT)

app.use(cors(corsConfig))
app.use(helmet())
app.use(globalLimiter)

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev')) //Returns information in console about petitions (GET,PUT,POST,DELETE)
}

app.use(express.json())

export default app
