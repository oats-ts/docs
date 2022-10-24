// import { isNil } from 'lodash'
// import React, { FC, useMemo } from 'react'
// import { Dropdown } from 'semantic-ui-react'
// import { OverrideEditorProps } from './OverrideEditorProps'
// import { HttpMethod } from '@oats-ts/openapi-http'
// import { FormSection } from '../../../../components/FormSection'
// import { DropdownItem } from '../../../../components/dropdownDefaults'

// type HttpMethodOptionValue = HttpMethod | 'true' | 'false'
// type HttpMethodsOption = DropdownItem<HttpMethodOptionValue>
// const HttpMethods: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete', 'trace', 'head']

// const HttpMethodsOptions: HttpMethodsOption[] = [
//   {
//     value: 'true',
//     key: 'true',
//     label: 'All methods (default)',
//     description: '(default) Allows all methods listed in the source OpenAPI document',
//   },
//   {
//     value: 'false',
//     key: 'false',
//     label: 'No methods',
//     description: 'Forbids all methods',
//   },
//   ...HttpMethods.map(
//     (method): HttpMethodsOption => ({
//       label: method.toUpperCase(),
//       key: method,
//       value: method,
//       description: `Allows the ${method.toUpperCase()} method`,
//     }),
//   ),
// ]

// export const AllowedMethodsEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
//   const value = useMemo((): HttpMethodOptionValue[] => {
//     if (isNil(data.allowedMethods)) {
//       return []
//     }
//     if (typeof data.allowedMethods === 'boolean') {
//       return [data.allowedMethods.toString() as HttpMethodOptionValue]
//     }
//     return data.allowedMethods
//   }, [data.allowedMethods])
//   return (
//     <FormSection
//       name="Allowed methods (CORS)"
//       description="Sets allowed HTTP methods for CORS. Influences the <b>Access-Control-Allow-Methods</b> CORS header."
//     >
//       <Dropdown
//         placeholder="Allowed methods"
//         fluid
//         multiple
//         search
//         selection
//         clearable
//         options={HttpMethodsOptions}
//         onChange={(_, props) => {
//           const values = props.value! as HttpMethodOptionValue[]
//           if (values.length === 0) {
//             return onChange({ ...data, allowedMethods: undefined })
//           } else if (values.includes('true') && data.allowedMethods !== true) {
//             return onChange({ ...data, allowedMethods: true })
//           } else if (values.includes('false') && data.allowedMethods !== false) {
//             return onChange({ ...data, allowedMethods: false })
//           }
//           return onChange({
//             ...data,
//             allowedMethods: values.filter((value) => value !== 'true' && value !== 'false') as HttpMethod[],
//           })
//         }}
//         value={value}
//       />
//     </FormSection>
//   )
// }
