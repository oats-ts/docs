import 'semantic-ui-css/semantic.min.css'

import React, { FC, useEffect, useState } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { css } from '@emotion/css'
import { OpenAPIPanel } from './input/OpenAPIPanel'
import { TypescriptPanel } from './output/TypescriptPanel'
import { SourceType } from './types'
import { useGenerator } from './useGenerator'
import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { storage } from './storage'
import { defaultGenerators } from './defaultGenerators'

const appStyle = css`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px 10px 0px 10px;
  height: 100vh;
`

const contentContainerStyle = css`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 1fr);
  grid-gap: 10px;
`

const columnStyle = css`
  border-radius: 4px;
  background-color: #fff;
`

export const App: FC = () => {
  const [source, setSource] = useState<string>(() => storage.get('source'))
  const [sourceType] = useState<SourceType>(() => 'json')
  const [generators] = useState<Record<OpenAPIGeneratorTarget, boolean>>(() => defaultGenerators)

  const result = useGenerator(source, sourceType, generators)

  useEffect(() => {
    storage.set('source', source)
  }, [source])

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
          <OpenAPIPanel source={source} sourceType={sourceType} onSourceChange={setSource} />
        </div>
        <div className={columnStyle}>
          <TypescriptPanel {...result} />
        </div>
      </div>
    </div>
  )
}
