import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
export const serve = (port: number, filename: string, dir: string) => {
  const app = express()

  // app.use(express.static('../../local-package/build'))
  app.use(
    createProxyMiddleware('', {
      target: 'http://localhost:3000/react-typescript-jbookApp',
      ws: true,
      logLevel: 'debug',
      changeOrigin: true,
    }),
  )

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
}
