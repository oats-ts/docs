import { css, cx } from '@emotion/css'
import React, { ComponentType } from 'react'
import { theme } from '../../theme'

const Padding = 14

const treeNodeStyle = css`
  position: relative;
`

const openableStyle = (level: number) => css`
  &::before {
    z-index: 5;
    label: tree-node-line-${level};
    border-left: 1px solid #555;
    content: '';
    left: ${8 + Padding + Padding * level}px;
    position: absolute;
    top: 30px;
    height: calc(100% - 30px);
  }
`

const treeNodeContentStyle = (level: number) => css`
  label: tree-node-content-${level};
  display: flex;
  flex-direction: row;
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.muted};
  padding: 8px;
  /* border-radius: 0px 8px 8px 0px; */
  padding-left: ${Padding + Padding * level}px;
  transition: background-color 150ms linear, color 150ms linear;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${theme.colors.dark1};
  }
`

const itemLabelStyle = css`
  flex: 1 1 1px;
`

export type TreeItemProps<T> = {
  value: T
  level: number
  getChildren: (value: T) => T[]
  Content: ComponentType<ItemProps<T>>
}

export type ItemProps<T> = {
  value: T
  level: number
}

export function TreeNode<T>({ value, level, getChildren, Content }: TreeItemProps<T>) {
  const children = getChildren(value)
  const rootStyle = /*level > 0 ||*/ children.length > 0 ? cx(treeNodeStyle, openableStyle(level)) : treeNodeStyle
  return (
    <div className={rootStyle}>
      <div className={treeNodeContentStyle(level)}>
        <span className={itemLabelStyle}>
          <Content level={level} value={value} />
        </span>
      </div>
      {children.map((child) => (
        <TreeNode Content={Content} getChildren={getChildren} level={level + 1} value={child} />
      ))}
    </div>
  )
}
