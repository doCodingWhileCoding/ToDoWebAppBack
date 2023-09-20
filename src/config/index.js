import dotenv from 'dotenv'

dotenv.config()

const config = {
  NODE_INTERNAL_PORT: 3000,
}

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
  config.NODE_INTERNAL_PORT = process.env.LOCAL_NODE_INTERNAL_PORT
}
if (process.env.NODE_ENV === 'development') {
  config.NODE_INTERNAL_PORT = process.env.DEV_NODE_INTERNAL_PORT
}

export default config
