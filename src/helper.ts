import { createHash } from 'crypto'
import d from 'debug'
import envPaths from 'env-paths'
import esbuild from 'esbuild'
import execa from 'execa'
import path from 'path'

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

  const buildResult = await esbuild.build({
    entryPoints: [file],
    bundle: true,
    outfile: outFile,
    platform: 'neutral',
    target: 'ES2020',
  })

  return outFile
}

export async function exec(jsfile: string) {
  const childProcess = execa('osascript', ['-l', 'JavaScript', jsfile], {
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
