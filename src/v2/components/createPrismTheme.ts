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
      borderRadius: theme.spacing.zero,
      padding: theme.spacing.xxm,
      width: '100%',
      maxWidth: '100%',
      borderWidth: theme.spacing.zero,
      margin: theme.spacing.zero,
      fontSize: theme.fontSize.code,
      fontFamily: theme.fontFamily.monospace,
    },
  }

  const clonedTheme = cloneDeep(baseTheme)
  values(clonedTheme).forEach((field) => {
    delete field.background
    delete field.backgroundColor
    field.textShadow = `rgb(0 0 0 / 30%) ${theme.spacing.zero} 1px`
    field.fontSize = theme.fontSize.code
    field.fontFamily = theme.fontFamily.monospace
  })

  return merge(clonedTheme, themeOverrides)
}
