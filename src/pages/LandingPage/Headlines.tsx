import { css } from '@emotion/css'
import React, { FC } from 'react'
import { HiBookOpen, HiCog6Tooth, HiPuzzlePiece, HiServerStack, HiWrenchScrewdriver } from 'react-icons/hi2'
import { theme } from '../../theme'
import { Button } from '../../components/Button'
import { breakpoints } from '../../breakpoints'
import { links } from '../../links'

const containerStyle = css`
  label: headlines;
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.l};

  @media ${breakpoints.phone} {
    flex-direction: column;
    gap: ${theme.spacing.h};
  }
`

const itemContainerStyle = css`
  label: headlines-items-container;
  color: ${theme.colors.muted};
  display: flex;
  flex-direction: column;
  flex: 1 0 1px;
  font-size: ${theme.fontSize.m};
`

const itemHeaderStyle = css`
  label: headlines-item-header;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  text-transform: uppercase;
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
  margin-top: ${theme.spacing.zero};
`

const itemContentStyle = css`
  label: headlines-item-content;
  margin-bottom: ${theme.spacing.l};
  flex: ${theme.flex.grow};
  flex-shrink: 0;
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
          Create an easy to use, statically typed SDK for interacting with your backend, with all the bells and
          whistles! Use it either in house, or expose it to your customers.
        </section>
        <Button href={links.doc('SdkGettingStarted')}>
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
          Generate all the tedious-to-maintain parts of your backend, like routing, CORS, parsing and serialization of
          parameters and bodies, and just implement moving data.
        </section>
        <Button href={links.doc('ServerGettingStarted')}>
          <HiBookOpen />
          Learn more
        </Button>
      </div>
      <div className={itemContainerStyle}>
        <h3 className={itemHeaderStyle}>
          <HiWrenchScrewdriver />
          See it in action!
        </h3>
        <section className={itemContentStyle}>
          Check out the configuration editor, right here in your browser! See the generated output in real time as you
          edit the configuration! <br />
          <b>YOUR data stays in YOUR browser!</b>
        </section>
        <Button href={links.editor()}>
          <HiCog6Tooth />
          Go to editor
        </Button>
      </div>
    </div>
  )
}
