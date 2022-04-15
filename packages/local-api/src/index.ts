import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
export const serve = (port: number, filename: string, dir: string) => {
  const app = express()
  const packagePath = require.resolve('local-package/build/index.html')
  console.log(packagePath)
  app.use(express.static(path.dirname(packagePath)))
  // app.use(express.static('../../local-package/build'))
  // app.use(
  //   createProxyMiddleware('', {
  //     target: 'http://localhost:3000/react-typescript-jbookApp',
  //     ws: true,
  //     logLevel: 'debug',
  //     changeOrigin: true,
  //   }),
  // )

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
}
