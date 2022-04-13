import { Command } from 'commander'
import { serve } from 'local-api'
import path from 'path'
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run serve on', '5000')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename))
      await serve(parseInt(options.port), path.basename(filename), dir)
      console.log(`Server started on https://localhost:${options.port}`)
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${options.port} is already in use`)
      } else {
        console.log('Here is the error: ', err.message)
      }
    }
  })
