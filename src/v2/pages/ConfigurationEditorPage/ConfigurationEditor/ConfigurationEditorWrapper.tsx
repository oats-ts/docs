import { css } from '@emotion/css'
import React, { FC } from 'react'
import { HiBookOpen, HiCog6Tooth, HiMagnifyingGlass, HiPencil } from 'react-icons/hi2'
import { MenuBar } from '../../../components/MenuBar'
import { MenuItem } from '../../../components/MenuItem'
import { useGeneratorContext } from '../../../model/useGenerator'
import { ConfigurationEditor } from './ConfigurationEditor'

const wrapperStyle = css`
  padding: 20px;
  padding-top: 0px;
`

const contentContainerStyle = css`
  padding-top: 58px;
`

export const ConfigurationWrapperEditor: FC = () => {
  const { configuration, setConfiguration } = useGeneratorContext()
  const { active } = configuration

  const onReaderClick = () => setConfiguration({ ...configuration, active: 'reader' })
  const onValidatorClick = () => setConfiguration({ ...configuration, active: 'validator' })
  const onGeneratorClick = () => setConfiguration({ ...configuration, active: 'generator' })
  const onWriterClick = () => setConfiguration({ ...configuration, active: 'writer' })

  return (
    <div className={wrapperStyle}>
      <MenuBar>
        <MenuItem label="Reader" icon={HiBookOpen} active={active === 'reader'} onClick={onReaderClick} />
        <MenuItem
          label="Validator"
          icon={HiMagnifyingGlass}
          active={active === 'validator'}
          onClick={onValidatorClick}
        />
        <MenuItem label="Generator" icon={HiCog6Tooth} active={active === 'generator'} onClick={onGeneratorClick} />
        <MenuItem label="Writer" icon={HiPencil} active={active === 'writer'} onClick={onWriterClick} />
      </MenuBar>
      <div className={contentContainerStyle}>
        <ConfigurationEditor />
      </div>
    </div>
  )
}
