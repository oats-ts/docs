import React, { FC } from 'react'
import { Segment } from 'semantic-ui-react'
import { MarkdownView } from '../DocumentationPage/MarkdownView'
import { useColorMode } from '../useColorMode'
import { usePageTitle } from '../usePageTitle'

export const HomePage: FC = () => {
  usePageTitle('Home')
  const { colorMode } = useColorMode()
  return (
    <Segment raised inverted={colorMode === 'dark'}>
      <MarkdownView page="Home" />
    </Segment>
  )
}
