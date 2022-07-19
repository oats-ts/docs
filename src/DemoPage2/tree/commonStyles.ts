import { css } from '@emotion/css'

export const treeItemStyle = (active: boolean, isDark: boolean) => css`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  flex-grow: 0px;
  flex-basis: 1px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85714286em;
  user-select: none;
  background-color: ${active ? (isDark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.05)') : 'transparent'};
`
