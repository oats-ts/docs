import { css, cx } from '@emotion/css'
import React, { FC } from 'react'
import { theme } from '../theme'

const switchStyle = css`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
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
  border-radius: 26px;
  background-color: ${theme.colors.dark1};

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: ${theme.spacing.xxs};
    bottom: ${theme.spacing.xxs};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    background-color: ${theme.colors.text};
  }
`

const checkedSliderStyle = css`
  background-color: ${theme.colors.green};
  &:before {
    transform: translateX(26px);
  }
`

const inputStyle = css`
  opacity: 0;
  width: 0;
  height: 0;
`

export type SwitchProps = {
  value: boolean
  onChange: (value: boolean) => void
}

export const Switch: FC<SwitchProps> = ({ value, onChange }) => {
  const handleChange = () => {
    onChange(!value)
  }
  return (
    <label className={switchStyle}>
      <input type="checkbox" checked={value} onChange={handleChange} className={inputStyle} />
      <span className={cx(sliderStyle, value ? checkedSliderStyle : undefined)}></span>
    </label>
  )
}
