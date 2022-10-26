import { css } from '@emotion/css'
import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { MarkdowPageName } from '../../../md/markdown'
import { BreakPoint } from '../../breakpoints'
import { DocContainer } from '../../components/DocContainer'
import { MarkdownView } from '../../components/MarkdownView'
import { MobileContext, useProvideMobileContext } from '../../components/MobileContext'
import { MobileHeaderWithOverlay } from '../../components/MobileHeaderWithOverlay'
import { SideBar } from '../../components/SideBar'
import { SideBarLogo } from '../../components/SideBarLogo'
import { theme } from '../../theme'
import { DocumentationMenu } from './DocumentationMenu'

const NAME = 'docs'

const contentContainerStyle = css`
  flex: 1 1 1px;
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
      <MobileHeaderWithOverlay name={NAME}>
        <DocumentationMenu />
      </MobileHeaderWithOverlay>
    </MobileContext.Provider>
  )
}

export const DocumentationPage: FC = () => {
  const { page } = useParams<{ page: MarkdowPageName }>()
  const activePage = page ?? 'OpenAPI_GettingStarted'

  return (
    <DocContainer>
      <SideBar>
        <SideBarLogo name={NAME} />
        <DocumentationMenu />
      </SideBar>
      <div className={contentContainerStyle}>
        <BreakPoint Component={MobileTitleBar} breakpoint="phone" />
        <MarkdownView page={activePage} />
      </div>
    </DocContainer>
  )
}
