import { css, cx } from '@emotion/css'
import React, { FC, PropsWithChildren } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { theme } from '../theme'
import { useMobileContext } from './MobileContext'
import { MobileHeader } from './MobileHeader'

export type MobileOverlayProps = PropsWithChildren & {
  name?: string
  version: boolean
}

const overlayStyle = css`
  position: fixed;
  top: ${theme.spacing.zero};
  left: ${theme.spacing.zero};
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.dark2};
  pointer-events: all;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const closedStyle = css`
  opacity: 0;
  pointer-events: none;
`

export const MobileOverlay: FC<MobileOverlayProps> = ({ name, children, version }) => {
  const { isMenuOpen, setMenuOpen } = useMobileContext()

  return (
    <div className={cx(overlayStyle, isMenuOpen ? undefined : closedStyle)}>
      <MobileHeader actionIcon={HiXMark} onAction={() => setMenuOpen(false)} name={name} version={version} />
      {children}
    </div>
  )
}
