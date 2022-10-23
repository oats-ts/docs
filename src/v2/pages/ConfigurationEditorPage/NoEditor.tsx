import React, { FC } from 'react'
import { HiDocument } from 'react-icons/hi2'

export const NoEditor: FC = () => {
  return (
    <div>
      <HiDocument />
      No editor open. Use the explorer on the left!
    </div>
  )
}
