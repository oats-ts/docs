import React, { FC } from 'react'
import { TreeNode } from '../../components/TreeNode'
import { useMobileContext } from '../../components/MobileContext'
import { useMarkdown } from './useMarkdown'
import { links } from '../../links'
import { MarkdownPageDescriptor } from '../../../types'

export type ExplorerTreeFsRootProps = {
  node: MarkdownPageDescriptor
}

export const DocumentationTreeRoot: FC<ExplorerTreeFsRootProps> = ({ node }) => {
  const { setMenuOpen } = useMobileContext()
  const { page } = useMarkdown()
  const isActive = (n: MarkdownPageDescriptor) => n.md === page
  const getHref = (n: MarkdownPageDescriptor) => links.doc(n.md)
  const getLabel = (n: MarkdownPageDescriptor) => n.name
  const onClick = () => setMenuOpen(false)
  return <TreeNode value={node} level={0} getLabel={getLabel} isActive={isActive} onClick={onClick} getHref={getHref} />
}
