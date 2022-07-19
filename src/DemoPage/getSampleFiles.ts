import { GhFileDescriptor } from '../types'

const REPO = 'oats-ts/oats-schemas'

export async function getSampleFiles(folders: string[]): Promise<string[]> {
  const response = await fetch(`https://api.github.com/repos/${REPO}/git/trees/master?recursive=true`)
  const tree = ((await response.json()) as any).tree as GhFileDescriptor[]
  return tree
    .filter((file) => file.type !== 'tree')
    .filter((file) => folders.some((folder) => file.path.startsWith(`${folder}/`)))
    .filter((file) => file.path.endsWith('.json'))
    .map((file) => file.path)
    .map((path) => `https://raw.githubusercontent.com/${REPO}/master/${path}`)
}

export async function getSampleFile(uri: string): Promise<string> {
  const response = await fetch(uri)
  return response.text()
}
