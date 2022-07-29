import { css } from '@emotion/css'
import React, { FC, ReactNode } from 'react'
import { useColorMode } from '../../useColorMode'

const treeSectionStyle = (isDark: boolean) => css`
  padding: 16px;
  border-bottom: 1px solid ${isDark ? '#383738' : 'rgba(34,36,38,.15)'};
  :last-of-type {
    border-bottom: none;
    padding-bottom: 0px;
  }
`

export type TreeSectionProps = {
  children: ReactNode
}

export const TreeSection: FC<TreeSectionProps> = ({ children }) => {
  const { colorMode } = useColorMode()
  return <div className={treeSectionStyle(colorMode === 'dark')}>{children}</div>
}
