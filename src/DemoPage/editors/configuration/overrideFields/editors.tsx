import { FC } from 'react'
import { OverrideField } from '../../../../types'
import { AllowCredentialsEditor } from './AllowCredentialsEditor'
import { AllowedMethodsEditor } from './AllowedMethodsEditor'
import { AllowedOriginsEditor } from './AllowedOriginsEditor'
import { AllowedRequestHeadersEditor } from './AllowedRequestHeadersEditor'
import { AllowedResponseHeadersEditor } from './AllowedResponseHeadersEditor'
import { DocumentationEditor } from './DocumentationEditor'
import { MaxAgeEditor } from './MaxAgeEditor'
import { OverrideEditorProps } from './OverrideEditorProps'
import { ParseSetCookieHeaderEditor } from './ParseSetCookieHeaderEditor'
import { SetCookieHeaderEditor } from './SetCookieHeaderEditor'
import { ValidateClientResponsesEditor } from './ValidateClientResponsesEditor'

export const editors: Record<OverrideField, FC<OverrideEditorProps>> = {
  documentation: DocumentationEditor,
  validateClientResponses: ValidateClientResponsesEditor,
  sendCookieHeader: SetCookieHeaderEditor,
  parseSetCookieHeaders: ParseSetCookieHeaderEditor,
  allowCredentials: AllowCredentialsEditor,
  maxAge: MaxAgeEditor,
  allowedMethods: AllowedMethodsEditor,
  allowedOrigins: AllowedOriginsEditor,
  allowedRequestHeaders: AllowedRequestHeadersEditor,
  allowedResponseHeaders: AllowedResponseHeadersEditor,
}
