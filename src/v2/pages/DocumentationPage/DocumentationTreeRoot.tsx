import React, { FC } from 'react'
import { TreeNode } from '../../components/TreeNode'
import { DocumentationItem } from './sections'
import { useParams } from 'react-router-dom'
import { MarkdownPageName } from '../../../md/markdown'
import { useMobileContext } from '../../components/MobileContext'

export type ExplorerTreeFsRootProps = {
  node: DocumentationItem
}

export const DocumentationTreeRoot: FC<ExplorerTreeFsRootProps> = ({ node }) => {
  const { page = 'OpenAPI_GettingStarted' } = useParams<{ page: MarkdownPageName }>()
  const { setMenuOpen } = useMobileContext()

  const isActive = (n: DocumentationItem) => n.md === page
  const getHref = (n: DocumentationItem) => `#/documentation/${n.md}`
  const getLabel = (n: DocumentationItem) => n.name
  const onClick = () => setMenuOpen(false)
  return <TreeNode value={node} level={0} getLabel={getLabel} isActive={isActive} onClick={onClick} getHref={getHref} />
}
