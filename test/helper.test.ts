import { describe, it } from 'vitest'
import { bundle } from '../src/helper'

describe('helper', () => {
  it('bundle works', async () => {
    await bundle(__dirname + '/../example/example.ts')
  })
})
