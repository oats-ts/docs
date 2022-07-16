import 'semantic-ui-css/semantic.min.css'

import React, { FC } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { css } from '@emotion/css'
import { Route, Routes, useLinkClickHandler, useLocation } from 'react-router-dom'
import { GeneratorDemo } from './GeneratorDemo/GeneratorDemo'
import { Documentation } from './Documentation/Documentation'

const appStyle = css`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px 10px 0px 10px;
  height: 100vh;
`

const Home: FC = () => <div>Home</div>

export const App: FC = () => {
  const { pathname } = useLocation()
  return (
    <div className={appStyle}>
      <Menu pointing>
        <Menu.Item header onClick={useLinkClickHandler('')}>
          oats-ts
        </Menu.Item>
        <Menu.Item name="Demo" active={pathname === '/demo'} onClick={useLinkClickHandler('demo')} />
        <Menu.Item name="Documentation" active={pathname.startsWith('/docs')} onClick={useLinkClickHandler('docs')} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon name="github" /> Github
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Routes>
        <Route index element={<Home />} />
        <Route path="demo" element={<GeneratorDemo />} />
        <Route path="docs" element={<Documentation />} />
      </Routes>
    </div>
  )
}
