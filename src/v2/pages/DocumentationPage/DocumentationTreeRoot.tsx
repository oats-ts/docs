import React, { FC } from 'react'
import { TreeNode } from '../../components/TreeNode'
import { DocumentationItem } from '../../../md/sections'
import { useMobileContext } from '../../components/MobileContext'
import { useMarkdown } from './useMarkdown'
import { links } from '../../links'

export type ExplorerTreeFsRootProps = {
  node: DocumentationItem
}

export const DocumentationTreeRoot: FC<ExplorerTreeFsRootProps> = ({ node }) => {
  const { setMenuOpen } = useMobileContext()
  const { page } = useMarkdown()
  const isActive = (n: DocumentationItem) => n.md === page
  const getHref = (n: DocumentationItem) => links.doc(n.md)
  const getLabel = (n: DocumentationItem) => n.name
  const onClick = () => setMenuOpen(false)
  return <TreeNode value={node} level={0} getLabel={getLabel} isActive={isActive} onClick={onClick} getHref={getHref} />
}
