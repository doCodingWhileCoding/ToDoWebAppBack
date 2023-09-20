import config from '../../config/dotenv.js'
const corsConfig = {
  origin: config.FRONT_BASE_URL,
}
export default corsConfig
