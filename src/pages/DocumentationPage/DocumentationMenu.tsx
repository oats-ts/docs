import React, { FC, Fragment } from 'react'
import { HomeTreeRoot } from '../../components/HomeTreeRoot'
import { SideBarSection } from '../../components/SideBarSection'
import { DocumentationTreeRoot } from './DocumentationTreeRoot'
import { sections } from '../../md/sections'

export const DocumentationMenu: FC = () => {
  return (
    <>
      <SideBarSection>
        <HomeTreeRoot />
      </SideBarSection>
      {sections.map((section, idx) => (
        <Fragment key={section.name ?? `item-${idx}`}>
          <SideBarSection title={section.name}>
            {section.items.map((item) => (
              <DocumentationTreeRoot node={item} key={item.md} />
            ))}
          </SideBarSection>
        </Fragment>
      ))}
    </>
  )
}
