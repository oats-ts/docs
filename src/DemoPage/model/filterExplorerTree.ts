import { isNil, negate } from 'lodash'
import { FileNode, FolderNode, FsNode } from '../../types'

function matches(node: FileNode, filter: string): boolean {
  return node.path.includes(filter)
}

const notNil = negate(isNil) as (input: FsNode | undefined) => input is FsNode

function filterTreeNode<T extends FsNode>(node: T, filter: string): T | undefined {
  if (node.type === 'file') {
    return matches(node, filter) ? node : undefined
  } else {
    const children = node.children.map((child) => filterTreeNode(child, filter)).filter(notNil)
    return children.length === 0 ? undefined : { ...node, children }
  }
}

export function filterExplorerTree(node: FolderNode, filter: string): FolderNode {
  if (filter.length === 0) {
    return node
  }
  const filtered = filterTreeNode(node, filter)
  return filtered === undefined ? { ...node, children: [] } : filtered
}
