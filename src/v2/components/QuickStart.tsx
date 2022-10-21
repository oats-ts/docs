import { css } from '@emotion/css'
import React, { FC } from 'react'
import { IoRocketSharp } from 'react-icons/io5'
import { theme } from '../theme'
import { QuickStartItem } from './QuickStartItem'
import { SyntaxHighlighter } from './SyntaxHighlighter'
import { Link } from './Link'
// @ts-ignore
import generatorSource from 'raw-loader!./generatorSource.txt'

const containerStyle = css`
  label: quick-start;
  margin-bottom: 40px;
`

const titleStyle = css`
  label: quick-start-title;
  font-size: ${theme.font.xl};
  color: ${theme.colors.text};
  margin-top: 70px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const QuickStart: FC = () => {
  return (
    <>
      <h2 className={titleStyle}>
        <IoRocketSharp /> Quick start
      </h2>
      <div className={containerStyle}>
        <QuickStartItem index={1} title="Prepare your OpenAPI document">
          You need an OpenAPI document to start with. In case you don't have one already, try this example:
          <SyntaxHighlighter>
            https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json
          </SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={2} title="Install Oats generator modules">
          Install the necessary Oats modules to make the code generator work:
          <SyntaxHighlighter>npm i @oats-ts/openapi @oats-ts/cli</SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={3} title="Configure the generator">
          Create a file called <b>oats.ts</b> in your project root (you can call it anything you like), and the
          configuration:
          <SyntaxHighlighter language="typescript">{generatorSource}</SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={4} title="Run the generator">
          Open a terminal and simply run:
          <SyntaxHighlighter>npx oats --config oats.ts</SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={5} title="What now?">
          Check out the <Link href="#">documentation</Link>, where you can learn how to use the generator output, create
          custom generators and more. Also have a look at the <Link href="#">configuration editor</Link>, where you can
          put together your Oats configuration right in the browser, while observing the generated output (without
          downloading or installing anything).
        </QuickStartItem>
      </div>
    </>
  )
}
