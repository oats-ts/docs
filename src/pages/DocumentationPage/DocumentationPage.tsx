import { css } from '@emotion/css'
import React, { FC } from 'react'
import { MarkdownPageName } from '../../md/markdown'
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
import { DocumentationFooter } from './DocumentationFooter'
import { MarkdownContext } from './useMarkdown'
import { links } from '../../links'

const NAME = 'docs'

const contentContainerStyle = css`
  flex: ${theme.flex.grow};
  overflow: auto;
  line-height: 140%;

  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.m};
  background-color: ${theme.colors.dark4};
`

type ControlledDocumentationPage = {
  page: MarkdownPageName
  content: string
}

const MobileTitleBar: FC = () => {
  const ctx = useProvideMobileContext()
  return (
    <MobileContext.Provider value={ctx}>
      <MobileHeaderWithOverlay name={NAME} version={true} href={links.docs()}>
        <DocumentationMenu />
      </MobileHeaderWithOverlay>
    </MobileContext.Provider>
  )
}

export const DocumentationPage: FC<ControlledDocumentationPage> = ({ page, content }) => {
  return (
    <MarkdownContext.Provider value={{ page, content }}>
      <DocContainer>
        <SideBar>
          <LogoContainer>
            <Logo name={NAME} version={true} href={links.docs()} />
          </LogoContainer>
          <DocumentationMenu />
        </SideBar>
        <div className={contentContainerStyle}>
          <BreakPoint Component={MobileTitleBar} breakpoint="phone" />
          <MarkdownView content={content} />
          <DocumentationFooter />
        </div>
      </DocContainer>
    </MarkdownContext.Provider>
  )
}
