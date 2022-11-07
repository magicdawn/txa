import path from 'path'
import yargs from 'yargs'
import { bundle, exec } from './helper'
import fse from 'fs-extra'

yargs
  .scriptName('txa')
  .command(
    '$0 <file>',
    'exec ts file',
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
  .command(
    'build <file> <output>',
    'build ts file to js file',
    (yargs) =>
      yargs.positional('file', { type: 'string' }).positional('output', { type: 'string' }),
    async (argv) => {
      let outFile = ''

      // argv.output is a dir
      if (!argv.output.includes('.js')) {
        outFile = path.join(argv.output, path.basename(argv.file, path.extname(argv.file)) + '.js')
      }

      fse.ensureDirSync(path.dirname(outFile))
      await bundle(argv.file, { outFile })
    }
  )
  .help().argv
