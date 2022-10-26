import React, { FC, useMemo } from 'react'
import URI from 'urijs'
import isEmpty from 'lodash/isEmpty'
import negate from 'lodash/negate'
import isNil from 'lodash/isNil'
import last from 'lodash/last'
import { HiChevronRight } from 'react-icons/hi2'
import { css } from '@emotion/css'
import { theme } from '../../theme'

function getFragments(path: string): string[] | undefined {
  try {
    const uri = new URI(path)
    const fragment = uri.fragment()
    const uriPath = uri.path()
    if (isEmpty(fragment)) {
      return undefined
    }
    const parts = fragment.split('/').filter(negate(isEmpty))
    if (!isEmpty(uriPath)) {
      const lastPathPart = last(uriPath.split('/'))
      parts.unshift(lastPathPart!)
    }
    return parts.map((fragment) => decodeURIComponent(fragment))
  } catch (e) {
    return undefined
  }
}

const pathWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.s};
`

export const IssuePath: FC<{ path: string }> = ({ path }) => {
  const sections = useMemo(() => getFragments(path), [path])
  if (isNil(sections)) {
    return <>{path}</>
  }
  return (
    <div className={pathWrapperStyle}>
      {sections.map((section, idx) => (
        <>
          {idx === 0 ? null : <HiChevronRight />}
          <span>{section}</span>
        </>
      ))}
    </div>
  )
}
