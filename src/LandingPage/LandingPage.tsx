import { css } from '@emotion/css'
import React, { FC } from 'react'
import { theme } from '../theme'
import { Content } from './Content'
import { Headlines } from './Headlines'
import { HeroSection } from './HeroSection'
import { Menu } from './Menu/Menu'

const containerStyle = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  background-color: ${theme.colors.dark2};
`

export const LandingPage: FC = () => {
  return (
    <div className={containerStyle}>
      <Menu />
      <HeroSection />
      <Content>
        <Headlines />
      </Content>
    </div>
  )
}
