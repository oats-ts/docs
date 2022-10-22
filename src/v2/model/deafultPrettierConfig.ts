import { PrettierConfiguration } from '../../types'

export const defaultPrettierConfig: Required<PrettierConfiguration> = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 80,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
}
