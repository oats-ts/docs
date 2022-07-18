import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import { ColorModeSwitch } from './ColorModeSwitch'
import { useColorMode } from './useColorMode'

export const AppMenu: FC = () => {
  const { pathname } = useLocation()
  const { colorMode } = useColorMode()
  return (
    <Menu pointing inverted={colorMode === 'dark'}>
      <Menu.Item header href="#">
        🌱 oats
      </Menu.Item>
      <Menu.Item
        icon="file alternate outline"
        name="Documentation"
        active={pathname.startsWith('/docs')}
        href="#/docs"
      />
      <Menu.Item icon="play circle outline" name="Demo" active={pathname === '/demo'} href="#/demo" />
      <Menu.Menu position="right">
        <ColorModeSwitch />
        <Menu.Item href="https://github.com/oats-ts/oats-ts">
          <Icon name="github alternate" /> Github
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
