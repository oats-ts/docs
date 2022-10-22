import { css } from '@emotion/css'
import React, { FC } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { AppContainer } from '../../components/AppContainer'
import { SideBar } from '../../components/SideBar'
import { SideBarLogo } from '../../components/SideBarLogo'
import { ReadonlyTypescriptMonaco } from './ReadonlyTypescriptMonaco'
import { TreeNode, ItemProps } from './TreeNode'

const containerStyle = css`
  overflow: hidden;
`

const titleWrapper = css`
  padding: 14px 14px 0px 14px;
`

type Tree = {
  label: string
  children: Tree[]
}

const tree: Tree[] = [
  {
    label: 'Root 1',
    children: [
      {
        label: 'Child 1',
        children: [
          {
            label: 'Child 1 1',
            children: [
              {
                label: 'Child 1 1 1',
                children: [],
              },
              {
                label: 'Child 1 1 2',
                children: [],
              },
            ],
          },
        ],
      },
      {
        label: 'Child 2',
        children: [],
      },
      {
        label: 'Child 3',
        children: [
          {
            label: 'Child 3 1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: 'Root 2',
    children: [
      {
        label: 'Child 1',
        children: [
          {
            label: 'Child 1 1',
            children: [
              {
                label: 'Child 1 1 1',
                children: [],
              },
              {
                label: 'Child 1 1 2',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Root 3',
    children: [],
  },
  {
    label: 'Root 4',
    children: [],
  },
]

const contentStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

const monacoWrapper = css`
  flex: 1 1 1px;
`

const Content: FC<ItemProps<Tree>> = ({ value }) => {
  return (
    <span className={contentStyle}>
      {value.children.length > 0 ? <HiChevronDown /> : undefined}
      {value.label}
    </span>
  )
}

export const ConfigurationEditorPage: FC = () => {
  return (
    <AppContainer direction="horizontal" className={containerStyle}>
      <SideBar>
        <div className={titleWrapper}>
          <SideBarLogo name="editor" />
        </div>
        {tree.map((t) => (
          <TreeNode Content={Content} getChildren={(node) => node.children} level={0} value={t} key={t.label} />
        ))}
      </SideBar>
      <div className={`no-font-override ${monacoWrapper}`}>
        <ReadonlyTypescriptMonaco height="100%" path="/foo" value="const x = 10;" />
      </div>
    </AppContainer>
  )
}
