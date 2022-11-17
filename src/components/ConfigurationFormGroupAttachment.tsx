import { css, cx } from '@emotion/css'
import React, { FC, MouseEventHandler } from 'react'
import { IconType } from 'react-icons'
import { theme } from '../theme'

type ConfigurationFormGroupAttachmentProps = {
  label: string
  icon?: IconType
  onClick?: MouseEventHandler
}

const attachmentStyle = css`
  label: attachment;
  background-color: ${theme.colors.dark2};
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
  display: flex;
  gap: ${theme.spacing.s};
  align-items: center;
  justify-content: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  padding: ${theme.spacing.m} ${theme.spacing.xxm};
  position: relative;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.dark1};
  }
`

const topAttachmentStyle = cx(
  attachmentStyle,
  css`
    border-top-left-radius: ${theme.spacing.m};
    border-top-right-radius: ${theme.spacing.m};
  `,
)

const bottomAttachmentStyle = cx(
  attachmentStyle,
  css`
    border-bottom-left-radius: ${theme.spacing.m};
    border-bottom-right-radius: ${theme.spacing.m};
    margin-bottom: ${theme.spacing.xxm};
  `,
)

const Top: FC<ConfigurationFormGroupAttachmentProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <div className={topAttachmentStyle} onClick={onClick}>
      {Icon ? <Icon /> : null}
      {label}
    </div>
  )
}

const Bottom: FC<ConfigurationFormGroupAttachmentProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <div className={bottomAttachmentStyle} onClick={onClick}>
      {Icon ? <Icon /> : null}
      {label}
    </div>
  )
}

export const ConfigurationFormGroupAttachment = {
  Top,
  Bottom,
}
