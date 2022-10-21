import { css, cx } from '@emotion/css'
import { version } from '@oats-ts/oats-ts'
import React, { FC, Fragment } from 'react'
import { HiChevronRight } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import { MarkdowPageName } from '../../../md/markdown'
import { AppContainer } from '../../components/AppContainer'
import { Logo } from '../../components/Logo'
import { MarkdownView } from '../../components/MarkdownView'
import { theme } from '../../theme'
import { sections } from './sections'

const menuStyle = css`
  label: documentation-menu;
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  overflow: auto;
`

const logoContainerStyle = css`
  label: menu-logo;
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  margin-bottom: 40px;
  /* margin: 18px 18px 40px 18px; */
`

const labelWrapperStyle = css`
  display: flex;
  flex-direction: column;
`

const oatsLabelStyle = css`
  label: menu-oats-label;
  font-weight: 700;
  margin: 0px;
  padding: 0px;
  font-size: ${theme.font.l};
  color: ${theme.colors.text};
`

const docLabelStyle = css`
  color: ${theme.colors.muted};
`

const versionLabelStyle = css`
  font-size: ${theme.font.s};
  color: ${theme.colors.muted};
`

const sectionContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
`

const docItemStyle = css`
  display: flex;
  flex-direction: row;
  font-size: ${theme.font.m};
  color: ${theme.colors.muted};
  padding: 10px 14px;
  transition: background-color 150ms linear, color 150ms linear;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${theme.colors.dark1};
  }
`

const docItemLabelStyle = css`
  flex: 1 1 1px;
`

const activeDocItemStyle = css`
  background-color: ${theme.colors.dark1};
  color: ${theme.colors.text};
`

const sectionTitleStyle = css`
  font-size: ${theme.font.m};
  color: ${theme.colors.text};
  text-transform: uppercase;
  font-weight: bold;
  padding: 10px 14px;
`

const contentContainerStyle = css`
  flex: 1 1 1px;
  overflow: auto;
  padding: 20px 20px 20px 10px;
  color: ${theme.colors.muted};
  font-size: ${theme.font.m};
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
      <div className={menuStyle}>
        <a className={logoContainerStyle} href="#">
          <Logo width={60} />
          <div className={labelWrapperStyle}>
            <h1 className={oatsLabelStyle}>
              Oats <span className={docLabelStyle}>docs</span>
            </h1>
            <span className={versionLabelStyle}>v{version}</span>
          </div>
        </a>
        {sections.map((section) => (
          <Fragment key={section.name}>
            <div className={sectionTitleStyle}>{section.name}</div>
            <div className={sectionContainerStyle}>
              {section.items.map((item) => {
                const href = `#/documentation/${item.md}`
                const isActive = item.md === activePage
                const itemClassName = isActive ? cx(docItemStyle, activeDocItemStyle) : docItemStyle
                return (
                  <a href={href} className={itemClassName}>
                    <span className={docItemLabelStyle}>{item.name}</span> {isActive && <HiChevronRight />}
                  </a>
                )
              })}
            </div>
          </Fragment>
        ))}
      </div>
      <div className={contentContainerStyle}>
        <MarkdownView page={activePage} />
      </div>
    </AppContainer>
  )
}
