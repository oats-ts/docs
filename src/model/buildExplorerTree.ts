import { GeneratedFile } from '@oats-ts/typescript-writer'
import { FsNode, FolderNode } from '../types'

function ensureTreeExists(path: string, segments: string[], content: string, node: FolderNode): void {
  switch (segments.length) {
    case 0:
      throw new Error(`Unexpected path "${path}".`)
    case 1: {
      const [name] = segments
      if (!node.children.some((child) => child.name === name)) {
        node.children.push({ type: 'file', content, name: name!, path })
      }
      return
    }
    default: {
      const [name, ...childSegments] = segments
      if (!node.children.some((child) => child.name === name)) {
        node.children.push({ type: 'folder', path: `${node.path}/${name}`, name: name!, children: [] })
      }
      const folder = node.children.find((child) => child.name === name)!
      if (folder.type !== 'folder') {
        throw new TypeError(`Should be a "folder", but is a file instead: "${name}" in "${path}".`)
      }
      return ensureTreeExists(path, childSegments, content, folder)
    }
  }
}

function buildExplorerTreeInternal(file: GeneratedFile, root: FolderNode): void {
  if (!file.path.startsWith('/')) {
    throw new Error(`Illegal path of file "${file.path}". Should start with "/".`)
  }
  const [, ...segments] = file.path.split('/')
  ensureTreeExists(file.path, segments, file.content, root)
}

function nameComparator(a: FsNode, b: FsNode): number {
  return a.name.localeCompare(b.name)
}

function sortChildren(node: FsNode): void {
  if (node.type === 'folder') {
    node.children.sort(nameComparator)
    node.children.forEach(sortChildren)
  }
}

export function buildExplorerTree(files: GeneratedFile[]): FolderNode {
  const root: FolderNode = {
    type: 'folder',
    name: '/',
    path: '',
    children: [],
  }
  files.forEach((file) => buildExplorerTreeInternal(file, root))
  sortChildren(root)
  return root
}
