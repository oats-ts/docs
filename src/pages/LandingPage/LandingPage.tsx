import React, { FC } from 'react'
import { Content } from '../../components/Content'
import { Footer } from '../../components/Footer'
import { Headlines } from './Headlines'
import { HeroSection } from './HeroSection'
import { Header } from './Header'
import { QuickStart } from './QuickStart'
import { AppContainer } from '../../components/AppContainer'
import { MobileHeaderWithOverlay } from '../../components/MobileHeaderWithOverlay'
import { MobileContext, useProvideMobileContext } from '../../components/MobileContext'
import { BreakPoint } from '../../breakpoints'
import { LandingPageMenu } from './LandingPageMenu'
import { links } from '../../links'

const MobileTitleBar: FC = () => {
  const ctx = useProvideMobileContext()
  return (
    <MobileContext.Provider value={ctx}>
      <MobileHeaderWithOverlay version={false} href={links.index()}>
        <LandingPageMenu />
      </MobileHeaderWithOverlay>
    </MobileContext.Provider>
  )
}

export const LandingPage: FC = () => {
  return (
    <AppContainer>
      <Header />
      <BreakPoint Component={MobileTitleBar} breakpoint="phone" />
      <Content>
        <HeroSection />
        <Headlines />
        <QuickStart />
      </Content>
      <Footer />
    </AppContainer>
  )
}
