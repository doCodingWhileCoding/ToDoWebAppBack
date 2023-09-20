import app from './app.js'
import { start_DB_Connection } from './db/index.js'

export const start_api = async () => {
  await start_DB_Connection()
  app.listen(app.get('port'), () => {
    console.info(`Server on port ${app.get('port')}`)
  })
}
