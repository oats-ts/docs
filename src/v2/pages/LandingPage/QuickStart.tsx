import { css } from '@emotion/css'
import React, { FC } from 'react'
import { HiBeaker } from 'react-icons/hi2'
import { theme } from '../../theme'
import { QuickStartItem } from '../../components/QuickStartItem'
import { SyntaxHighlighter } from '../../components/SyntaxHighlighter'
import { Link } from '../../components/Link'
// @ts-ignore
import generatorSource from 'raw-loader!./generatorSource.txt'
// @ts-ignore
import generatorOutput from 'raw-loader!./generatorOutput.txt'
import { Code } from '../../components/Code'

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

const paragraphStyle = css`
  margin-top: ${theme.spacing.xm};
`

export const QuickStart: FC = () => {
  return (
    <>
      <h2 className={titleStyle}>
        <HiBeaker /> Quick start
      </h2>
      <div className={containerStyle}>
        <QuickStartItem index={1} title="Prepare your OpenAPI document">
          You need an OpenAPI document to start with. In case you don't have one already, try this example:
          <SyntaxHighlighter kind="docs" lineWrap={true}>
            https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json
          </SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={2} title="Install Oats generator modules">
          Install the necessary Oats modules to make the code generator work:
          <SyntaxHighlighter kind="docs" lineWrap={true}>
            npm i @oats-ts/openapi
          </SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={3} title="Configure the generator">
          Create a file called <b>oats.js</b> in your project root (you can call it anything you like), and the
          configuration:
          <SyntaxHighlighter language="typescript" kind="docs" lineWrap={true}>
            {generatorSource}
          </SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={4} title="Run the generator">
          Open a terminal and simply run:
          <SyntaxHighlighter kind="docs">node ./oats.js</SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={5} title="Verify results">
          In case the generators ran successfully, you will see something like this in the terminal:
          <SyntaxHighlighter kind="docs" lineWrap={true}>
            {generatorOutput}
          </SyntaxHighlighter>
          The <Code>npm i</Code> command lists the necessary dependencies, that the generated output needs, to function
          at runtime. Run this command, and you are ready to use the generated output.
          <div className={paragraphStyle}>
            In case you see errors (and the explanations don't help), check out the{' '}
            <Link href="#/documentation/CommonMistakes">common mistakes</Link> guide, describing the most common issues
            with OpenAPI documents! In case it doesn't help either please open an{' '}
            <Link href="https://github.com/oats-ts/oats-ts/issues">issue</Link>, and describe the problem in detail!
          </div>
        </QuickStartItem>
        <QuickStartItem index={6} title="What's next?">
          Check out the <Link href="#/documentation">documentation</Link>, where you can learn how to use the generator
          output, create custom generators and more. Also have a look at the{' '}
          <Link href="#/editor">configuration editor</Link>, where you can put together your Oats configuration right in
          the browser, while observing the generated output (without downloading or installing anything).
        </QuickStartItem>
      </div>
    </>
  )
}
