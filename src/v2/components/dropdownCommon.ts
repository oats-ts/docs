import { css } from '@emotion/css'
import { theme } from '../theme'

export type DropdownProps<T> = {
  items: T[]
  value?: T
  placeholder?: string
  onChange?: (item: T) => void
  getKey?: (item: T) => string
  getValue?: (item: T) => string
  getDescription?: (item: T) => string | undefined
}

export const dropdownContainerStyle = (isOpen: boolean) => css`
  label: dropdown-container;
  width: 100%;
  position: relative;
  background-color: ${theme.colors.dark1};
  font-size: ${theme.fontSize.m};
  border-radius: ${isOpen ? '8px 8px 0px 0px' : '8px'};
  border-width: 0px;
  outline: none;
  cursor: pointer;
`

export const dropdownStyle = css`
  label: dropdown;
  width: 100%;
  display: block;
  margin: 0px;
  position: absolute;
  max-height: 20rem;
  overflow: auto;
  border-radius: 0px 0px 8px 8px;
  background-color: ${theme.colors.dark1};
  padding: 0px;
  z-index: 1;
`

export const dropdownItemStyle = css`
  padding: 12px 16px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`

export const dropdownItemLabelStyle = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
`

export const dropdownItemDescriptionStyle = css`
  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.s};
`

export const focusedDropownItemStyle = css`
  background-color: ${theme.colors.darkHighlight};
`
