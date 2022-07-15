import React, { FC } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'
import { SampleEditor } from './SampleEditor'
import { css } from '@emotion/css'
import 'semantic-ui-css/semantic.min.css'

const segmentStyle = css`
  padding: 10px 0px 0px 0px !important;
  overflow: hidden;
`

const appStyle = css`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px 10px 0px 10px;
  height: 100vh;
`

const contentContainerStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`

const columnStyle = css`
  border-radius: 4px;
  background-color: #fff;
`

export const App: FC = () => {
  return (
    <div className={appStyle}>
      <Menu pointing>
        <Menu.Item header>oats-ts</Menu.Item>
        <Menu.Item name="Demo" active />
        <Menu.Item name="Documentation" />
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon name="github" /> Github
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <div className={contentContainerStyle}>
        <div className={columnStyle}>
          <Menu attached="top" secondary>
            <Menu.Item header>OpenAPI input</Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Icon name="cog" /> Configure
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Segment raised attached className={segmentStyle}>
            <SampleEditor />
          </Segment>
          <Menu attached="bottom">
            <Menu.Item header>oats-ts</Menu.Item>
            <Menu.Item name="Demo" active />
            <Menu.Item name="Documentation" />
          </Menu>
        </div>
        <div className={columnStyle}>
          <Menu attached="top" secondary>
            <Menu.Item header>Typescript output</Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Icon name="cog" /> Configure
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Segment raised attached className={segmentStyle}>
            <SampleEditor />
          </Segment>
          <Menu attached="bottom">
            <Menu.Item header>oats-ts</Menu.Item>
            <Menu.Item name="Demo" active />
            <Menu.Item name="Documentation" />
          </Menu>
        </div>
      </div>
    </div>
  )
}
