// import { isNil } from 'lodash'
// import React, { FC, useMemo } from 'react'
// import { Dropdown, DropdownProps, Form, StrictDropdownItemProps } from 'semantic-ui-react'
// import { OverrideEditorProps } from './OverrideEditorProps'

// type OriginOptionValue = (string & {}) | 'true' | 'false'
// type OriginOption = StrictDropdownItemProps & { value: OriginOptionValue }

// export const AllowedOriginsEditor: FC<OverrideEditorProps> = ({ data, onChange }) => {
//   const value = useMemo(() => {
//     if (isNil(data.allowedOrigins)) {
//       return []
//     }
//     if (typeof data.allowedOrigins === 'boolean') {
//       return [data.allowedOrigins.toString()]
//     }
//     return data.allowedOrigins
//   }, [data.allowedOrigins])
//   const options = useMemo((): OriginOption[] => {
//     return [
//       { value: 'true', text: 'Allow all origins' },
//       { value: 'false', text: "Don't allow any origins (default)" },
//       ...(Array.isArray(data.allowedOrigins)
//         ? data.allowedOrigins.map((origin): OriginOption => ({ value: origin, text: origin }))
//         : []),
//     ]
//   }, [data.allowedOrigins])
//   return (
//     <Form.Field>
//       <label>
//         Allowed origins (CORS)
//         <br />
//         <MutedLabel>
//           Sets allowed HTTP origins for CORS. Influences the <b>Access-Control-Allow-Origin</b> CORS header.
//         </MutedLabel>
//       </label>
//       <Dropdown
//         placeholder="Allowed origins"
//         fluid
//         multiple
//         search
//         selection
//         clearable
//         options={options}
//         allowAdditions
//         additionLabel="Add origin: "
//         onAddItem={(_, { value }: DropdownProps) => {
//           const origin = value as string
//           const { allowedOrigins } = data
//           if (typeof allowedOrigins === 'boolean') {
//             return onChange({ ...data, allowedOrigins: [origin] })
//           }
//           return onChange({ ...data, allowedOrigins: [...(allowedOrigins ?? []), origin] })
//         }}
//         onChange={(_, props) => {
//           const values = props.value! as OriginOptionValue[]
//           if (values.length === 0) {
//             return onChange({ ...data, allowedOrigins: undefined })
//           } else if (values.includes('true') && data.allowedOrigins !== true) {
//             return onChange({ ...data, allowedOrigins: true })
//           } else if (values.includes('false') && data.allowedOrigins !== false) {
//             return onChange({ ...data, allowedOrigins: false })
//           }
//           return onChange({
//             ...data,
//             allowedOrigins: values.filter((value) => value !== 'true' && value !== 'false'),
//           })
//         }}
//         value={value}
//       />
//     </Form.Field>
//   )
// }
