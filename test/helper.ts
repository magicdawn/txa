import { bundle, exec } from '../src/helper'

describe('helper', () => {
  it('bundle works', async () => {
    await bundle(__dirname + '/../demo/demo.ts')
  })
})
