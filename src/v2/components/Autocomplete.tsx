import React, { useMemo } from 'react'
import { useCombobox } from 'downshift'
import { HiChevronDown } from 'react-icons/hi2'
import { isNil } from 'lodash'
import { cx, css } from '@emotion/css'
import { theme } from '../theme'
import {
  dropdownContainerStyle,
  DropdownProps,
  dropdownStyle,
  focusedDropownItemStyle,
  dropdownItemDescriptionStyle,
  dropdownItemLabelStyle,
  dropdownItemStyle,
} from './dropdownCommon'

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

export function Autocomplete<T extends string>({
  items,
  placeholder,
  value,
  customLabel = 'Custom value',
  onChange = () => {},
  getKey = (e) => e,
  getValue = (e) => e,
  getDescription = () => undefined,
}: DropdownProps<T> & { customLabel?: string }) {
  const filteredItems = useMemo((): T[] => {
    if (isNil(value) || value.length === 0) {
      return items
    }
    const filtered = items.filter((itm) => itm.toLowerCase().includes(value.toLowerCase()))
    return filtered.length === 0 ? [value] : filtered
  }, [value, items])

  const { isOpen, highlightedIndex, getInputProps, getToggleButtonProps, getMenuProps, getItemProps } = useCombobox({
    items: filteredItems,
    inputValue: value,
    onSelectedItemChange: (e) => {
      onChange(e.inputValue as T)
    },
    onIsOpenChange: (e) => {
      onChange(e.inputValue as T)
    },
  })

  const { onFocus, onBlur, onChange: dsOnChange, ...inputProps } = getInputProps()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as T)
    dsOnChange(e)
  }
  return (
    <div className={dropdownContainerStyle(isOpen)}>
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
          filteredItems.length > 0 &&
          filteredItems.map((item, index) => {
            const className = cx(dropdownItemStyle, highlightedIndex === index ? focusedDropownItemStyle : undefined)
            const value = getValue(item)
            const key = getKey(item)
            const description = items.includes(item) ? getDescription(item) : customLabel
            return (
              <li {...getItemProps({ item, index })} className={className} key={`${key}${index}`}>
                <span className={dropdownItemLabelStyle}>{value}</span>
                {isNil(description) ? null : <span className={dropdownItemDescriptionStyle}>{description}</span>}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
