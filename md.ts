import { resolve } from 'path'
import { cleanMarkdownBundlesFolder } from './md/cleanMarkdownBundlesFolder'
import { MARKDOWN_FOLDER } from './md/common'
import { generateMarkdownBundles } from './md/generateMarkdownBundles'
import { generateMarkdownPageDescriptors } from './md/generateMarkdownPageDescriptors'
import { generateMarkdownType } from './md/generateMarkdownType'
import { generateQuickStartContent } from './md/generateQuickStartContent'
import { getMarkdownContent } from './md/getMarkdownContent'

export async function generateMarkdownRelated() {
  const data = await getMarkdownContent(resolve(MARKDOWN_FOLDER))
  await cleanMarkdownBundlesFolder()
  await generateMarkdownType(data)
  await generateMarkdownBundles(data)
  await generateMarkdownPageDescriptors(data)
  await generateQuickStartContent()
}

generateMarkdownRelated()
