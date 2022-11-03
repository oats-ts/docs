import React, { FC } from 'react'
import { HiHome } from 'react-icons/hi2'
import { useMobileContext } from './MobileContext'
import { TreeNode } from './TreeNode'

export const HomeTreeRoot: FC = () => {
  const { setMenuOpen } = useMobileContext()

  const isActive = () => false
  const getHref = () => `/`
  const getLabel = () => 'Home'
  const getIcon = () => HiHome
  const onClick = () => setMenuOpen(false)
  return (
    <TreeNode
      value={undefined}
      level={0}
      getIcon={getIcon}
      getLabel={getLabel}
      isActive={isActive}
      onClick={onClick}
      getHref={getHref}
    />
  )
}
