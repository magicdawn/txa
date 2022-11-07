#!/usr/bin/env txa
/// <reference types='@jxa/global-type' />

import { basename, isFile } from './helper'

const appPathFinder = Application('Path Finder')
appPathFinder.includeStandardAdditions = true

const app = Application.currentApplication()
app.includeStandardAdditions = true

type PathType = ReturnType<typeof Path>

function processFile(files: PathType[]) {
  if (!Array.isArray(files)) files = [files]
  const filepaths = files.map((f) => f.toString()).filter((f) => isFile(f))
  // app.displayNotification(Automation.getDisplayString(files))

  const targetDir = app.chooseFolder()
  console.log('target dir: %s', targetDir)

  filepaths.forEach((f) => {
    moveFileTo(f, targetDir)
  })
}

function getPathFinderSelected() {
  return (appPathFinder.selection()?.[0]?.posixPath() as string) ?? ''
}

function moveFileTo(file: string, dir: string) {
  const cmd = `mv '${file}' '${dir}/${basename(file)}'`

  console.log('will exec cmd => %s', cmd)
  // app.displayNotification(cmd)

  app.doShellScript(cmd)
}

// to escape tree-shaking
globalThis.keep = run

function run(input: PathType[], parameters: unknown) {
  if (!input?.length) return
  processFile(input)
  app.displayNotification('success')
}

// console.log(1)
// processFile([Path(getPathFinderSelected())])
// getPathFinderSelected()
