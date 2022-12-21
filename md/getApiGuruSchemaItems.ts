import { fetch } from 'cross-fetch'
import { isEmpty, isNil, truncate } from 'lodash'
import { SchemaItem } from '../src/types'
import { SchemaDescription } from './common'

const HTML_REGEX = /<\/?[\w\s]*>|<.+[\W]>/g
const MARKDOWN_LINK_REGEX = /\[([^\[\]]*)\]\((.*?)\)/gm
const WHITESPACE_REGEX = /\s+/g
const NON_WORD_REGEX = /[^a-z0-9\s\.,]/gi
const API_GURU_URL = 'https://api.apis.guru/v2/list.json'

function takeFirstSentence(text: string) {
  const sentences = text.split('. ')
  if (sentences.length === 1) {
    return text
  }
  return sentences[0]
}

function clearDescription(text?: string) {
  if (isNil(text)) {
    return text
  }
  const processed = truncate(
    takeFirstSentence(
      text
        .replace(HTML_REGEX, '')
        .replace(MARKDOWN_LINK_REGEX, '$1')
        .replace(NON_WORD_REGEX, ' ')
        .replace(WHITESPACE_REGEX, ' ')
        .trim(),
    ),
    {
      length: 100,
      omission: '...',
      separator: ' ',
    },
  )
  return isEmpty(processed) ? undefined : processed
}

export async function getApiGuruSchemaItems(): Promise<SchemaItem[]> {
  const response = await fetch(API_GURU_URL)
  const body = (await response.json()) as Record<string, SchemaDescription>

  const items = Object.values(body)
  const openApiItems = items.filter((item) => item.versions[item.preferred]?.openapiVer?.startsWith('3'))

  const data = openApiItems.map((value): SchemaItem => {
    const versionObj = value.versions[value.preferred]!
    const infoObj = versionObj.info

    const name = isEmpty(infoObj.title) ? undefined : infoObj.title
    const description = clearDescription(infoObj.description)
    const image = infoObj['x-logo'].url
    const url = versionObj.swaggerUrl
    const provider = infoObj['x-providerName']

    return { name, description, image, url, provider }
  })

  return data
}
