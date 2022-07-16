import 'semantic-ui-css/semantic.min.css'

import React, { FC, useState } from 'react'
import { css } from '@emotion/css'
import { OpenAPIPanel } from './input/OpenAPIPanel'
import { TypescriptPanel } from './output/TypescriptPanel'
import { ConfigurationContextType, SourceType } from '../types'
import { useGenerator } from './useGenerator'
import { OpenAPIGeneratorTarget } from '@oats-ts/openapi-common'
import { storage } from '../storage'
import { ConfigurationContext } from './ConfigurationContext'
import { defaultGenerators } from './defaultGenerators'

const contentContainerStyle = css`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 1fr);
  grid-gap: 16px;
`

const columnStyle = css`
  border-radius: 4px;
  background-color: #fff;
`

export const GeneratorDemo: FC = () => {
  const [source, setSource] = useState<string>(() => storage.get('source'))
  const [sourceType, setSourceType] = useState<SourceType>(() => 'json')
  const [generators, setGenerators] = useState<Record<OpenAPIGeneratorTarget, boolean>>(() => defaultGenerators)

  const result = useGenerator(source, sourceType, generators)

  const config: ConfigurationContextType = {
    sourceType,
    generators,
    setSourceType,
    setGenerators,
  }

  return (
    <ConfigurationContext.Provider value={config}>
      <div className={contentContainerStyle}>
        <div className={columnStyle}>
          <OpenAPIPanel source={source} onSourceChange={setSource} />
        </div>
        <div className={columnStyle}>
          <TypescriptPanel {...result} />
        </div>
      </div>
    </ConfigurationContext.Provider>
  )
}
