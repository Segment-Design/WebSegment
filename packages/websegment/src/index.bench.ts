import { scanDir } from '@websegment/sigma'
import { bench } from 'vitest'
import { compile } from '.'

// FOLDER=path/to/folder vitest bench
const root = process.env.FOLDER || process.cwd()
const css = String.raw

bench('compile', async () => {
  let { candidates } = scanDir({ base: root, globs: true })

  compile(css`
    @websegment utilities;
  `).build(candidates)
})
