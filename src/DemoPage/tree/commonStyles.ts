import { css } from '@emotion/css'

const getBackgroundColor = (isActive: boolean, isDark: boolean): string => {
  if (!isActive) {
    return 'transparent'
  }
  return isDark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.05)'
}

const getTextColor = (isActive: boolean, isDark: boolean): string => {
  if (!isActive) {
    return isDark ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.5)'
  }
  return isDark ? 'rgba(255,255,255,.95)' : 'rgba(0,0,0,.95)'
}

const getFontWeight = (isActive: boolean) => (isActive ? '700' : '400')

export const treeItemStyle = (isActive: boolean, isDark: boolean) => css`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  flex-grow: 0px;
  flex-basis: 1px;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 0.85714286em;
  user-select: none;
  font-weight: ${getFontWeight(isActive)};
  color: ${getTextColor(isActive, isDark)};
  background-color: ${getBackgroundColor(isActive, isDark)};
`
