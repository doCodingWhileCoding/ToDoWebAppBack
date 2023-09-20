import dotenv from 'dotenv'

dotenv.config()

const config = {
  NODE_INTERNAL_PORT: 3000,
  FRONT_BASE_URL: 'http://localhost:3000',
}

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
  config.NODE_INTERNAL_PORT = process.env.LOCAL_NODE_INTERNAL_PORT
  config.FRONT_BASE_URL = process.env.LOCAL_FRONT_BASE_URL
}
if (process.env.NODE_ENV === 'development') {
  config.NODE_INTERNAL_PORT = process.env.DEV_NODE_INTERNAL_PORT
  config.FRONT_BASE_URL = process.env.DEV_FRONT_BASE_URL
}

export default config
