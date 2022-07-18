import React, { FC } from 'react'
import { Segment } from 'semantic-ui-react'
import { MarkdownView } from '../DocumentationPage/MarkdownView'
import { usePageTitle } from '../usePageTitle'

export const HomePage: FC = () => {
  usePageTitle('Home')
  return (
    <Segment raised>
      <MarkdownView page="Home" />
    </Segment>
  )
}
