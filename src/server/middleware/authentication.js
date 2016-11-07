export default function authentication(app, cb) {
  app.enableAuth()

  cb()
}
