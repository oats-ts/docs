import { isNil } from 'lodash'
import YAML from 'yamljs'
import { ExactSourceLanguage } from '../types'

type Parser = (input: string) => any
type Serializer = (input: any) => string

const parsers: Parser[] = [(input: string) => JSON.parse(input), (input: string) => YAML.parse(input)]

const serializers: Record<ExactSourceLanguage, Serializer> = {
  json: (input: any) => JSON.stringify(input, null, 2),
  yaml: (input: any) => YAML.stringify(input, 10000, 2),
}

function tryParse(code: string): any | undefined {
  for (let i = 0; i < parsers.length; i += 1) {
    try {
      const parser = parsers[i]!
      return parser(code)
    } catch (e) {}
  }
  return undefined
}

export function tryTransformSource(to: ExactSourceLanguage, code: string): string {
  const parsed = tryParse(code)
  return isNil(parsed) ? code : serializers[to](parsed)
}
