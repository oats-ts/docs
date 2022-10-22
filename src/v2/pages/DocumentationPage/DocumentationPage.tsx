import { css } from '@emotion/css'
import React, { FC, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { MarkdowPageName } from '../../../md/markdown'
import { AppContainer } from '../../components/AppContainer'
import { MarkdownView } from '../../components/MarkdownView'
import { SideBar } from '../../components/SideBar'
import { SideBarLogo } from '../../components/SideBarLogo'
import { SideBarSection } from '../../components/SideBarSection'
import { theme } from '../../theme'
import { DocumentationTreeRoot } from './DocumentationTreeRoot'
import { sections } from './sections'

const contentContainerStyle = css`
  flex: 1 1 1px;
  overflow: auto;
  padding: 20px 20px 20px 10px;
  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.m};
  line-height: 140%;
`

const containerStyle = css`
  overflow: hidden;
`

export const DocumentationPage: FC = () => {
  const { page } = useParams<{ page: MarkdowPageName }>()
  const activePage = page ?? 'OpenAPI_GettingStarted'

  return (
    <AppContainer direction="horizontal" className={containerStyle}>
      <SideBar>
        <SideBarLogo name="docs" />
        {sections.map((section) => (
          <Fragment key={section.name}>
            <SideBarSection title={section.name}>
              {section.items.map((item) => (
                <DocumentationTreeRoot node={item} key={item.md} />
                // <SideBarMenuItem href={`#/documentation/${item.md}`} active={item.md === activePage}>
                //   {item.name}
                // </SideBarMenuItem>
              ))}
            </SideBarSection>
          </Fragment>
        ))}
      </SideBar>
      <div className={contentContainerStyle}>
        <MarkdownView page={activePage} />
      </div>
    </AppContainer>
  )
}
