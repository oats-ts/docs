import { FsNode } from '../types'

export function getPathSequence(path: string, node: FsNode, sequence: string[]): string[] {
  if (node.type === 'file') {
    return node.path === path ? [...sequence, path] : []
  }
  if (node.type === 'folder') {
    for (let i = 0; i < node.children.length; i += 1) {
      const child = node.children[i]!
      const seq = getPathSequence(path, child, [...sequence, node.path])
      if (seq.length > 0) {
        return seq
      }
    }
  }
  return []
}
