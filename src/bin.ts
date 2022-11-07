import yargs from 'yargs'
import { bundle, exec } from './helper'

yargs
  .command(
    '$0 <file>',
    'exec TypeScript Automation source file',
    (yargs) => {
      return yargs.positional('file', {
        type: 'string',
      })
    },
    async (argv) => {
      const jsfile = await bundle(argv.file)
      await exec(jsfile)
    }
  )
  .help().argv
