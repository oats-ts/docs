import { css } from '@emotion/css'
import React, { FC } from 'react'
import { theme } from '../theme'
import { Content } from './Content'
import { Footer } from './Footer'
import { Headlines } from './Headlines'
import { HeroSection } from './HeroSection'
import { Header } from './Header/Header'
import { QuickStart } from './QuickStart'

const containerStyle = css`
  max-width: 100vw;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  background-color: ${theme.colors.dark2};
`

export const LandingPage: FC = () => {
  return (
    <div className={containerStyle}>
      <Header />
      <HeroSection />
      <Content>
        <Headlines />
        <QuickStart />
      </Content>
      <Footer />
    </div>
  )
}
