import React from 'react'
import { useCombobox } from 'downshift'
import { HiChevronDown } from 'react-icons/hi2'
import { isNil } from 'lodash'
import { cx, css } from '@emotion/css'
import { theme } from '../theme'

export type AutocompleteProps<T> = {
  items: T[]
  value?: T
  placeholder?: string
  onChange?: (item: T) => void
  getKey?: (item: T) => string
  getValue?: (item: T) => string
  getDescription?: (item: T) => string | undefined
}

const selectStyle = (isOpen: boolean) => css`
  label: select;
  width: 100%;
  position: relative;
  background-color: ${theme.colors.dark1};
  font-size: ${theme.fontSize.m};
  border-radius: ${isOpen ? '8px 8px 0px 0px' : '8px'};
  border-width: 0px;
  outline: none;
  cursor: pointer;
`

const labelContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px 0px 0px;
  cursor: pointer;
`

const inputStyle = css`
  border-width: 0px;
  outline: none;
  border-radius: 8px;
  flex: 1 1 1px;
  padding: 12px 0px 12px 16px;
  color: ${theme.colors.text};
  background-color: ${theme.colors.transparent};
  ::placeholder {
    color: ${theme.colors.placeholder};
  }
`

const dropdownStyle = css`
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

const itemStyle = css`
  padding: 12px 16px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`

const itemLabelStyle = css`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.m};
`

const itemDescriptionStyle = css`
  color: ${theme.colors.muted};
  font-size: ${theme.fontSize.s};
`

const focusedItem = css`
  background-color: ${theme.colors.darkHighlight};
`

export function Autocomplete<T extends string>({
  items,
  placeholder,
  value,
  onChange = () => {},
  getKey = (e) => e,
  getValue = (e) => e,
  getDescription = () => undefined,
}: AutocompleteProps<T>) {
  const { isOpen, highlightedIndex, getInputProps, getToggleButtonProps, getMenuProps, getItemProps } = useCombobox({
    items,
    onSelectedItemChange: (e) => onChange(e.selectedItem!),
  })

  const { onFocus, onBlur, onChange: dsOnChange, ...inputProps } = getInputProps()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dsOnChange(e)
    onChange(e.target.value as T)
  }
  return (
    <div className={selectStyle(isOpen)}>
      <div {...getToggleButtonProps()} className={labelContainerStyle}>
        <input
          {...inputProps}
          onChange={handleInputChange}
          placeholder={placeholder}
          value={value ?? ''}
          className={inputStyle}
        />
        <HiChevronDown color={theme.colors.text} />
      </div>
      <ul {...getMenuProps()} className={dropdownStyle}>
        {isOpen &&
          items.map((item, index) => {
            const className = cx(itemStyle, highlightedIndex === index ? focusedItem : undefined)
            const value = getValue(item)
            const key = getKey(item)
            const description = getDescription(item)
            return (
              <li {...getItemProps({ item, index })} className={className} key={`${key}${index}`}>
                <span className={itemLabelStyle}>{value}</span>
                {isNil(description) ? null : <span className={itemDescriptionStyle}>{description}</span>}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
