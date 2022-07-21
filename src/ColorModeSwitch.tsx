import { css } from '@emotion/css'
import React, { FC } from 'react'
import { Checkbox, Icon, Popup } from 'semantic-ui-react'
import { useColorMode } from './useColorMode'

const containerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  align-self: center;
  margin-right: 16px;
`

const iconStyle = css`
  position: relative !important;
  top: -3px !important;
`

export const ColorModeSwitch: FC = () => {
  const { colorMode, setColorMode } = useColorMode()
  return (
    <Popup
      content="WARNING: Dark mode is still experimental, some styles are not perfect!"
      trigger={
        <div className={containerStyle}>
          <Icon name="sun" color={colorMode === 'dark' ? 'grey' : 'black'} fitted className={iconStyle} />
          <Checkbox
            toggle
            checked={colorMode === 'dark'}
            onChange={(_, { checked }) => setColorMode(checked ? 'dark' : 'light')}
          />
          <Icon name="moon" color={colorMode === 'dark' ? 'grey' : 'black'} fitted className={iconStyle} />
        </div>
      }
    />
  )
}
