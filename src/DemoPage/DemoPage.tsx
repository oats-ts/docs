import 'semantic-ui-css/semantic.min.css'

import React, { FC } from 'react'
import { css } from '@emotion/css'
import { OpenAPIPanel } from './input/OpenAPIPanel'
import { TypescriptPanel } from './output/TypescriptPanel'
import { useGeneratorContext } from './useGenerator'
import { GeneratorContext } from './GeneratorContext'
import { usePageTitle } from '../usePageTitle'
import { ColorMode } from '../types'
import { useColorMode } from '../useColorMode'

const contentContainerStyle = css`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 1fr);
  grid-gap: 16px;
`

const columnStyle = (mode: ColorMode) => css`
  border-radius: 4px;
  background-color: ${mode === 'dark' ? '#1b1c1d' : '#fff'};
`

export const DemoPage: FC = () => {
  const context = useGeneratorContext()
  const { colorMode } = useColorMode()
  usePageTitle('Demo')
  return (
    <GeneratorContext.Provider value={context}>
      <div className={contentContainerStyle}>
        <div className={columnStyle(colorMode)}>
          <OpenAPIPanel />
        </div>
        <div className={columnStyle(colorMode)}>
          <TypescriptPanel />
        </div>
      </div>
    </GeneratorContext.Provider>
  )
}
