import config from '../../config/dotenv.js'
const corsConfig = {
  origin: config.FRONT_BASE_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
export default corsConfig
