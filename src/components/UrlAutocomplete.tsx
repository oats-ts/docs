import React, { useEffect, useMemo, useState } from 'react'
import { useCombobox } from 'downshift'
import { HiChevronDown } from 'react-icons/hi2'
import { isNil } from 'lodash'
import { cx, css } from '@emotion/css'
import { theme } from '../theme'
import {
  dropdownContainerStyle,
  dropdownStyle,
  focusedDropownItemStyle,
  dropdownItemDescriptionStyle,
  dropdownItemLabelStyle,
} from './dropdownCommon'
import { SchemaItem } from '../types'
import { customSchemaItem } from '../utils'

const labelContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.zero} ${theme.spacing.xm} ${theme.spacing.zero} ${theme.spacing.zero};
  cursor: pointer;
`

const wrapperStyle = css`
  padding: ${theme.spacing.m} ${theme.spacing.xm};
  list-style: none;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.m};
`

const textWrapperStyle = css`
  padding-left: ${theme.spacing.m};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
  cursor: pointer;
`

const providerStyle = css`
  color: ${theme.colors.muted};
`

const inputStyle = css`
  border-width: ${theme.spacing.zero};
  outline: none;
  border-radius: ${theme.spacing.s};
  flex: ${theme.flex.grow};
  padding: ${theme.spacing.m} ${theme.spacing.zero} ${theme.spacing.m} ${theme.spacing.xm};
  color: ${theme.colors.text};
  background-color: ${theme.colors.transparent};
  ::placeholder {
    color: ${theme.colors.placeholder};
  }
`

export type UrlAutocompleteProps = {
  value: SchemaItem
  items: SchemaItem[]
  onChange?: (item: SchemaItem) => void
}

function matchesSearch(search: string, item: SchemaItem): boolean {
  return [item.description, item.name, item.url]
    .filter((str): str is string => !isNil(str))
    .some((str) => str.toLowerCase().includes(search))
}

export function UrlAutocomplete({ items, value, onChange = () => {} }: UrlAutocompleteProps) {
  const [inputValue, setInputValue] = useState(() => value?.url ?? '')
  const filteredItems = useMemo((): SchemaItem[] => {
    if (isNil(value)) {
      return items
    }
    const search = inputValue.toLowerCase()
    const filtered = items.filter((item) => matchesSearch(search, item))
    if (isNil(items.find((item) => item.url === inputValue))) {
      filtered.unshift(customSchemaItem(inputValue))
    }
    return filtered
  }, [items, inputValue])

  useEffect(() => {
    setInputValue(value?.url ?? '')
  }, [value?.url])

  const { isOpen, highlightedIndex, getInputProps, getToggleButtonProps, getMenuProps, getItemProps } = useCombobox({
    items: filteredItems,
    inputValue: inputValue,
    defaultHighlightedIndex: 0,
    onSelectedItemChange: (e) => {
      if (isNil(e.selectedItem)) {
        return
      }
      onChange(e.selectedItem)
    },
    onIsOpenChange: (e) => {
      if (isNil(e.selectedItem)) {
        return
      }
      onChange(e.selectedItem)
    },
  })

  const { onFocus, onBlur: dsOnBlur, onChange: dsOnChange, ...inputProps } = getInputProps()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value
    setInputValue(newInputValue)
    dsOnChange(e)
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLImageElement>) => {
    dsOnBlur(e)
    onChange(value)
    setInputValue(value?.url ?? '')
  }

  return (
    <div className={dropdownContainerStyle(isOpen)}>
      <div {...getToggleButtonProps()} className={labelContainerStyle}>
        <input
          {...inputProps}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="OpenAPI document URI"
          value={inputValue ?? ''}
          className={inputStyle}
        />
        <HiChevronDown color={theme.colors.text} />
      </div>
      <ul {...getMenuProps()} className={dropdownStyle}>
        {isOpen &&
          filteredItems.length > 0 &&
          filteredItems.map((item, index) => {
            const className = cx(wrapperStyle, highlightedIndex === index ? focusedDropownItemStyle : undefined)
            return (
              <li {...getItemProps({ item, index })} className={className} key={`${item.url}${index}`}>
                <img src={item.image} width={40} height={40} />
                <span className={textWrapperStyle}>
                  <span className={dropdownItemLabelStyle}>
                    {item.name ?? 'No name'} <span className={providerStyle}>({item.provider})</span>
                  </span>
                  {isNil(item.description) ? null : (
                    <span className={dropdownItemDescriptionStyle}>{item.description}</span>
                  )}
                </span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
