import React, { FC } from 'react'
import {
  Checkbox,
  CheckboxProps,
  Dropdown,
  DropdownProps,
  Form,
  Input,
  InputOnChangeData,
  StrictDropdownItemProps,
} from 'semantic-ui-react'
import { PrettierConfiguration } from '../../../types'

export type PrettierConfigurationEditorProps = {
  value: PrettierConfiguration
  isDark: boolean
  disabled: boolean
  onChange: (config: PrettierConfiguration) => void
}

type PrettierEOFDropdownItemProps = StrictDropdownItemProps & { value: PrettierConfiguration['endOfLine'] }
type QuotePropsDropdownItemProps = StrictDropdownItemProps & { value: PrettierConfiguration['quoteProps'] }
type ArrowParensDropdownItemProps = StrictDropdownItemProps & { value: PrettierConfiguration['arrowParens'] }
type TrailingCommaDropdownItemProps = StrictDropdownItemProps & { value: PrettierConfiguration['trailingComma'] }

const prettierEOFOptions: PrettierEOFDropdownItemProps[] = [
  { value: 'lf', text: 'LF' },
  { value: 'crlf', text: 'CRLF' },
]

const quotePropsOptions: QuotePropsDropdownItemProps[] = [
  { value: 'as-needed', text: 'as-needed' },
  { value: 'consistent', text: 'consistent' },
  { value: 'preserve', text: 'preserve' },
]

const arrowParentsOptions: ArrowParensDropdownItemProps[] = [
  { value: 'always', text: 'always' },
  { value: 'avoid', text: 'avoid' },
]

const trailingCommaOptions: TrailingCommaDropdownItemProps[] = [
  { value: 'none', text: 'none' },
  { value: 'es5', text: 'es5' },
  { value: 'all', text: 'all' },
]

export const PrettierConfigurationEditor: FC<PrettierConfigurationEditorProps> = ({
  isDark,
  value,
  disabled,
  onChange,
}) => {
  const onArrowParensChange = (_: any, data: DropdownProps) => {
    const arrowParens = data.value! as PrettierConfiguration['arrowParens']
    onChange({ ...value, arrowParens })
  }
  const onBracketSamelLineChange = (_: any, data: CheckboxProps) => {
    onChange({ ...value, bracketSameLine: Boolean(data.checked) })
  }
  const onBracketsSpacingChange = (_: any, data: CheckboxProps) => {
    onChange({ ...value, bracketSpacing: Boolean(data.checked) })
  }
  const onEndOfLineChange = (_: any, data: DropdownProps) => {
    const endOfLine = data.value! as PrettierConfiguration['endOfLine']
    onChange({ ...value, endOfLine })
  }
  const onPrintWidthChange = (_: any, data: InputOnChangeData) => {
    const valueStr = data.value as string
    const printWidth = valueStr.length > 0 ? Number(valueStr) : undefined
    onChange({ ...value, printWidth })
  }
  const onQuotePropsChange = (_: any, data: DropdownProps) => {
    const quoteProps = data.value! as PrettierConfiguration['quoteProps']
    onChange({ ...value, quoteProps })
  }
  const onSemiChange = (_: any, data: CheckboxProps) => {
    onChange({ ...value, semi: Boolean(data.checked) })
  }
  const onSingleQuoteChange = (_: any, data: CheckboxProps) => {
    onChange({ ...value, singleQuote: Boolean(data.checked) })
  }
  const onTabWidthChange = (_: any, data: InputOnChangeData) => {
    const valueStr = data.value as string
    const tabWidth = valueStr.length > 0 ? Number(valueStr) : undefined
    onChange({ ...value, tabWidth })
  }
  const onTrailingCommaChange = (_: any, data: DropdownProps) => {
    const trailingComma = data.value! as PrettierConfiguration['trailingComma']
    onChange({ ...value, trailingComma })
  }
  const onUseTabsChange = (_: any, data: CheckboxProps) => {
    onChange({ ...value, useTabs: Boolean(data.checked) })
  }

  return (
    <Form inverted={isDark}>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#arrow-function-parentheses">arrowParens</a>
        </label>
        <Dropdown
          placeholder="arrowParens"
          fluid
          selection
          disabled={disabled}
          options={arrowParentsOptions}
          onChange={onArrowParensChange}
          value={value.arrowParens ?? ''}
        />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#end-of-line">endOfLine</a>
        </label>
        <Dropdown
          placeholder="arrowParens"
          fluid
          selection
          disabled={disabled}
          options={prettierEOFOptions}
          onChange={onEndOfLineChange}
          value={value.endOfLine ?? ''}
        />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#quote-props">quoteProps</a>
        </label>
        <Dropdown
          placeholder="quoteProps"
          fluid
          selection
          disabled={disabled}
          options={quotePropsOptions}
          onChange={onQuotePropsChange}
          value={value.quoteProps ?? ''}
        />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#trailing-commas">trailingComma</a>
        </label>
        <Dropdown
          placeholder="trailingComma"
          fluid
          selection
          disabled={disabled}
          options={trailingCommaOptions}
          onChange={onTrailingCommaChange}
          value={value.trailingComma ?? ''}
        />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#print-width">printWidth</a>
        </label>
        <Input
          disabled={disabled}
          placeholder="arrowParens"
          fluid
          type="number"
          onChange={onPrintWidthChange}
          value={value.printWidth ?? ''}
        />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#tab-width">tabWidth</a>
        </label>
        <Input
          disabled={disabled}
          placeholder="tabWidth"
          fluid
          type="number"
          onChange={onTabWidthChange}
          value={value.tabWidth ?? ''}
        />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#bracket-line">bracketSameLine</a>
        </label>
        <Checkbox
          disabled={disabled}
          placeholder="bracketSameLine"
          onChange={onBracketSamelLineChange}
          checked={value.bracketSameLine ?? false}
        />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#bracket-spacing">bracketSpacing</a>
        </label>
        <Checkbox
          disabled={disabled}
          placeholder="bracketSpacing"
          onChange={onBracketsSpacingChange}
          checked={value.bracketSpacing ?? false}
        />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#semicolons">semi</a>
        </label>
        <Checkbox disabled={disabled} placeholder="semi" onChange={onSemiChange} checked={value.semi ?? false} />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#quotes">singleQuote</a>
        </label>
        <Checkbox
          disabled={disabled}
          placeholder="singleQuote"
          onChange={onSingleQuoteChange}
          checked={value.singleQuote ?? false}
        />
      </Form.Field>
      <Form.Field>
        <label>
          <a href="https://prettier.io/docs/en/options.html#tabs">useTabs</a>
        </label>
        <Checkbox
          disabled={disabled}
          placeholder="useTabs"
          onChange={onUseTabsChange}
          checked={value.useTabs ?? false}
        />
      </Form.Field>
    </Form>
  )
}
