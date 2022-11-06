import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { HiCog6Tooth, HiDocument, HiHome } from 'react-icons/hi2'
import { links } from '../links'
import { useMobileContext } from './MobileContext'
import { TreeNode } from './TreeNode'

export type MenuTreeItemProps = {
  link: 'index' | 'docs' | 'editor'
}

const labelMap: Record<MenuTreeItemProps['link'], string> = {
  index: 'Home',
  docs: 'Documentation',
  editor: 'Editor',
}

const iconMap: Record<MenuTreeItemProps['link'], IconType> = {
  index: HiHome,
  docs: HiDocument,
  editor: HiCog6Tooth,
}

export const MenuTreeItem: FC<MenuTreeItemProps> = ({ link }) => {
  const { setMenuOpen } = useMobileContext()

  const isActive = () => false
  const getHref = () => links[link]()
  const getLabel = () => labelMap[link]
  const getIcon = () => iconMap[link]
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
