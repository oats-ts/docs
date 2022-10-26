import React from 'react'
import { useSelect } from 'downshift'
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

const labelContainerStyle = (isEmpty: boolean) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${isEmpty ? '12px' : '9px'} ${isEmpty ? '16px' : '12px'};
  * {
    cursor: pointer;
  }
`

const labelStyle = css`
  flex: 1 1 1px;
  color: ${theme.colors.text};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`

const placeHolderStyle = css`
  color: ${theme.colors.placeholder};
`

export function MultiSelect<T>({
  items,
  placeholder,
  value,
  isRemoveable = () => true,
  getKey = (e) => `${e}`,
  getValue = (e) => `${e}`,
  getDescription = () => undefined,
  onChange = () => {},
}: MutliDropdownProps<T>) {
  const removeSelectedItem = (item: T) => {
    onChange?.((value ?? []).filter((e) => e !== item))
  }
  const addSelectedItem = (item: T) => {
    if (!value?.includes(item)) {
      onChange([...(value ?? []), item])
    } else {
      removeSelectedItem(item)
    }
  }

  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    selectedItem: null,
    items,
    onStateChange: ({ type, selectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick: {
          addSelectedItem(selectedItem!)
          break
        }
        default:
          break
      }
    },
  })

  return (
    <div className={dropdownContainerStyle(isOpen)}>
      <div className={labelContainerStyle(isEmpty(value))} {...getToggleButtonProps()}>
        <label className={labelStyle} {...getLabelProps()}>
          {isEmpty(value) ? (
            <span className={placeHolderStyle}>{placeholder}</span>
          ) : (
            value?.map((item) => (
              <Chip
                label={getValue(item)}
                key={getKey(item)}
                removeable={isRemoveable(item)}
                onRemove={() => removeSelectedItem(item)}
              />
            ))
          )}
        </label>
        <HiChevronDown color={theme.colors.text} />
      </div>
      <ul {...getMenuProps()} className={dropdownStyle}>
        {isOpen &&
          items.map((item, index) => {
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
