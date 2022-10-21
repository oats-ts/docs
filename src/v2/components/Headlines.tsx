import { css } from '@emotion/css'
import React, { FC } from 'react'
import { HiBookOpen, HiPuzzlePiece, HiServerStack, HiWrenchScrewdriver } from 'react-icons/hi2'
import { theme } from '../theme'
import { Button } from './Button'
import { breakpoints } from '../css'

const containerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 24px;

  ${breakpoints.phone} {
    flex-direction: column;
    gap: 50px;
  }
`

const itemContainerStyle = css`
  color: ${theme.colors.muted};
  font-size: ${theme.font.m};
`

const itemHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  color: ${theme.colors.text};
  font-size: ${theme.font.m};
  margin-top: 0px;
`

const itemContentStyle = css`
  margin-bottom: 24px;
  flex: 1 1 1px;
`

export const Headlines: FC = () => {
  return (
    <div className={containerStyle}>
      <div className={itemContainerStyle}>
        <h3 className={itemHeaderStyle}>
          <HiPuzzlePiece />
          Generate an SDK
        </h3>
        <section className={itemContentStyle}>
          Create an easy to use, statically typed SDK for your backend, with all the bells and whistles, and either use
          it in house, or expose it to your customers.
        </section>
        <Button>
          <HiBookOpen />
          Learn more
        </Button>
      </div>
      <div className={itemContainerStyle}>
        <h3 className={itemHeaderStyle}>
          <HiServerStack />
          Generate the backend
        </h3>
        <section className={itemContentStyle}>
          Generate all the tedious parts of your backend, like routing, parameter and body parsing and serialization,
          and CORS, and just implement moving data.
        </section>
        <Button>
          <HiBookOpen />
          Learn more
        </Button>
      </div>
      <div className={itemContainerStyle}>
        <h3 className={itemHeaderStyle}>
          <HiWrenchScrewdriver />
          Customize generators
        </h3>
        <section className={itemContentStyle}>
          The available generators don't fully suit your needs, or you need more? Customize existing generators, or
          create your own, without writing everything from scratch.
        </section>
        <Button>
          <HiBookOpen />
          Learn more
        </Button>
      </div>
    </div>
  )
}
