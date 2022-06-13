import path from 'path'
import { install } from '@pnpm/core'
import { prepareEmpty } from '@pnpm/prepare'
import fixtures from '@pnpm/test-fixtures'
import { testDefaults } from '../utils'

const f = fixtures(__dirname)

test('patch package', async () => {
  prepareEmpty()
  const patchPath = path.join(f.find('patch-pkg'), 'is-positive@1.0.0.patch')

  await install({
    dependencies: {
      'is-positive': '1.0.0',
    },
    dependenciesMeta: {
      'is-positive': {
        patch: patchPath,
      },
    },
  }, await testDefaults({ fastUnpack: false }))
})
