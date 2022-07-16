import React, { FC } from 'react'
import Markdown from 'react-markdown'
import { Segment } from 'semantic-ui-react'
import { Home } from '../md/markdown'

export const Documentation: FC = () => {
  return (
    <Segment raised>
      <Markdown>{Home}</Markdown>
    </Segment>
  )
}
