import express from 'express'
import config from '../config/index.js'

const app = express()

app.set('port', config.NODE_INTERNAL_PORT)

export default app
