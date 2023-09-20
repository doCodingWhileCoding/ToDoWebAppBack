import mongoose from 'mongoose'
import config from '../../config/dotenv.js'

export const start_DB_Connection = async () => {
  try {
    let mongoSRV = ''
    let db
    mongoose.set('strictQuery', true)
    if (process.env.NODE_ENV == 'local' || process.env.NODE_ENV == 'test') {
      mongoSRV = `mongodb://${config.MONGO_SERVICE_NAME}/${config.DB_NAME}`
      db = await mongoose.connect(mongoSRV)
    } else if (process.env.NODE_ENV == 'development') {
      mongoSRV = config.MONGO_SRV
      db = await mongoose.connect(mongoSRV)
    }
    console.log(`${process.env.NODE_ENV} Database is connected to: ${db.connection.host}`)
  } catch (error) {
    console.error(error)
    throw error
  }
}
