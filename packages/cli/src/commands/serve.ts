import { Command } from 'commander'

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run serve on', '4000')
  .action((filename = 'notebook.js', options) => {
    console.log(filename, options)
  })
