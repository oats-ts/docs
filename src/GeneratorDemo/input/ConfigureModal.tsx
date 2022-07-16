import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import React, { FC, useContext, useState } from 'react'
import { Button, Dropdown, DropdownProps, Form, Icon, Menu, Modal, StrictDropdownItemProps } from 'semantic-ui-react'
import { ConfigurationContext } from '../ConfigurationContext'
import { defaultGenerators } from '../defaultGenerators'

type ConfigureModalProps = {
  isOpen: boolean
  onChange: (isOpen: boolean) => void
}

const options: StrictDropdownItemProps[] = Object.keys(defaultGenerators).map((key) => ({
  text: key,
  value: key,
  key,
}))

export const ConfigureModal: FC<ConfigureModalProps> = ({ isOpen, onChange }) => {
  const { generators, setGenerators } = useContext(ConfigurationContext)
  const [newGenerators, setNewGenerators] = useState(generators)

  const selectedGenerators = Object.keys(newGenerators).filter((key) => newGenerators[key as OpenAPIGeneratorTarget])

  const onGeneratorsChange = (_: any, data: DropdownProps) => {
    const selectedKeys = data.value! as OpenAPIGeneratorTarget
    const updatedGenerators = Object.keys(defaultGenerators).reduce(
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
    onChange(false)
  }

  return (
    <Modal
      onClose={() => onChange(false)}
      onOpen={() => onChange(true)}
      open={isOpen}
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
        <Button content="Close" color="black" onClick={() => onChange(false)} />
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
