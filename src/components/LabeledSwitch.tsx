import { css, cx } from '@emotion/css'
import React, { ChangeEvent } from 'react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { theme } from '../theme'

const width = 12
const height = 2.125

const switchStyle = css`
  position: relative;
  display: inline-block;
  width: ${width}rem;
  height: ${height}rem;
`

const sliderStyle = css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: ${theme.spacing.xl};
  background-color: ${theme.colors.dark1};

  &:before {
    content: '';
    position: absolute;
    height: ${theme.spacing.xl};
    width: calc(${width / 2}rem - ${theme.spacing.s});
    left: ${theme.spacing.xxs};
    bottom: ${theme.spacing.xxs};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 4rem;
    background-color: ${theme.colors.transparentWhite};
  }
`

const checkedSliderStyle = css`
  &:before {
    transform: translateX(${width / 2}rem);
  }
`

const inputStyle = css`
  opacity: 0;
  width: 0;
  height: 0;
`

const labelContainerStyle = css`
  width: ${width}rem;
  height: ${height}rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.zero};
  pointer-events: none;
  position: absolute;
  top: 0px;
  left: 0px;
`

const labelStyle = css`
  flex: 1 1 1px;
  text-align: center;
  font-size: ${theme.fontSize.s};
  color: ${theme.colors.muted};
  transition: color 0.4s linear;
`

const activeLabelStyle = css`
  color: ${theme.colors.text};
`

export type LabeledSwitchProps<Left, Right> = {
  left: Left
  right: Right
  value: Left | Right
  stringify?: (value: Left | Right) => string
  onChange: (value: Left | Right) => void
}

export function LabeledSwitch<On extends string, Off extends string>({
  right,
  left,
  value,
  stringify = (value) => value,
  onChange,
}: LabeledSwitchProps<On, Off>): ReactElement {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? left : right)
  }
  const checked = value === right
  return (
    <label className={switchStyle}>
      <input type="checkbox" checked={checked} onChange={handleChange} className={inputStyle} />
      <span className={cx(sliderStyle, checked ? checkedSliderStyle : undefined)}></span>
      <span className={labelContainerStyle}>
        <span className={cx(labelStyle, value === left ? activeLabelStyle : undefined)}>{stringify(left)}</span>
        <span className={cx(labelStyle, value === right ? activeLabelStyle : undefined)}>{stringify(right)}</span>
      </span>
    </label>
  )
}
