import { CSSProperties } from 'react'
import { cloneDeep, merge, values } from 'lodash'
import { theme } from '../theme'

export function createPrismTheme(
  baseTheme: Record<string, CSSProperties>,
  backgroundColor: string,
): Record<string, CSSProperties> {
  const themeOverrides: Record<string, CSSProperties> = {
    'pre[class*="language-"]': {
      backgroundColor,
      borderRadius: '0px',
      padding: '18px',
      width: '100%',
      maxWidth: '100%',
      borderWidth: '0px',
      margin: '0px',
      fontSize: theme.fontSize.code,
      fontFamily: theme.fontFamily.monospace,
    },
  }

  const clonedTheme = cloneDeep(baseTheme)
  values(clonedTheme).forEach((field) => {
    delete field.background
    delete field.backgroundColor
    field.textShadow = 'rgb(0 0 0 / 30%) 0px 1px'
    field.fontSize = theme.fontSize.code
    field.fontFamily = theme.fontFamily.monospace
  })

  return merge(clonedTheme, themeOverrides)
}
