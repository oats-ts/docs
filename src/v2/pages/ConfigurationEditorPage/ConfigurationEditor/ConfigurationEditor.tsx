import { css } from '@emotion/css'
import React, { FC } from 'react'
import { HiBookOpen, HiCog6Tooth, HiMagnifyingGlass, HiPencil } from 'react-icons/hi2'
import { Autocomplete } from '../../../components/Autocomplete'
import { Input } from '../../../components/Input'
import { MenuBar } from '../../../components/MenuBar'
import { MenuItem } from '../../../components/MenuItem'
import { Select } from '../../../components/Select'

const contentContainerStyle = css`
  padding: 20px;
`

export const ConfigurationEditor: FC = () => {
  return (
    <div>
      <MenuBar>
        <MenuItem label="Reader" icon={HiBookOpen} active={true} />
        <MenuItem label="Validator" icon={HiMagnifyingGlass} />
        <MenuItem label="Generator" icon={HiCog6Tooth} />
        <MenuItem label="Writer" icon={HiPencil} />
      </MenuBar>
      <div className={contentContainerStyle}>
        <Autocomplete
          items={['Foo', 'Bar', 'Foobar', 'fuuuu', 'Bubu', 'Cioasd']}
          placeholder="Select bar"
          value={undefined}
          getKey={(e) => e}
          getDescription={(e) => `Description of ${e}`}
          getValue={(e) => e}
          onChange={(e) => console.log('autocomplete', e)}
        />
        <Select
          items={['Foo', 'Bar', 'Foobar', 'fuuuu', 'Bubu', 'Cioasd']}
          placeholder="Select foo"
          value={undefined}
          getKey={(e) => e}
          getDescription={(e) => `Description of ${e}`}
          getValue={(e) => e}
          onChange={(e) => console.log('select', e)}
        />
        <Input placeholder="Hello" />
      </div>
    </div>
  )
}
