import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import React, { FC, useState } from 'react'
import { Button, Dropdown, DropdownProps, Form, Icon, Menu, Modal, StrictDropdownItemProps } from 'semantic-ui-react'
import { defaultGenerators } from '../defaultGenerators'

type ConfigureModalProps = {
  isOpen: boolean
  onChange: (isOpen: boolean) => void
  onComplete: () => void

  // generators: Record<OpenAPIGeneratorTarget, boolean>
}

const options: StrictDropdownItemProps[] = Object.keys(defaultGenerators).map((key) => ({
  text: key,
  value: key,
  key,
}))

export const ConfigureModal: FC<ConfigureModalProps> = ({ isOpen, onChange, onComplete }) => {
  const [selectedGenerators, setSelectedGenerators] = useState<OpenAPIGeneratorTarget[]>(
    () => Object.keys(defaultGenerators) as OpenAPIGeneratorTarget[],
  )
  const onGeneratorsChange = (_: any, data: DropdownProps) => {
    setSelectedGenerators(data.value! as OpenAPIGeneratorTarget[])
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
            <label>First Name</label>
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
        <Button content="Save" labelPosition="right" icon="checkmark" onClick={onComplete} positive />
      </Modal.Actions>
    </Modal>
  )
}
