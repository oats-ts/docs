import { fetch } from 'cross-fetch'
import { parse } from 'yaml'
import { OpenAPIObject } from '@oats-ts/openapi-model'
import { getSampleFiles } from '../src/model/getSampleFiles'
import { SchemaItem } from '../src/types'

export async function getOatsSchemaItems() {
  const paths = await getSampleFiles()
  const files = await Promise.all(
    paths.map((url) =>
      fetch(url)
        .then((res) => res.text())
        .then((text): [string, OpenAPIObject] => [url, url.endsWith('yaml') ? parse(text) : JSON.parse(text)]),
    ),
  )
  return files
    .map(([url, obj]): SchemaItem => {
      return {
        url,
        name: obj.info.title,
        description: obj.info.description,
        provider: 'oats',
        image: 'https://oats-ts.github.io/docs/logo.png',
      }
    })
    .sort((a, b) => (a.name ?? '')?.localeCompare(b.name ?? ''))
}
