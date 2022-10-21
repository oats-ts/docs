import { css } from '@emotion/css'
import { version } from '@oats-ts/oats-ts'
import React, { FC } from 'react'
import { AppContainer } from '../../components/AppContainer'
import { Logo } from '../../components/Logo'
import { MarkdownView } from '../../components/MarkdownView'
import { theme } from '../../theme'

const menuStyle = css`
  label: documentation-menu;
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 14px;
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
const docItemStyle = css`
  font-size: ${theme.font.m};
  color: ${theme.colors.muted};
  padding: 10px 14px;
  transition: background-color 150ms linear;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.dark1};
  }
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
  padding: 14px;
  color: ${theme.colors.muted};
`

export const DocumentationPage: FC = () => {
  return (
    <AppContainer direction="horizontal">
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
        <div className={sectionTitleStyle}>Guides</div>
        <div className={docItemStyle}>Getting started</div>
        <div className={docItemStyle}>Build an SDK</div>
        <div className={docItemStyle}>Build the backend</div>
        <div className={docItemStyle}>Custom generators</div>
        <div className={sectionTitleStyle}>API</div>
        <div className={docItemStyle}>Getting started</div>
        <div className={docItemStyle}>Build an SDK</div>
        <div className={docItemStyle}>Build the backend</div>
        <div className={docItemStyle}>Customize generators</div>
      </div>
      <div className={contentContainerStyle}>
        <MarkdownView page="OpenAPI_Read" />
      </div>
    </AppContainer>
  )
}
