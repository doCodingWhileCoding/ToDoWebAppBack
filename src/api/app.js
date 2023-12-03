import express from 'express'
import config from '../config/dotenv.js'
import cors from 'cors'
import corsConfig from './libs/cors.js'
import helmet from 'helmet'
import globalLimiter from './libs/globalLimiter.js'
import morgan from 'morgan'
import ErrorHandler from './middlewares/ErrorHandler.js'
import errorMessages from './constants/error_messages.js'
import routes from './routes/index.js'

const app = express()

app.set('port', config.NODE_INTERNAL_PORT)

app.use(cors(corsConfig))
app.use(helmet())
app.use(globalLimiter)

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev')) //Returns information in console about petitions (GET,PUT,POST,DELETE)
}

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json('OK')
})
app.use('/', routes)
app.use((req, res, next) => {
  const err = {
    statusCode: 404,
    errMsg: errorMessages.NOT_FOUND,
  }
  next(err)
})

app.use(ErrorHandler)

export default app
