import { css } from '@emotion/css'
import React, { FC } from 'react'

const treeHeaderStyle = css`
  padding-bottom: 8px;
  white-space: nowrap;
  font-size: 0.85714286em;
  user-select: none;
  font-size: 1em;
  font-weight: bold;
`

export type TreeHeaderProps = {
  label: string
}

export const TreeHeader: FC<TreeHeaderProps> = ({ label }) => {
  return <div className={treeHeaderStyle}>{label}</div>
}
