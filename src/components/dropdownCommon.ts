import { css } from '@emotion/css'
import { theme } from '../theme'

type CommonDropdownProps<T> = {
  items: T[]
  placeholder?: string
  getKey?: (item: T) => string
  getValue?: (item: T) => string
  getDropdownLabel?: (item: T) => string
  getIcon?: (item: T) => string | undefined
  getDescription?: (item: T) => string | undefined
}

export type DropdownProps<T> = CommonDropdownProps<T> & {
  value?: T
  onChange?: (item: T) => void
}

export type MutliDropdownProps<T> = CommonDropdownProps<T> & {
  value?: T[]
  onChange?: (items: T[]) => void
  isRemoveable?: (item: T) => boolean
}

export const dropdownContainerStyle = (isOpen: boolean) => css`
  label: dropdown-container;
  width: 100%;
  position: relative;
  background-color: ${theme.colors.dark1};
  font-size: ${theme.fontSize.m};
  border-radius: ${isOpen
    ? `${theme.spacing.s} ${theme.spacing.s} ${theme.spacing.zero} ${theme.spacing.zero}`
    : theme.spacing.s};
  border-width: ${theme.spacing.zero};
  outline: none;
  cursor: pointer;
`

export const dropdownStyle = css`
  label: dropdown;
  width: 100%;
  display: block;
  margin: ${theme.spacing.zero};
  position: absolute;
  max-height: 20rem;
  overflow: auto;
  border-radius: ${theme.spacing.zero} ${theme.spacing.zero} ${theme.spacing.s} ${theme.spacing.s};
  background-color: ${theme.colors.dark1};
  padding: ${theme.spacing.zero};
  z-index: 1;
`

export const dropdownItemStyle = css`
  padding: ${theme.spacing.m} ${theme.spacing.xm};
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
  cursor: pointer;
`

export const dropdownItemLabelStyle = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.m};
`

export const dropdownItemDescriptionStyle = css`
  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.s};
`

export const focusedDropownItemStyle = css`
  background-color: ${theme.colors.darkHighlight};
`

export const selectedDropdownItemStyle = css`
  background-color: ${theme.colors.darkHighlight};
  color: ${theme.colors.text};
`
