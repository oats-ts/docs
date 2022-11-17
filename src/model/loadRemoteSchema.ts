import { ExactSourceLanguage, SourceLanguage } from '../types'
import { fetchSampleFile, guessLanguage } from './getSampleFiles'

export async function loadRemoteSchema(path: string, hint: SourceLanguage): Promise<[string, ExactSourceLanguage]> {
  const content = await fetchSampleFile(path)
  const type = guessLanguage(content, hint)
  return [content, type ?? 'json']
}
