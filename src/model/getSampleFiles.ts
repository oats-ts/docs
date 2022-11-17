import YAML from 'yamljs'
import { ExactSourceLanguage, GhFileDescriptor, SourceLanguage } from '../types'

const REPO = 'oats-ts/oats-schemas'

export async function getSampleFiles(folders: string[]): Promise<string[]> {
  const response = await fetch(`https://api.github.com/repos/${REPO}/git/trees/master?recursive=true`)
  const tree = ((await response.json()) as any).tree as GhFileDescriptor[]
  return tree
    .filter((file) => file.type !== 'tree')
    .filter((file) => folders.some((folder) => file.path.startsWith(`${folder}/`)))
    .filter((file) => file.path.endsWith('.json') || file.path.endsWith('.yaml'))
    .map((file) => file.path)
    .map((path) => `https://raw.githubusercontent.com/${REPO}/master/${path}`)
}

export async function fetchSampleFile(path: string): Promise<string> {
  const response = await fetch(path)
  return response.text()
}

const parsers: Record<ExactSourceLanguage, (input: string) => any> = {
  json: (input) => JSON.parse(input),
  yaml: (input) => YAML.parse(input),
}

export function guessLanguage(source: string, hint: SourceLanguage): ExactSourceLanguage | undefined {
  const firstLanguage: ExactSourceLanguage = hint === 'mixed' ? 'json' : hint
  const secondLanguage: ExactSourceLanguage = firstLanguage === 'json' ? 'yaml' : 'json'

  const attempts: [ExactSourceLanguage, (input: string) => any][] = [
    [firstLanguage, parsers[firstLanguage]],
    [secondLanguage, parsers[secondLanguage]],
  ]

  for (let i = 0; i < attempts.length; i += 1) {
    const [language, parse] = attempts[i]!
    try {
      parse(source)
      return language
    } catch (e) {
      /* Not this language */
    }
  }

  return undefined
}
