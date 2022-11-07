export function basename(file: string) {
  return file.split('/').at(-1) ?? ''
}

export function isFile(f: string) {
  return basename(f).includes('.')
}
