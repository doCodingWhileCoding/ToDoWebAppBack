import express from 'express'
import config from '../config/index.js'
import cors from 'cors'
import { corsConfig } from './libs/index.js'
import helmet from 'helmet'
import { globalLimiter } from './libs/index.js'

const app = express()

app.set('port', config.NODE_INTERNAL_PORT)

app.use(cors(corsConfig))
app.use(helmet())
app.use(globalLimiter)

export default app
