import React from 'react'
import { useSelect } from 'downshift'
import { HiChevronDown } from 'react-icons/hi2'
import { isNil } from 'lodash'
import { cx, css } from '@emotion/css'
import { theme } from '../theme'

export type SelectProps<T> = {
  items: T[]
  value?: T
  placeholder?: string
  onChange: (item: T) => void
  getKey: (item: T) => string
  getValue: (item: T) => string
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
  padding: 12px 16px;
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

export function Select<T>({
  items,
  placeholder,
  value,
  onChange,
  getKey,
  getValue,
  getDescription = () => undefined,
}: SelectProps<T>) {
  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items,
    onSelectedItemChange: (e) => onChange(e.selectedItem!),
  })

  return (
    <div className={selectStyle(isOpen)}>
      <div className={labelContainerStyle} {...getToggleButtonProps()}>
        <label className={labelStyle} {...getLabelProps()}>
          {isNil(value) ? <span className={placeHolderStyle}>{placeholder}</span> : getValue(value)}
        </label>
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
              <li className={className} key={`${key}${index}`} {...getItemProps({ item, index })}>
                <span className={itemLabelStyle}>{value}</span>
                {isNil(description) ? null : <span className={itemDescriptionStyle}>{description}</span>}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
