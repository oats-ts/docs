import { css } from '@emotion/css'
import { isEmpty } from 'lodash'
import React, { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import { MarkdowPageName } from '../md/markdown'
import { MarkdownView } from './MarkdownView'

type DocumentationItem = {
  name: string
  md: MarkdowPageName
}

const openAPIDocs: DocumentationItem[] = [
  {
    md: 'OpenAPI_Workflow',
    name: 'Workflow',
  },
  {
    md: 'OpenAPI_Reader',
    name: 'Read',
  },
  {
    md: 'OpenAPI_Validator',
    name: 'Validate',
  },
  {
    md: 'OpenAPI_Generator',
    name: 'Generate',
  },
  {
    md: 'Typescript_Writer',
    name: 'Write',
  },
]

const containerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: flex-start;
  justify-items: flex-start;
  gap: 16px;
`

const mdContainerStyle = css`
  max-height: calc(100vh - 118px);
  overflow-y: auto;
`

const mdSegmentStyle = css`
  margin-top: 0px !important;
`

const menuStyle = css`
  flex-shrink: 0 !important;
  min-height: 0px;
`

export const Documentation: FC = () => {
  const { page } = useParams<{ page: MarkdowPageName }>()
  const activePage = page ?? 'OpenAPI_Workflow'
  const navigate = useNavigate()
  return (
    <div className={containerStyle}>
      <Menu vertical pointing className={menuStyle}>
        <Menu.Item>
          <Menu.Header>OpenAPI</Menu.Header>
          <Menu.Menu>
            {openAPIDocs.map(({ name, md }) => (
              <Menu.Item
                key={md}
                name={name}
                active={activePage === md}
                onClick={() => navigate(isEmpty(page) ? md : `../docs/${md}`, { replace: true })}
              />
            ))}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
      <Segment className={mdSegmentStyle}>
        <div className={mdContainerStyle}>
          <MarkdownView page={activePage} />
        </div>
      </Segment>
    </div>
  )
}
