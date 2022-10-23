import { editor } from 'monaco-editor'
import { theme } from '../../theme'

export const readonlyEditorConfig: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  readOnly: true,
  fontSize: 18,
  fontFamily: theme.fontFamily.monospace,
  padding: { top: 20 },
}
