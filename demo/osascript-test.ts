#!/usr/bin/env txa
/// <reference types='@jxa/global-type' />

import { isFile, moveFileTo } from './helper'

const appPathFinder = Application('Path Finder')
appPathFinder.includeStandardAdditions = true

const app = Application.currentApplication()
app.includeStandardAdditions = true

type PathType = ReturnType<typeof Path>

function processFile(files: PathType[] | string[]) {
  if (!Array.isArray(files)) files = [files]
  const filepaths = files.map((f: PathType | string) => f.toString()).filter((f) => isFile(f))
  // app.displayNotification(Automation.getDisplayString(files))

  const targetDir = app.chooseFolder()
  console.log('target dir: %s', targetDir)

  filepaths.forEach((f) => {
    moveFileTo(f, targetDir)
  })
}

// to escape tree-shaking
globalThis.keep = run

// 从 Automator 运行时, input 上级输入为文件, 对于 input = Path[]
// 从 osascript -l 运行时, input = argv, 类型 string []
function run(input: PathType[] | string[]) {
  if (!input.length) return
  processFile(input)
  app.displayNotification('success')
}

// console.log(1)
// processFile([Path(getPathFinderSelected())])
// getPathFinderSelected()
