import React, { FC, PropsWithChildren } from 'react'
import { css } from '@emotion/css'

export type ContentProps = PropsWithChildren

const contentStyle = css`
  width: 100%;
  flex: 1 1 1px;
  margin: 0px;
  padding: 0px;
`

export const Content: FC = () => {
  return <div className={contentStyle}></div>
}
