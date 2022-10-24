import { Monaco } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { theme } from '../../theme'

export const THEME = 'oats-dark'

export const readonlyEditorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
  fontSize: 18,
  fontFamily: theme.fontFamily.monospace,
  padding: { top: 20 },
}

export const onBeforeMount = (monaco: Monaco): void => {
  monaco.editor.defineTheme(THEME, {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': theme.colors.dark4,
    },
  })
  monaco.editor.setTheme(THEME)
}
