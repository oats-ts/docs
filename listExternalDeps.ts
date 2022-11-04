import { Dirent } from 'fs'
import { readdir, readFile } from 'fs/promises'
import { join, resolve } from 'path'

const IGNORED_EXTENSIONS: string[] = []

function collectExternalPackages(path: string, source: string, externals: Map<string, string[]>) {
  source
    .split('\n')
    .filter((line) => line.startsWith('import ') && line.includes(' from '))
    .map((line) => line.split(' from ')?.[1]?.trim().replace(/"/g, '').replace(/'/g, '') ?? '')
    .filter((pkg) => !pkg.startsWith('.'))
    .forEach((pkg) => {
      if (!externals.has(pkg)) {
        externals.set(pkg, [])
      }
      externals.get(pkg)?.push(path)
    })
}

async function processItem(path: string, item: Dirent, externals: Map<string, string[]>): Promise<void> {
  if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))) {
    const source = await readFile(path, 'utf-8')
    collectExternalPackages(path, source, externals)
  } else if (item.isDirectory()) {
    const items = await readdir(path, { withFileTypes: true })
    const filteredItems = items.filter((item) => IGNORED_EXTENSIONS.every((ext) => !item.name.endsWith(ext)))
    await Promise.all(filteredItems.map((child) => processItem(join(path, child.name), child, externals)))
  }
}

async function listExternalDeps() {
  const rootFolders = await readdir(resolve(), { withFileTypes: true })
  const externals = new Map<string, string[]>()

  await processItem(resolve(), rootFolders.find((folder) => folder.name === 'src')!, externals)

  for (const [pkg, files] of externals.entries()) {
    console.log(`Package "${pkg}" in:`)
    files.forEach((file) => console.log(`  ${file}`))
    console.log()
  }
}

listExternalDeps()
