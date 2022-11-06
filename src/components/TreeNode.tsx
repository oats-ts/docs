import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { IconType } from 'react-icons'
import { HiChevronDown, HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { theme } from '../theme'

const Padding = 14

const treeNodeStyle = css`
  label: tree-node;
  position: relative;
`

const openableStyle = (level: number) => css`
  &::before {
    z-index: 5;
    label: tree-node-line-level-${level};
    border-left: 1px solid #555;
    content: '';
    left: ${9 + Padding + Padding * level}px;
    position: absolute;
    top: 2.35rem;
    height: calc(100% - 2.35rem);
    flex-shrink: 0;
  }
`

const treeNodeContentStyle = (level: number, active: boolean) => css`
  label: tree-node-content-level-${level};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  padding: ${theme.spacing.s};
  transition: background-color 150ms linear, color 150ms linear;
  cursor: pointer;
  text-decoration: none;

  padding-left: ${Padding + Padding * level}px;
  font-size: ${theme.fontSize.m};
  background-color: ${active ? theme.colors.dark1 : theme.colors.transparent};
  color: ${active ? theme.colors.text : theme.colors.muted};
  &:hover {
    background-color: ${theme.colors.dark1};
  }
`

const itemLabelStyle = css`
  label: tree-node-item-label;
  flex: 1 0 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.xxs};
`

const emptyLabelStyle = css`
  margin-left: 0.6rem;
`

export type TreeNodeProps<T> = {
  value: T
  level: number
  getLabel: (value: T) => string
  getIcon?: (value: T) => IconType | undefined
  getHref?: (value: T) => string | undefined
  getChildren?: (value: T) => T[]
  isOpen?: (value: T) => boolean
  isActive?: (value: T) => boolean
  isContainer?: (value: T) => boolean
  onClick?: (value: T, open: boolean) => void
}

type TreeNodeChevronProps = {
  isOpen: boolean
  isEmpty: boolean
}

const TreeNodeChevron: FC<TreeNodeChevronProps> = ({ isOpen, isEmpty }) => {
  if (isEmpty) {
    return <HiChevronLeft />
  }
  return isOpen ? <HiChevronDown /> : <HiChevronRight />
}

export function TreeNode<T>({
  value,
  level,
  getLabel,
  isActive = () => false,
  isOpen = () => false,
  isContainer = () => false,
  getChildren = () => [],
  onClick = () => undefined,
  getHref = () => undefined,
  getIcon = () => undefined,
}: TreeNodeProps<T>) {
  const children = getChildren(value)
  const open = isOpen(value)
  const active = isActive(value)
  const container = isContainer(value)
  const Icon = getIcon(value)
  const className = container && open ? cx(treeNodeStyle, openableStyle(level)) : treeNodeStyle
  const href = getHref(value)
  const label = getLabel(value)
  const handleClick = () => onClick(value, open)
  const needsExtraSpacing = !(container || Icon !== undefined || level === 0)
  return (
    <div className={className}>
      <a className={treeNodeContentStyle(level, active)} href={href} onClick={handleClick}>
        <span className={itemLabelStyle}>
          {container && <TreeNodeChevron isEmpty={children.length === 0} isOpen={open} />}
          {Icon === undefined ? null : <Icon />}
          {needsExtraSpacing ? <span className={emptyLabelStyle}>{label}</span> : <span>{label}</span>}
        </span>
      </a>
      {open &&
        children.map((child, idx) => (
          <TreeNode
            key={`${idx}-${label}`}
            value={child}
            level={level + 1}
            getLabel={getLabel}
            getHref={getHref}
            isContainer={isContainer}
            getChildren={getChildren}
            isOpen={isOpen}
            isActive={isActive}
            onClick={onClick}
          />
        ))}
    </div>
  )
}
