import React from 'react'
import { useSelect } from 'downshift'
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
  padding: ${theme.spacing.m} ${theme.spacing.xm};
  * {
    cursor: pointer;
  }
`

const labelStyle = css`
  flex: 1 1 1px;
  color: ${theme.colors.text};
`

const placeHolderStyle = css`
  color: ${theme.colors.placeholder};
`

export function Select<T>({
  items,
  placeholder,
  value,
  onChange,
  getKey = (e) => `${e}`,
  getValue = (e) => `${e}`,
  getDescription = () => undefined,
}: DropdownProps<T>) {
  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items,
    onSelectedItemChange: (e) => onChange?.(e.selectedItem!),
  })

  return (
    <div className={dropdownContainerStyle(isOpen)}>
      <div className={labelContainerStyle} {...getToggleButtonProps()}>
        <label className={labelStyle} {...getLabelProps()}>
          {isNil(value) ? <span className={placeHolderStyle}>{placeholder}</span> : getValue(value)}
        </label>
        <HiChevronDown color={theme.colors.text} />
      </div>
      <ul {...getMenuProps()} className={dropdownStyle}>
        {isOpen &&
          items.map((item, index) => {
            const className = cx(dropdownItemStyle, highlightedIndex === index ? focusedDropownItemStyle : undefined)
            const value = getValue(item)
            const key = getKey(item)
            const description = getDescription(item)
            return (
              <li className={className} key={`${key}${index}`} {...getItemProps({ item, index })}>
                <span className={dropdownItemLabelStyle}>{value}</span>
                {isNil(description) ? null : <span className={dropdownItemDescriptionStyle}>{description}</span>}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
