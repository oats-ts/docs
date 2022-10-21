import React, { FC } from 'react'
import { Content } from '../../components/Content'
import { Footer } from '../../components/Footer'
import { Headlines } from '../../components/Headlines'
import { HeroSection } from '../../components/HeroSection'
import { Header } from '../../components/Header'
import { QuickStart } from '../../components/QuickStart'
import { AppContainer } from '../../components/AppContainer'

export const LandingPage: FC = () => {
  return (
    <AppContainer direction="vertical">
      <Header />
      <Content>
        <HeroSection />
        <Headlines />
        <QuickStart />
      </Content>
      <Footer />
    </AppContainer>
  )
}
