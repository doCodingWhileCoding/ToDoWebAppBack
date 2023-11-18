import dotenv from 'dotenv'

dotenv.config()

const config = {
  NODE_INTERNAL_PORT: 3000,
  FRONT_BASE_URL: 'http://localhost:3000',
  MONGO_SERVICE_NAME: 'mongo',
  DB_NAME: 'mylocaldb',
  MONGO_SRV: '',
  TZ: process.env.TZ || 'Europe/Madrid',
  BCRYPT_SALTROUNDS: 10,
  COMPANY_EMAIL: '',
  COMPANY_EMAIL_APP_PASSWORD: '',
  JWT_ACCESS_SECRET: '',
  JWT_ACCESS_TIME: '10h',
}

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
  config.NODE_INTERNAL_PORT = process.env.LOCAL_NODE_INTERNAL_PORT
  config.FRONT_BASE_URL = process.env.LOCAL_FRONT_BASE_URL
  config.MONGO_SERVICE_NAME = process.env.LOCAL_MONGO_SERVICE_NAME
  config.DB_NAME = process.env.LOCAL_DB_NAME
  config.BCRYPT_SALTROUNDS = process.env.LOCAL_BCRYPT_SALTROUNDS
  config.COMPANY_EMAIL = process.env.LOCAL_COMPANY_EMAIL
  config.COMPANY_EMAIL_APP_PASSWORD = process.env.LOCAL_COMPANY_EMAIL_APP_PASSWORD
  config.JWT_ACCESS_SECRET = process.env.LOCAL_JWT_ACCESS_SECRET
  config.JWT_ACCESS_TIME = process.env.LOCAL_JWT_ACCESS_TIME
}
if (process.env.NODE_ENV === 'development') {
  config.NODE_INTERNAL_PORT = process.env.DEV_NODE_INTERNAL_PORT
  config.FRONT_BASE_URL = process.env.DEV_FRONT_BASE_URL
  config.MONGO_SRV = process.env.DEV_MONGO_SRV
  config.BCRYPT_SALTROUNDS = process.env.DEV_BCRYPT_SALTROUNDS
  config.COMPANY_EMAIL = process.env.DEV_COMPANY_EMAIL
  config.COMPANY_EMAIL_APP_PASSWORD = process.env.DEV_COMPANY_EMAIL_APP_PASSWORD
  config.JWT_ACCESS_SECRET = process.env.DEV_JWT_ACCESS_SECRET
  config.JWT_ACCESS_TIME = process.env.DEV_JWT_ACCESS_TIME
}

export default config
