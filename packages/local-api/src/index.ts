import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createCellRouter } from './routes/cells'

import path from 'path'
export const serve = (
  port: number,
  filename: string,

  dir: string,
  useProxy: boolean,
) => {
  const app = express()
  app.use(createCellRouter(filename, dir))
  if (useProxy) {
    app.use(
      createProxyMiddleware('', {
        target: 'http://localhost:3000/',
        ws: true,
        logLevel: 'debug',
        changeOrigin: true,
      }),
    )
  } else {
    const packagePath = require.resolve(
      '@react-jbook-udemy/local-package/build/index.html',
    )

    app.use(express.static(path.dirname(packagePath)))
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
}
