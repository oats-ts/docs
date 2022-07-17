import 'semantic-ui-css/semantic.min.css'

import React, { FC } from 'react'
import { css } from '@emotion/css'
import { OpenAPIPanel } from './input/OpenAPIPanel'
import { TypescriptPanel } from './output/TypescriptPanel'
import { useGenerator } from './useGenerator'
import { GeneratorContext } from './GeneratorContext'

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
  const context = useGenerator()

  return (
    <GeneratorContext.Provider value={context}>
      <div className={contentContainerStyle}>
        <div className={columnStyle}>
          <OpenAPIPanel />
        </div>
        <div className={columnStyle}>
          <TypescriptPanel />
        </div>
      </div>
    </GeneratorContext.Provider>
  )
}
