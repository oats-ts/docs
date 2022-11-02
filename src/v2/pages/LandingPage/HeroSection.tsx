import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { theme } from '../../theme'
import { Button } from '../../components/Button'
import { breakpoints } from '../../breakpoints'
import { HiPlay, HiCodeBracket } from 'react-icons/hi2'
import { Link } from '../../components/Link'
import { containerStyle } from '../../components/containerStyle'

const heroSectionStyle = css`
  label: hero-section;
  width: 100%;
  margin: ${theme.spacing.zero};
  padding: ${theme.spacing.xh} ${theme.spacing.zero};
  @media ${breakpoints.desktop} {
    padding: ${theme.spacing.xxh} ${theme.spacing.zero};
  }
  @media ${breakpoints.tablet} {
    padding: ${theme.spacing.xh} ${theme.spacing.zero};
  }
`

const contentStyle = css`
  label: hero-section-content;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: ${theme.spacing.xxm};
  height: 100%;
`

const heroText1Style = css`
  label: hero-text-1;
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.text};
  margin: ${theme.spacing.zero};
  text-align: center;
`

const heroText2Style = css`
  label: hero-text-2;
  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.m};
  font-weight: 400;
  margin: ${theme.spacing.zero} ${theme.spacing.zero} ${theme.spacing.xxm} ${theme.spacing.zero};
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`

const buttonContainer = css`
  label: hero-button-container;
  display: flex;
  gap: ${theme.spacing.m};
`

export const HeroSection: FC = () => {
  return (
    <div className={heroSectionStyle}>
      <div className={cx(containerStyle, contentStyle)}>
        <h2 className={heroText1Style}>Generate TypeScript from OpenAPI, that makes sense.</h2>
        <h3 className={heroText2Style}>
          Customizable, extensible and <b>open source</b> code generators, that output quality{' '}
          <Link href="https://www.typescriptlang.org">TypeScript</Link>, from your{' '}
          <Link href="https://www.openapis.org">OpenAPI</Link> definitions.
        </h3>
        <div className={buttonContainer}>
          <Button variant="primary" href="#/documentation/SdkGettingStarted">
            <HiPlay /> Get Started
          </Button>
          <Button href="https://github.com/oats-ts/oats-ts">
            <HiCodeBracket /> Github
          </Button>
        </div>
      </div>
    </div>
  )
}
