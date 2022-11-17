import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC, PropsWithChildren } from 'react'
import { IconType } from 'react-icons'
import { ReactNode } from 'react-markdown/lib/ast-to-react'
import { theme } from '../theme'

type ConfigurationFormGroupProps = PropsWithChildren & {
  name: string
  topAttachment?: ReactNode
  bottomAttachment?: ReactNode
  titleAttachment?: ReactNode
  icon?: IconType
}

const groupHeaderStyle = css`
  label: group-header;
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.text};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.xm};
  margin: ${theme.spacing.zero};
  margin-bottom: ${theme.spacing.xxm};
`

const groupNameStyle = css`
  flex: ${theme.flex.grow};
  text-transform: uppercase;
`

const groupStyle = css`
  background-color: ${theme.colors.dark2};
  padding: ${theme.spacing.xxm};
  border-radius: ${theme.spacing.m};
  margin-bottom: ${theme.spacing.xxm};
  z-index: 1;
  &:last-of-type {
    margin-bottom: ${theme.spacing.zero};
  }
`

const hasTopAttachmentStyle = css`
  border-top-left-radius: ${theme.spacing.zero};
  border-top-right-radius: ${theme.spacing.zero};
`

const hasBottomAttachmentStyle = css`
  border-bottom-left-radius: ${theme.spacing.zero};
  border-bottom-right-radius: ${theme.spacing.zero};
  margin-bottom: ${theme.spacing.zero};
`

export const ConfigurationFormGroup: FC<ConfigurationFormGroupProps> = ({
  name,
  children,
  icon: Icon,
  topAttachment,
  bottomAttachment,
  titleAttachment,
}) => {
  const hasTopAttachment = !isNil(topAttachment)
  const hasBottomAttachment = !isNil(bottomAttachment)
  const hasTitleAttachment = !isNil(titleAttachment)
  const groupFullStyle = cx(
    groupStyle,
    hasTopAttachment ? hasTopAttachmentStyle : undefined,
    hasBottomAttachment ? hasBottomAttachmentStyle : undefined,
  )

  return (
    <>
      <h2 className={groupHeaderStyle}>
        {Icon ? <Icon /> : null}
        <span className={groupNameStyle}>{name}</span>
        {hasTitleAttachment && titleAttachment}
      </h2>
      {hasTopAttachment && topAttachment}
      <section className={groupFullStyle}>{children}</section>
      {hasBottomAttachment && bottomAttachment}
    </>
  )
}
