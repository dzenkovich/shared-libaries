const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    // [NB:] Unsafe URL mapping, need to add each API BE app uses
    '/tracking-api',
    createProxyMiddleware({
      target: 'https://dev-apps.blumesolutions.com',
      //target: 'http://localhost:8081',
      changeOrigin: true,
    })
  )
}
