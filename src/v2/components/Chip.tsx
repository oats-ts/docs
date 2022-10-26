import { css } from '@emotion/css'
import React, { forwardRef, HTMLAttributes, MouseEvent } from 'react'
import { HiXMark } from 'react-icons/hi2'
import { theme } from '../theme'

export type ChipProps = {
  label: string
  removeable: boolean
  onRemove?: () => void
} & HTMLAttributes<HTMLSpanElement>

const chipStyle = css`
  padding: 5px 7px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${theme.fontSize.xs};
  background-color: ${theme.colors.dark3};
  color: ${theme.colors.muted};
  border-radius: 8px;
  gap: ${theme.spacing.xs};
  &:hover {
    color: ${theme.colors.text};
    background-color: ${theme.colors.dark2};
  }
`

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ label, removeable, onRemove, children, ...rest }, ref) => {
    const onRemoveClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onRemove?.()
    }
    return (
      <span className={chipStyle} ref={ref} onClick={removeable ? onRemoveClick : undefined} {...rest}>
        {label}
        {removeable && <HiXMark />}
      </span>
    )
  },
)
