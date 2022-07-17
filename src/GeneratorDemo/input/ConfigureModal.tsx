import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import React, { FC, useContext, useState } from 'react'
import { Button, Dropdown, DropdownProps, Form, Icon, Menu, Modal, StrictDropdownItemProps } from 'semantic-ui-react'
import { GeneratorContext } from '../GeneratorContext'
import { defaultGenerators } from '../defaultGenerators'

const AllGenerators = '###all-generators###'

const options: StrictDropdownItemProps[] = [
  { text: 'All generators', value: AllGenerators, key: AllGenerators } as StrictDropdownItemProps,
  ...Object.keys(defaultGenerators).map((key) => ({
    text: key,
    value: key,
    key,
  })),
]

export const ConfigureModal: FC = () => {
  const { generators, isConfigurationDialogOpen, setConfigurationDialogOpen, setGenerators } =
    useContext(GeneratorContext)
  const [newGenerators, setNewGenerators] = useState(generators)

  const selectedGenerators = Object.keys(newGenerators).filter((key) => newGenerators[key as OpenAPIGeneratorTarget])

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
    setNewGenerators(updatedGenerators)
  }

  const onSave = () => {
    setGenerators(newGenerators)
    setConfigurationDialogOpen(false)
  }

  return (
    <Modal
      onClose={() => setConfigurationDialogOpen(false)}
      onOpen={() => setConfigurationDialogOpen(true)}
      open={isConfigurationDialogOpen}
      trigger={
        <Menu.Item>
          <Icon name="cog" /> Configure
        </Menu.Item>
      }
    >
      <Modal.Header>Configuration</Modal.Header>
      <Modal.Content>
        <Form>
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
      </Modal.Content>
      <Modal.Actions>
        <Button content="Close" color="black" onClick={() => setConfigurationDialogOpen(false)} />
        <Button
          disabled={generators === newGenerators}
          content="Update"
          labelPosition="right"
          icon="checkmark"
          onClick={onSave}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
