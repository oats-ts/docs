import { css } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC, PropsWithChildren } from 'react'
import { theme } from '../theme'

export type FormSectionProps = PropsWithChildren & {
  name: string
  description?: string
}

const sectionStyle = css`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  &:last-of-type {
    margin-bottom: ${theme.spacing.zero};
  }
`

const labelStyle = css`
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.text};
`

const descStyle = css`
  font-size: ${theme.fontSize.s};
  color: ${theme.colors.muted};
`

export const FormSection: FC<FormSectionProps> = ({ children, name, description }) => {
  return (
    <section className={sectionStyle}>
      <label className={labelStyle}>{name}</label>
      {isNil(description) ? null : <span className={descStyle}>{description}</span>}
      {children}
    </section>
  )
}
