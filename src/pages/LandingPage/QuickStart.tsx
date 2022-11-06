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
import { links } from '../../links'

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
          <SyntaxHighlighter host="docs" lineWrap={true} theme="light">
            https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json
          </SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={2} title="Install Oats">
          Install the necessary Oats modules to make the code generator work:
          <SyntaxHighlighter host="docs" lineWrap={true} theme="light">
            npm i @oats-ts/openapi
          </SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={3} title="Configure the generator">
          Create a file called <b>oats.js</b> in your project root with the following content:
          <SyntaxHighlighter language="typescript" host="docs" lineWrap={true} theme="light">
            {generatorSource}
          </SyntaxHighlighter>
          Experiment with different configurations in the <Link href={links.editor()}>configuration editor</Link>
        </QuickStartItem>
        <QuickStartItem index={4} title="Run the generator">
          Open a terminal and simply run:
          <SyntaxHighlighter host="docs" theme="light">
            node ./oats.js
          </SyntaxHighlighter>
        </QuickStartItem>
        <QuickStartItem index={5} title="Verify results">
          In case the generators ran successfully, you will see something like this in the terminal:
          <SyntaxHighlighter host="docs" lineWrap={true} theme="light">
            {generatorOutput}
          </SyntaxHighlighter>
          The <Code>npm i</Code> command lists the necessary dependencies, that the generated output needs, to function
          at runtime.
          <div className={paragraphStyle}>
            <b>Run this command, and you are ready to use the generated output!</b>
          </div>
          <div className={paragraphStyle}>
            In case you see errors (and the descriptions don't help), check out the{' '}
            <Link href={links.doc('OpenAPI101')}>OpenAPI 101</Link> guide, describing the most common DOs and DON'Ts
            with OpenAPI documents! In case it doesn't help either please open an{' '}
            <Link href="https://github.com/oats-ts/oats-ts/issues">issue</Link>, and describe the problem in detail!
          </div>
        </QuickStartItem>
        <QuickStartItem index={6} title="Where to next?">
          Check out the <Link href={links.docs()}>documentation</Link>, where you can learn how to use the generator
          output. Also have a look at the <Link href={links.editor()}>configuration editor</Link>, where you can put
          together your Oats configuration right in the browser, while observing the generated output (without
          downloading or installing anything, and without your data ever leaving your browser).
        </QuickStartItem>
      </div>
    </>
  )
}
