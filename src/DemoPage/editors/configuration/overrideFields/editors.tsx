import { FC } from 'react'
import { PresetConfigField } from '../../../../types'
import { AllowCredentialsEditor } from './AllowCredentialsEditor'
import { AllowedMethodsEditor } from './AllowedMethodsEditor'
import { AllowedOriginsEditor } from './AllowedOriginsEditor'
import { AllowedRequestHeadersEditor } from './AllowedRequestHeadersEditor'
import { AllowedResponseHeadersEditor } from './AllowedResponseHeadersEditor'
import { DocumentationEditor } from './DocumentationEditor'
import { MaxAgeEditor } from './MaxAgeEditor'
import { OverrideEditorProps } from './OverrideEditorProps'
import { DebugCookiesEditor } from './DebugCookiesEditor'
import { ValidateResponsesEditor } from './ValidateResponsesEditor'

export const editors: Record<PresetConfigField, FC<OverrideEditorProps>> = {
  documentation: DocumentationEditor,
  validateResponses: ValidateResponsesEditor,
  debugCookies: DebugCookiesEditor,
  allowCredentials: AllowCredentialsEditor,
  maxAge: MaxAgeEditor,
  allowedMethods: AllowedMethodsEditor,
  allowedOrigins: AllowedOriginsEditor,
  allowedRequestHeaders: AllowedRequestHeadersEditor,
  allowedResponseHeaders: AllowedResponseHeadersEditor,
}
