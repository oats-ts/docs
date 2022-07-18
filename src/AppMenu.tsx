import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'

export const AppMenu: FC = () => {
  const { pathname } = useLocation()
  return (
    <Menu pointing>
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
        <Menu.Item href="https://github.com/oats-ts/oats-ts">
          <Icon name="github alternate" /> Github
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
