import { createHash } from 'crypto'
import d from 'debug'
import envPaths from 'env-paths'
import esbuild from 'esbuild'
import execa from 'execa'
import fs from 'fs'
import path from 'path'
import { performance } from 'perf_hooks'

const debug = d('txa:helper')

const cacheDir = envPaths('txa').cache
const md5 = (s: string) => createHash('md5').update(s, 'utf-8').digest('hex')

const DEFAULT_OUT_DIR = path.join(cacheDir, 'bundled')

export async function bundle(
  file: string,
  { outFile, outDir }: { outFile?: string; outDir?: string } = {}
) {
  file = path.resolve(file)

  if (!outFile) {
    if (!outDir) outDir = DEFAULT_OUT_DIR
    outFile = path.join(outDir, md5(file) + '.js')
  }
  debug('bundle %s -> %s', file, outFile)

  const start = performance.now()
  const buildResult = await esbuild.build({
    entryPoints: [file],
    bundle: true,
    outfile: outFile,
    platform: 'neutral',
    target: 'ES2020',
  })
  const cost = (performance.now() - start).toFixed(0)
  debug('esbuild cost %s ms', cost)

  // remove shebang after build
  {
    let contents = fs.readFileSync(outFile, 'utf8')
    const lines = contents.split('\n')
    const validLines = lines.filter(Boolean).filter((line) => !line.startsWith('//'))

    if (validLines[0].startsWith('#!')) {
      const index = lines.indexOf(validLines[0])
      lines.splice(index, 1)
      contents = lines.join('\n')
      fs.writeFileSync(outFile, contents)
    }
  }

  return outFile
}

export async function exec(jsfile: string, extraArgs: string[] = []) {
  const childProcess = execa('osascript', ['-l', 'JavaScript', jsfile, ...extraArgs], {
    reject: false,
  })

  // instant write logs
  childProcess.stdout.pipe(process.stdout)
  childProcess.stderr.pipe(process.stderr)

  const result = await childProcess

  if (result instanceof Error) {
    const e = result

    // 例如取消 choose file dialog
    if (e.stderr.includes('已取消') && e.stderr.includes('-128')) {
      return
    }

    throw e
  }
}
