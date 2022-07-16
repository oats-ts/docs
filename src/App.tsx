import 'semantic-ui-css/semantic.min.css'

import React, { FC } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'
import { css } from '@emotion/css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { GeneratorDemo } from './GeneratorDemo/GeneratorDemo'
import { MarkdownView } from './Documentation/MarkdownView'
import { Documentation } from './Documentation/Documentation'

const appStyle = css`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 16px 16px 0px 16px;
  height: 100vh;
`

export const App: FC = () => {
  const { pathname } = useLocation()
  return (
    <div className={appStyle}>
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
      <Routes>
        <Route
          index
          element={
            <Segment raised>
              <MarkdownView page="Home" />
            </Segment>
          }
        />
        <Route path="demo" element={<GeneratorDemo />} />
        <Route path="docs" element={<Documentation />} />
        <Route path="docs/:page" element={<Documentation />} />
      </Routes>
    </div>
  )
}
