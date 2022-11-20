import { promises as fs } from 'fs'
import { join } from 'path'
import { parse, ParsedPath } from 'path'
import { MarkdownData, MARKDOWN_EXTENSION } from './common'

function getLines(fileContent: string): string[] {
  return fileContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

// remark only works as an ESM module so for now this is it :(
function getTitle(lines: string[]): string {
  const title = lines.find((line) => line.startsWith('#'))
  if (title === undefined) {
    return 'Unknown title'
  }
  return title.replace(/#/gm, '').trim()
}

function getDescription(lines: string[]): string {
  const titleIndex = lines.findIndex((line) => line.startsWith('#'))
  if (titleIndex < 0) {
    return 'Unknown description'
  }
  const nextLine = lines[titleIndex + 1]
  if (nextLine === undefined) {
    return 'Unknown description'
  }
  return nextLine.trim().replace(/"/g, "'")
}

async function readMarkdownFile(path: string, parsed: ParsedPath): Promise<MarkdownData> {
  const fullPath = join(path, parsed.base)
  const fileContent = await fs.readFile(fullPath, 'utf-8')
  const lines = getLines(fileContent)

  return {
    fileName: parsed.base,
    varName: parsed.name,
    title: getTitle(lines),
    description: getDescription(lines),
  }
}

export async function getMarkdownContent(path: string): Promise<MarkdownData[]> {
  const paths = (await fs.readdir(path))
    .map((fileName) => parse(fileName))
    .filter(({ ext }) => ext === MARKDOWN_EXTENSION)
  return Promise.all(paths.map((parsed) => readMarkdownFile(path, parsed)))
}
