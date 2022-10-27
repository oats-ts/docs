import React, { FC, PropsWithChildren } from 'react'
import { HiBars3 } from 'react-icons/hi2'
import { useMobileContext } from './MobileContext'
import { MobileHeader } from './MobileHeader'
import { MobileOverlay } from './MobileOverlay'

type MobileHeaderWithOverlayProps = PropsWithChildren & {
  name?: string
  version: boolean
}

export const MobileHeaderWithOverlay: FC<MobileHeaderWithOverlayProps> = ({ name, version, children }) => {
  const { setMenuOpen } = useMobileContext()
  return (
    <>
      <MobileHeader name={name} version={version} actionIcon={HiBars3} onAction={() => setMenuOpen(true)} />
      <MobileOverlay name={name} version={version}>
        {children}
      </MobileOverlay>
    </>
  )
}
