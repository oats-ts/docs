import React, { FC, useMemo } from 'react'
import URI from 'urijs'
import isEmpty from 'lodash/isEmpty'
import negate from 'lodash/negate'
import isNil from 'lodash/isNil'
import last from 'lodash/last'
import { Breadcrumb, BreadcrumbSectionProps } from 'semantic-ui-react'

function getFragments(path: string): BreadcrumbSectionProps[] | undefined {
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
    return parts
      .map((fragment) => decodeURIComponent(fragment))
      .map(
        (fragment, idx): BreadcrumbSectionProps => ({
          active: false,
          link: false,
          key: `${fragment}-${idx}`,
          content: fragment,
        }),
      )
  } catch (e) {
    return undefined
  }
}

export const IssuePath: FC<{ path: string; isDark: boolean }> = ({ path, isDark }) => {
  const sections = useMemo(() => getFragments(path), [path])
  if (isNil(sections)) {
    return <>{path}</>
  }
  return <Breadcrumb icon={{ name: 'right angle', color: isDark ? 'grey' : 'black' }} sections={sections as any} />
}
