import { css } from '@emotion/css'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { MarkdownPageName } from '../../../md/markdown'
import { BreakPoint } from '../../breakpoints'
import { DocContainer } from '../../components/DocContainer'
import { MarkdownView } from '../../components/MarkdownView'
import { MobileContext, useProvideMobileContext } from '../../components/MobileContext'
import { MobileHeaderWithOverlay } from '../../components/MobileHeaderWithOverlay'
import { SideBar } from '../../components/SideBar'
import { Logo } from '../../components/Logo'
import { LogoContainer } from '../../components/LogoContainer'
import { theme } from '../../theme'
import { DocumentationMenu } from './DocumentationMenu'

const NAME = 'docs'

const contentContainerStyle = css`
  flex: ${theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.m};
  background-color: ${theme.colors.dark4};
`

const MobileTitleBar: FC = () => {
  const ctx = useProvideMobileContext()
  return (
    <MobileContext.Provider value={ctx}>
      <MobileHeaderWithOverlay name={NAME} version={true} href="#/documentation">
        <DocumentationMenu />
      </MobileHeaderWithOverlay>
    </MobileContext.Provider>
  )
}

export const DocumentationPage: FC = () => {
  const { page } = useParams<{ page: MarkdownPageName }>()
  const activePage = page ?? 'GettingStarted'

  return (
    <DocContainer>
      <SideBar>
        <LogoContainer>
          <Logo name={NAME} version={true} href="#/documentation" />
        </LogoContainer>
        <DocumentationMenu />
      </SideBar>
      <div className={contentContainerStyle}>
        <BreakPoint Component={MobileTitleBar} breakpoint="phone" />
        <MarkdownView page={activePage} />
      </div>
    </DocContainer>
  )
}
