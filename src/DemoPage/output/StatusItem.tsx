import React, { FC, useContext } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { GeneratorContext } from '../GeneratorContext'

export const StatusItem: FC = () => {
  const { result } = useContext(GeneratorContext)
  const { status } = result
  switch (status) {
    case 'working':
      return (
        <Menu.Item>
          <Icon name="circle notch" /> Working...
        </Menu.Item>
      )
    case 'success':
      return (
        <Menu.Item>
          <Icon name="check circle" color="green" /> Success
        </Menu.Item>
      )
    case 'failure':
      return (
        <Menu.Item>
          <Icon name="exclamation circle" color="red" /> Failure
        </Menu.Item>
      )
  }
}
