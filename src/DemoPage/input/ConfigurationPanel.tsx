import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import React, { FC, useContext } from 'react'
import { Dropdown, DropdownProps, Form, StrictDropdownItemProps } from 'semantic-ui-react'
import { GeneratorContext } from '../GeneratorContext'
import { defaultGenerators } from '../defaultGenerators'
import { css } from '@emotion/css'
import { useColorMode } from '../../useColorMode'

const AllGenerators = '###all-generators###'

const configPanelStyle = css`
  height: calc(100vh - 168px);
  overflow-y: auto;
  padding: 16px;
`

const options: StrictDropdownItemProps[] = [
  { text: 'All generators', value: AllGenerators, key: AllGenerators } as StrictDropdownItemProps,
  ...Object.keys(defaultGenerators).map((key) => ({
    text: key,
    value: key,
    key,
  })),
]

export const ConfigurationPanel: FC = () => {
  const { generators, setGenerators } = useContext(GeneratorContext)
  const { colorMode } = useColorMode()

  const selectedGenerators = Object.keys(generators).filter((key) => generators[key as OpenAPIGeneratorTarget])

  const onGeneratorsChange = (_: any, data: DropdownProps) => {
    const selectedKeys = data.value! as string[]
    const updatedGenerators = selectedKeys.includes(AllGenerators)
      ? defaultGenerators
      : Object.keys(defaultGenerators).reduce(
          (gens, key) => ({
            ...gens,
            [key]: selectedKeys.includes(key),
          }),
          {} as Record<OpenAPIGeneratorTarget, boolean>,
        )
    setGenerators(updatedGenerators)
  }

  return (
    <div className={configPanelStyle}>
      <Form inverted={colorMode === 'dark'}>
        <Form.Field>
          <label>Which generators should run?</label>
          <Dropdown
            placeholder="Generators"
            fluid
            multiple
            search
            selection
            clearable
            options={options}
            onChange={onGeneratorsChange}
            value={selectedGenerators}
          />
        </Form.Field>
      </Form>
    </div>
  )
}
