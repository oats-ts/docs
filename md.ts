import { resolve } from 'path'
import { cleanMarkdownBundlesFolder } from './md/cleanMarkdownBundlesFolder'
import { API_GURU_SCHEMAS_FILE, MARKDOWN_FOLDER, OATS_SCHEMAS_FILE } from './md/common'
import { generateMarkdownBundles } from './md/generateMarkdownBundles'
import { generateMarkdownPageDescriptors } from './md/generateMarkdownPageDescriptors'
import { generateMarkdownType } from './md/generateMarkdownType'
import { generateQuickStartContent } from './md/generateQuickStartContent'
import { generateSchemaItems } from './md/generateSchemaItems'
import { getApiGuruSchemaItems } from './md/getApiGuruSchemaItems'
import { getMarkdownContent } from './md/getMarkdownContent'
import { getOatsSchemaItems } from './md/getOatsSchemaItems'

export async function generateMarkdownRelated() {
  const markdownData = await getMarkdownContent(resolve(MARKDOWN_FOLDER))
  await cleanMarkdownBundlesFolder()
  await generateMarkdownType(markdownData)
  await generateMarkdownBundles(markdownData)
  await generateMarkdownPageDescriptors(markdownData)
  await generateQuickStartContent()

  const apiGuruSchemas = await getApiGuruSchemaItems()
  const oatsSchemas = await getOatsSchemaItems()

  await generateSchemaItems(apiGuruSchemas, 'apiGuruSchemas', API_GURU_SCHEMAS_FILE)
  await generateSchemaItems(oatsSchemas, 'oatsSchemas', OATS_SCHEMAS_FILE)
}

generateMarkdownRelated()
