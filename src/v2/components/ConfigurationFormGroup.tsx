import { css, cx } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC, PropsWithChildren } from 'react'
import { IconType } from 'react-icons'
import { theme } from '../theme'
import { Link } from './Link'

// TODO if there's time pull this apart to smaller components, this is terrible design

type ConfigurationFormGroupProps = PropsWithChildren & {
  name: string
  bottomAttachmentLabel?: string
  topAttachmentLabel?: string
  topAttachmentIcon?: IconType
  bottomAttachmentIcon?: IconType
  onAttachmentClick?: (attachment: 'top' | 'bottom') => void
  icon?: IconType
  titleButtonLabel?: string
  titleButtonIcon?: IconType
  onTitleButtonClick?: () => void
}

const groupHeaderStyle = css`
  label: group-header;
  font-size: ${theme.fontSize.m};
  color: ${theme.colors.text};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${theme.spacing.zero};
  margin-bottom: 20px;
`

const groupNameStyle = css`
  flex: 1 1 1px;
  text-transform: uppercase;
`

const titleButtonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.xs};
`

const groupStyle = css`
  background-color: ${theme.colors.dark2};
  padding: 18px;
  border-radius: ${theme.spacing.m};
  margin-bottom: 20px;
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
    border-top-left-radius: ${theme.spacing.m};
    border-top-right-radius: ${theme.spacing.m};
  `,
)

const bottomAttachmentStyle = cx(
  attachmentStyle,
  css`
    border-bottom-left-radius: ${theme.spacing.m};
    border-bottom-right-radius: ${theme.spacing.m};
    margin-bottom: 20px;
  `,
)

export const ConfigurationFormGroup: FC<ConfigurationFormGroupProps> = ({
  name,
  topAttachmentLabel,
  topAttachmentIcon: TopIcon,
  bottomAttachmentLabel,
  bottomAttachmentIcon: BottomIcon,
  children,
  icon: Icon,
  titleButtonLabel,
  titleButtonIcon: TitleIcon,
  onTitleButtonClick,
  onAttachmentClick,
}) => {
  const hasTopAttachment = !isNil(topAttachmentLabel)
  const hasBottomAttachment = !isNil(bottomAttachmentLabel)
  const hasTitleButton = !isNil(titleButtonLabel)
  const groupFullStyle = cx(
    groupStyle,
    hasTopAttachment ? hasTopAttachmentStyle : undefined,
    hasBottomAttachment ? hasBottomAttachmentStyle : undefined,
  )

  const onTopAttachmentClick = () => onAttachmentClick?.('top')
  const onBottomAttachmentClick = () => onAttachmentClick?.('bottom')

  return (
    <>
      <h2 className={groupHeaderStyle}>
        {Icon ? <Icon /> : null}
        <span className={groupNameStyle}>{name}</span>
        {hasTitleButton && (
          <Link className={titleButtonStyle} onClick={onTitleButtonClick}>
            {TitleIcon ? <TitleIcon /> : null}
            {titleButtonLabel}
          </Link>
        )}
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
