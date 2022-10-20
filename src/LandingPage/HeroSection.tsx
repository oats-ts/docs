import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { theme } from '../theme'
import { Button } from './Button'
import { breakpoints, ctnr } from './css'
import { GoOctoface } from 'react-icons/go'
import { HiPlay } from 'react-icons/hi2'
import { Link } from './Link'

const bannerContainerStyle = css`
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

const bannerContentStyle = css`
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: 18px;
  height: 100%;
`

const calloutText1Style = css`
  font-size: ${theme.font.xl};
  color: ${theme.colors.text};
  margin: 0px;
  text-align: center;
`

const calloutText2Style = css`
  color: ${theme.colors.muted};
  font-size: ${theme.font.m};
  font-weight: 400;
  margin: 0px 0px 20px 0px;
  width: 70%;
  text-align: center;
  flex-shrink: 0;
`

const buttonContainer = css`
  display: flex;
  gap: 12px;
`

export const HeroSection: FC = () => {
  return (
    <div className={bannerContainerStyle}>
      <div className={cx(ctnr, bannerContentStyle)}>
        <h2 className={calloutText1Style}>Generate TypeScript from OpenAPI, that makes sense.</h2>
        <h3 className={calloutText2Style}>
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
