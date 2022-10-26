import React, { useMemo, useState } from 'react'
import { useCombobox } from 'downshift'
import { HiCheck, HiChevronDown } from 'react-icons/hi2'
import { isEmpty, isNil } from 'lodash'
import { cx, css } from '@emotion/css'
import { theme } from '../theme'
import {
  dropdownContainerStyle,
  dropdownStyle,
  focusedDropownItemStyle,
  dropdownItemDescriptionStyle,
  dropdownItemLabelStyle,
  dropdownItemStyle,
  MutliDropdownProps,
  selectedDropdownItemStyle,
} from './dropdownCommon'
import { Chip } from './Chip'

const inputContainerStyle = css`
  label: input-container;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 16px;
  * {
    cursor: pointer;
  }
`

const inputStyle = (isEmpty: boolean) => css`
  label: input;
  border-width: ${theme.spacing.zero};
  outline: none;
  border-radius: 8px;
  flex: 1 1 1px;
  padding: 12px ${theme.spacing.zero} 12px ${isEmpty ? '16px' : '6px'};
  color: ${theme.colors.text};
  background-color: ${theme.colors.transparent};
  ::placeholder {
    color: ${theme.colors.placeholder};
  }
`

const chipsContainerStyle = css`
  color: ${theme.colors.text};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  padding-left: 12px;
`

export function MultiAutocomplete<T extends string>({
  items,
  placeholder,
  value,
  isRemoveable = () => true,
  getKey = (e) => `${e}`,
  getValue = (e) => `${e}`,
  getDescription = () => undefined,
  onChange = () => {},
}: MutliDropdownProps<T>) {
  const [inputValue, setInputValue] = useState<string>('')

  const removeSelectedItem = (item: T) => {
    onChange?.((value ?? []).filter((e) => e !== item))
  }
  const addSelectedItem = (item: T) => {
    if (!value?.includes(item)) {
      onChange([...(value ?? []), item])
    }
  }

  const filteredItems = useMemo((): T[] => {
    if (isNil(inputValue) || inputValue.length === 0) {
      return items
    }
    const filtered = items.filter((itm) => {
      return getValue(itm).toLowerCase().includes(inputValue.toLowerCase())
    })
    return filtered.length === 0 ? [inputValue as T] : filtered
  }, [value, items, inputValue])

  const hasValues = !isEmpty(value)
  const hasInputValue = !isEmpty(inputValue)

  const { isOpen, highlightedIndex, getToggleButtonProps, getLabelProps, getMenuProps, getItemProps, getInputProps } =
    useCombobox({
      selectedItem: null,
      items: filteredItems,
      defaultHighlightedIndex: 0,
      onStateChange: ({ type, selectedItem }) => {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter: {
            if (isNil(highlightedIndex) && hasInputValue) {
              addSelectedItem(inputValue as T)
            } else if (!isNil(selectedItem)) {
              addSelectedItem(selectedItem)
            }
            setInputValue('')
            break
          }
          case useCombobox.stateChangeTypes.ItemClick: {
            addSelectedItem(selectedItem!)
            setInputValue('')
            break
          }
          default:
            break
        }
      },
    })

  const { onFocus, ...inputProps } = getInputProps({
    onKeyDown: (e) => {
      if (e.key === 'Backspace' && !hasInputValue && hasValues) {
        onChange(value!.slice(0, -1))
      }
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()
      e.preventDefault()
      setInputValue(e.target.value as T)
    },
    onBlur: () => {
      if (inputValue.length > 0) {
        addSelectedItem(inputValue as T)
        setInputValue('')
      }
    },
  })

  return (
    <div className={dropdownContainerStyle(isOpen)}>
      <div className={inputContainerStyle} {...getToggleButtonProps()}>
        {hasValues && (
          <label className={chipsContainerStyle} {...getLabelProps()}>
            {value?.map((item) => (
              <Chip
                label={getValue(item)}
                key={getKey(item)}
                removeable={isRemoveable(item)}
                onRemove={() => removeSelectedItem(item)}
              />
            ))}
          </label>
        )}
        <input
          {...inputProps}
          className={inputStyle(!hasValues)}
          placeholder={hasValues ? '' : placeholder}
          value={inputValue}
        />
        <HiChevronDown color={theme.colors.text} />
      </div>
      <ul {...getMenuProps()} className={dropdownStyle}>
        {isOpen &&
          filteredItems.map((item, index) => {
            const isSelected = value?.includes(item)
            const isHighlighted = highlightedIndex === index
            const className = cx(
              dropdownItemStyle,
              isHighlighted ? focusedDropownItemStyle : undefined,
              isSelected ? selectedDropdownItemStyle : undefined,
            )
            const stringValue = getValue(item)
            const key = getKey(item)
            const description = getDescription(item)
            return (
              <li className={className} key={`${key}${index}`} {...getItemProps({ item, index })}>
                <span className={dropdownItemLabelStyle}>
                  {isSelected ? <HiCheck /> : undefined}
                  {stringValue}
                </span>
                {isNil(description) ? null : <span className={dropdownItemDescriptionStyle}>{description}</span>}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
