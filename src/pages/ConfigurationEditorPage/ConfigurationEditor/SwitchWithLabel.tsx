import { css } from '@emotion/css'
import React, { FC } from 'react'
import { Switch, SwitchProps } from '../../../components/Switch'
import { theme } from '../../../theme'

const containerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.s};
  color: ${theme.colors.muted};
`

export type SwithWithLabelProps = SwitchProps & {
  label: string
}

export const SwitchWithLabel: FC<SwithWithLabelProps> = ({ label, value, onChange }) => {
  return (
    <span className={containerStyle}>
      <Switch value={value} onChange={onChange} />
      {label}
    </span>
  )
}
