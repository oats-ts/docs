import React, { FC, Fragment } from 'react'
import { SideBarSection } from '../../components/SideBarSection'
import { DocumentationTreeRoot } from './DocumentationTreeRoot'
import { sections } from './sections'

export const DocumentationMenu: FC = () => {
  return (
    <>
      {sections.map((section) => (
        <Fragment key={section.name}>
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
