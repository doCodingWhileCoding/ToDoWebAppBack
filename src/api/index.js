import app from './app.js'

export const start_api = () => {
  app.listen(app.get('port'), () => {
    console.info(`Server on port ${app.get('port')}`)
  })
}
