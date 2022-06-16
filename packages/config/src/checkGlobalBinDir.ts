import { promises as fs } from 'fs'
import path from 'path'
import PnpmError from '@pnpm/error'
import { sync as canWriteToDir } from 'can-write-to-dir'
import PATH from 'path-name'

export async function checkGlobalBinDir (
  globalBinDir: string,
  { env, shouldAllowWrite }: { env: Record<string, string | undefined>, shouldAllowWrite?: boolean }
): Promise<void> {
  if (shouldAllowWrite && !canWriteToDirAndExists(globalBinDir)) {
    throw new PnpmError('PNPM_DIR_NOT_WRITABLE', `The CLI has no write access to the pnpm home directory at ${globalBinDir}`)
  }
}

const areDirsEqual = (dir1: string, dir2: string) =>
  path.relative(dir1, dir2) === ''

function canWriteToDirAndExists (dir: string) {
  try {
    return canWriteToDir(dir)
  } catch (err: any) { // eslint-disable-line
    if (err.code !== 'ENOENT') throw err
    return false
  }
}
