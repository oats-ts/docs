import React, { FC } from 'react'
import { HiBookOpen, HiCog6Tooth, HiMagnifyingGlass, HiPencil } from 'react-icons/hi2'
import { MenuBar } from '../../../components/MenuBar'
import { MenuItem } from '../../../components/MenuItem'

export const ConfigurationEditor: FC = () => {
  return (
    <div>
      <MenuBar>
        <MenuItem label="Reader" icon={HiBookOpen} active={true} />
        <MenuItem label="Validator" icon={HiMagnifyingGlass} />
        <MenuItem label="Generator" icon={HiCog6Tooth} />
        <MenuItem label="Writer" icon={HiPencil} />
      </MenuBar>
    </div>
  )
}
