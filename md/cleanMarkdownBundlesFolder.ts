import { promises as fs } from 'fs'
import { resolve } from 'path'
import { MARKDOWN_BUNDLES_FOLDER } from './common'

export async function cleanMarkdownBundlesFolder() {
  await fs.rm(resolve(MARKDOWN_BUNDLES_FOLDER), { force: true, recursive: true })
  await fs.mkdir(resolve(MARKDOWN_BUNDLES_FOLDER))
}
