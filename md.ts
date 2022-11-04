import { cleanMarkdownBundlesFolder } from './md/cleanMarkdownBundlesFolder'
import { generateMarkdownBundles } from './md/generateMarkdownBundles'
import { generateMarkdownPageDescriptors } from './md/generateMarkdownPageDescriptors'
import { generateMarkdownType } from './md/generateMarkdownType'
import { getMarkdownContent } from './md/getMarkdownContent'

export async function generateMarkdownRelated() {
  const data = await getMarkdownContent()
  await cleanMarkdownBundlesFolder()
  await generateMarkdownType(data)
  await generateMarkdownBundles(data)
  await generateMarkdownPageDescriptors(data)
}

generateMarkdownRelated()
