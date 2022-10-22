import React, { FC } from 'react'
import { TreeNode } from '../../components/TreeNode'
import { DocumentationItem } from './sections'
import { useParams } from 'react-router-dom'
import { MarkdowPageName } from '../../../md/markdown'

export type ExplorerTreeFsRootProps = {
  node: DocumentationItem
}

export const DocumentationTreeRoot: FC<ExplorerTreeFsRootProps> = ({ node }) => {
  const { page = 'OpenAPI_GettingStarted' } = useParams<{ page: MarkdowPageName }>()
  const isActive = (n: DocumentationItem) => n.md === page
  const getHref = (n: DocumentationItem) => `#/documentation/${n.md}`
  const getLabel = (n: DocumentationItem) => n.name
  return <TreeNode value={node} level={0} getLabel={getLabel} isActive={isActive} getHref={getHref} />
}
