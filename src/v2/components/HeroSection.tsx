import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { theme } from '../theme'
import { Button } from './Button'
import { breakpoints, ctnr } from '../css'
import { GoOctoface } from 'react-icons/go'
import { HiPlay } from 'react-icons/hi2'
import { Link } from './Link'

const heroSectionStyle = css`
  label: hero-section;
  width: 100%;
  margin: 0px;
  padding: 80px 0px;
  ${breakpoints.desktop} {
    padding: 100px 0px;
  }
  ${breakpoints.tablet} {
    padding: 80px 0px;
  }
`

const contentStyle = css`
  label: hero-section-content;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: 18px;
  height: 100%;
`

const heroText1Style = css`
  label: hero-text-1;
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.text};
  margin: 0px;
  text-align: center;
`

const heroText2Style = css`
  label: hero-text-2;
  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.m};
  font-weight: 400;
  margin: 0px 0px 20px 0px;
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`

const buttonContainer = css`
  label: hero-button-container;
  display: flex;
  gap: 12px;
`

export const HeroSection: FC = () => {
  return (
    <div className={heroSectionStyle}>
      <div className={cx(ctnr, contentStyle)}>
        <h2 className={heroText1Style}>Generate TypeScript from OpenAPI, that makes sense.</h2>
        <h3 className={heroText2Style}>
          Customizable, extensible and <b>open source</b> code generators, that output quality{' '}
          <Link href="https://www.typescriptlang.org">TypeScript</Link>, from your{' '}
          <Link href="https://www.openapis.org">OpenAPI</Link> definitions.
        </h3>
        <div className={buttonContainer}>
          <Button variant="primary">
            <HiPlay /> Get Started
          </Button>
          <Button>
            <GoOctoface /> Github
          </Button>
        </div>
      </div>
    </div>
  )
}
