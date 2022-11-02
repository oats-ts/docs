import { css } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC, useMemo } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { Link } from '../../components/Link'
import { theme } from '../../theme'
import { useNeighbours } from './useNeighbours'

const docFooterStyle = css`
  padding: ${theme.spacing.l};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.l};
`

const navigationRow = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const errorReportRow = css`
  padding: ${theme.spacing.xxm};
  background-color: ${theme.colors.dark2};
  border-radius: ${theme.spacing.m};
  color: ${theme.colors.muted};
`

const separatorStyle = css`
  flex: ${theme.flex.grow};
`

const linkStyle = css`
  font-weight: bold;
`

function swapSpaces(str: string): string {
  return str.replace(/\s+/g, '+')
}

export const DocumentationFooter: FC = () => {
  const [previous, current, next] = useNeighbours()

  const hasPrevious = !isNil(previous)
  const hasNext = !isNil(next)
  const hasCurrent = !isNil(current)

  const issueUri = useMemo((): string | undefined => {
    if (isNil(current)) {
      return undefined
    }
    const title = `${swapSpaces(current.name)}+(in+${current.md}.md)`
    const labels = 'documentation'
    const body = swapSpaces(`Please describe the issue with as much detail as possible!`)
    return `https://github.com/oats-ts/oats-ts/issues/new?labels=${labels}&title=${title}&body=${body}`
  }, [current])

  if (!hasPrevious && !hasNext && !hasCurrent) {
    return null
  }

  return (
    <div className={docFooterStyle}>
      {(hasPrevious || hasNext) && (
        <div className={navigationRow}>
          {hasPrevious && (
            <Link href={`#/documentation/${previous.md}`} className={linkStyle}>
              <HiChevronLeft />
              {previous.name}
            </Link>
          )}
          <div className={separatorStyle} />
          {hasNext && (
            <Link href={`#/documentation/${next.md}`} className={linkStyle}>
              {next.name}
              <HiChevronRight />
            </Link>
          )}
        </div>
      )}
      {hasCurrent && (
        <div className={errorReportRow}>
          <b>Found an issue with this page?</b>
          <br />
          Please let me know by <Link href={issueUri}>opening an issue on GitHub!</Link> Please include all details that
          you think might be important!
        </div>
      )}
    </div>
  )
}
