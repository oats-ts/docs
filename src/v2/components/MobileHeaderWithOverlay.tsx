import React, { FC, PropsWithChildren } from 'react'
import { HiBars3 } from 'react-icons/hi2'
import { useMobileContext } from './MobileContext'
import { MobileHeader } from './MobileHeader'
import { MobileOverlay } from './MobileOverlay'

type MobileHeaderWithOverlayProps = PropsWithChildren & {
  name?: string
  href: string
  version: boolean
}

export const MobileHeaderWithOverlay: FC<MobileHeaderWithOverlayProps> = ({ name, version, href, children }) => {
  const { setMenuOpen } = useMobileContext()
  return (
    <>
      <MobileHeader href={href} name={name} version={version} actionIcon={HiBars3} onAction={() => setMenuOpen(true)} />
      <MobileOverlay href={href} name={name} version={version}>
        {children}
      </MobileOverlay>
    </>
  )
}
