import { isNil } from 'lodash'
import { FileNode, FsNode } from '../types'

export function findFileByPath(path: string, node: FsNode): FileNode | undefined {
  if (node.type === 'file' && node.path === path) {
    return node
  }
  if (node.type === 'folder') {
    for (let i = 0; i < node.children.length; i += 1) {
      const found = findFileByPath(path, node.children[i]!)
      if (!isNil(found)) {
        return found
      }
    }
  }
  return undefined
}
