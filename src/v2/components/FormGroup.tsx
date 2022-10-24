import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC, PropsWithChildren } from 'react'
import { IconType } from 'react-icons'
import { theme } from '../theme'

type FormGroupProps = PropsWithChildren & {
  name: string
  bottomAttachmentLabel?: string
  topAttachmentLabel?: string
  topAttachmentIcon?: IconType
  bottomAttachmentIcon?: IconType
  onAttachmentClick?: (attachment: 'top' | 'bottom') => void
  icon?: IconType
}

const groupNameStyle = css`
  label: group-name;
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.text};
  display: flex;
  flex-direction: row;
  align-items: center;
  text-transform: uppercase;
  margin: 0px;
  margin-bottom: 20px;
`

const groupStyle = css`
  background-color: ${theme.colors.dark2};
  padding: 18px;
  border-radius: 12px;
  margin-bottom: 20px;
  z-index: 1;
  &:last-of-type {
    margin-bottom: 0px;
  }
`

const hasTopAttachmentStyle = css`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`

const hasBottomAttachmentStyle = css`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-bottom: 0px;
`

const attachmentStyle = css`
  label: attachment;
  background-color: ${theme.colors.dark2};
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  transition: background-color 150ms linear, color 150ms linear, box-shadow 200ms linear;
  border: unset;
  padding: 14px 18px;
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
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  `,
)

const bottomAttachmentStyle = cx(
  attachmentStyle,
  css`
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    margin-bottom: 20px;
  `,
)

export const FormGroup: FC<FormGroupProps> = ({
  name,
  topAttachmentLabel,
  topAttachmentIcon: TopIcon,
  bottomAttachmentLabel,
  bottomAttachmentIcon: BottomIcon,
  children,
  icon: Icon,
  onAttachmentClick,
}) => {
  const hasTopAttachment = !isNil(topAttachmentLabel)
  const hasBottomAttachment = !isNil(bottomAttachmentLabel)
  const groupFullStyle = cx(
    groupStyle,
    hasTopAttachment ? hasTopAttachmentStyle : undefined,
    hasBottomAttachment ? hasBottomAttachmentStyle : undefined,
  )

  const onTopAttachmentClick = () => onAttachmentClick?.('top')
  const onBottomAttachmentClick = () => onAttachmentClick?.('bottom')

  return (
    <>
      <h2 className={groupNameStyle}>
        {Icon ? <Icon /> : null}
        {name}
      </h2>
      {hasTopAttachment && (
        <div className={topAttachmentStyle} onClick={onTopAttachmentClick}>
          {TopIcon ? <TopIcon /> : null}
          {topAttachmentLabel}
        </div>
      )}
      <section className={groupFullStyle}>{children}</section>
      {hasBottomAttachment && (
        <div className={bottomAttachmentStyle} onClick={onBottomAttachmentClick}>
          {BottomIcon ? <BottomIcon /> : null}
          {bottomAttachmentLabel}
        </div>
      )}
    </>
  )
}
