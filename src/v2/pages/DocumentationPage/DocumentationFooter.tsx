import { css } from '@emotion/css'
import { isNil } from 'lodash'
import React, { FC } from 'react'
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

export const DocumentationFooter: FC = () => {
  const [previous, current, next] = useNeighbours()

  const hasPrevious = !isNil(previous)
  const hasNext = !isNil(next)
  const hasCurrent = !isNil(next)

  if (!hasPrevious && !hasNext && !hasCurrent) {
    return null
  }

  const docUri = hasCurrent
    ? `https://github.com/oats-ts/oats-ts/issues/new?labels=documentation&title=${current?.name.replace(' ', '+')}+(in+${
        current?.md
      }.md)&body=Please+describe+the+issue+with+as+much+detail+as+possible!`
    : undefined

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
          Please let me know by <Link href={docUri}>opening an issue on GitHub!</Link> Please include all details that
          you think might be important!
        </div>
      )}
    </div>
  )
}
