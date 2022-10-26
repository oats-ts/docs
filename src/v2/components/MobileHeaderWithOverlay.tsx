import React, { FC, PropsWithChildren } from 'react'
import { HiBars3 } from 'react-icons/hi2'
import { useMobileContext } from './MobileContext'
import { MobileHeader } from './MobileHeader'
import { MobileOverlay } from './MobileOverlay'

type MobileHeaderWithOverlayProps = PropsWithChildren & {
  name: string
}

export const MobileHeaderWithOverlay: FC<MobileHeaderWithOverlayProps> = ({ name, children }) => {
  const { setMenuOpen } = useMobileContext()
  return (
    <>
      <MobileHeader name={name} actionIcon={HiBars3} onAction={() => setMenuOpen(true)} />
      <MobileOverlay name={name}>{children}</MobileOverlay>
    </>
  )
}
