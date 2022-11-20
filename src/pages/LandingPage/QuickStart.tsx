import { css } from '@emotion/css'
import React, { FC } from 'react'
import { HiBeaker } from 'react-icons/hi2'
import { theme } from '../../theme'
import { QuickStartItem } from '../../components/QuickStartItem'
import { QuickStartDescriptor } from '../../types'
import { quickStart } from './md/quickStart'

const containerStyle = css`
  label: quick-start;
  margin-bottom: ${theme.spacing.xxxl};
`

const titleStyle = css`
  label: quick-start-title;
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.text};
  margin-top: ${theme.spacing.xh};
  margin-bottom: ${theme.spacing.zero};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.s};
`

const descriptors: QuickStartDescriptor[] = [
  quickStart.installOatsDescriptor,
  quickStart.prepareInputDescriptor,
  quickStart.configureOatsDescriptor,
  quickStart.runOatsDescriptor,
  quickStart.verifyResultsDescriptor,
  quickStart.nextStepsDescriptor,
]

export const QuickStart: FC = () => {
  return (
    <>
      <h2 className={titleStyle}>
        <HiBeaker /> Quick start
      </h2>
      <div className={containerStyle}>
        {descriptors.map((descriptor, index) => (
          <QuickStartItem key={index} index={index + 1} descriptor={descriptor} />
        ))}
      </div>
    </>
  )
}
