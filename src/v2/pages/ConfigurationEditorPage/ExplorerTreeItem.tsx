import React, { FC, useContext } from 'react'
import { EditorInput } from '../../model/types'
import { GeneratorContext } from '../../model/GeneratorContext'
import { TreeNode } from '../../components/TreeNode'
import { isNil } from 'lodash'
import { IconType } from 'react-icons'
import {
  HiCheckCircle,
  HiDocumentText,
  HiExclamationCircle,
  HiInformationCircle,
  HiWrenchScrewdriver,
  HiXCircle,
} from 'react-icons/hi2'
import { useMobileContext } from '../../components/MobileContext'

export type ExplorerTreeItemProps = {
  value: EditorInput
}

export const ExplorerTreeItem: FC<ExplorerTreeItemProps> = ({ value }) => {
  const { explorerTreeState, editorInput, setEditorInput, setExplorerTreeState } = useContext(GeneratorContext)
  const { setMenuOpen } = useMobileContext()

  const isOpen = (n: EditorInput) => {
    return n.type === 'folder' && explorerTreeState[n.path] === true
  }

  const isActive = (n: EditorInput): boolean => {
    if (isNil(editorInput)) {
      return false
    }
    switch (editorInput.type) {
      case 'file':
        return n.type === 'file' && editorInput.path === n.path
      case 'folder':
        return false
      default:
        return n.type === editorInput.type
    }
  }

  const isContainer = (n: EditorInput): boolean => {
    return n.type === 'folder'
  }

  const getChildren = (n: EditorInput): EditorInput[] => {
    if (n.type === 'folder') {
      return n.children
    }
    return []
  }

  const getLabel = (n: EditorInput): string => {
    switch (n.type) {
      case 'file':
      case 'folder':
        return n.name
      case 'configuration':
        return 'Configure'
      case 'generator-source':
        return 'generate.ts'
      case 'package-json':
        return 'package.json'
      case 'issues':
        return `Issues (${n.issues.length})`
    }
  }

  const onClick = (n: EditorInput, open: boolean) => {
    setMenuOpen(false)
    switch (n.type) {
      case 'file':
        return setEditorInput(`file::${n.path}`)
      case 'folder':
        return setExplorerTreeState({ ...explorerTreeState, [n.path]: !open })
      default:
        return setEditorInput(n.type)
    }
  }

  const getIcon = (n: EditorInput): IconType | undefined => {
    switch (n.type) {
      case 'configuration':
        return HiWrenchScrewdriver
      case 'package-json':
        return HiDocumentText
      case 'generator-source':
        return HiDocumentText
      case 'issues': {
        if (n.issues.length === 0) {
          return HiCheckCircle
        }
        const hasErrors = n.issues.some((issue) => issue.severity === 'error')
        if (hasErrors) {
          return HiXCircle
        }
        const hasWarnings = n.issues.some((issue) => issue.severity === 'warning')
        if (hasWarnings) {
          return HiExclamationCircle
        }
        return HiInformationCircle
      }
      default:
        return undefined
    }
  }

  return (
    <TreeNode
      value={value}
      level={0}
      getIcon={getIcon}
      getLabel={getLabel}
      isOpen={isOpen}
      isContainer={isContainer}
      getChildren={getChildren}
      isActive={isActive}
      onClick={onClick}
    />
  )
}
