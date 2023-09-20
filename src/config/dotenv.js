import dotenv from 'dotenv'

dotenv.config()

const config = {
  NODE_INTERNAL_PORT: 3000,
  FRONT_BASE_URL: 'http://localhost:3000',
  MONGO_SERVICE_NAME: 'mongo',
  DB_NAME: 'mylocaldb',
  MONGO_SRV: '',
}

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
  config.NODE_INTERNAL_PORT = process.env.LOCAL_NODE_INTERNAL_PORT
  config.FRONT_BASE_URL = process.env.LOCAL_FRONT_BASE_URL
  config.MONGO_SERVICE_NAME = process.env.LOCAL_MONGO_SERVICE_NAME
  config.DB_NAME = process.env.LOCAL_DB_NAME
}
if (process.env.NODE_ENV === 'development') {
  config.NODE_INTERNAL_PORT = process.env.DEV_NODE_INTERNAL_PORT
  config.FRONT_BASE_URL = process.env.DEV_FRONT_BASE_URL
  config.MONGO_SRV = process.env.DEV_MONGO_SRV
}

export default config
