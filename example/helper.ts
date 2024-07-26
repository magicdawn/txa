const app = Application.currentApplication()
app.includeStandardAdditions = true

export function basename(file: string) {
  return file.split('/').at(-1) ?? ''
}

export function isFile(f: string) {
  return basename(f).includes('.')
}

export function getPathFinderSelected() {
  const finder = Application('Path Finder')
  return (finder.selection()?.[0]?.posixPath() as string) ?? ''
}

export function moveFileTo(file: string, dir: string) {
  const cmd = `mv '${file}' '${dir}/${basename(file)}'`

  console.log('will exec cmd => %s', cmd)
  // app.displayNotification(cmd)

  app.doShellScript(cmd)
}
