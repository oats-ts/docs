import React from 'react'
import { render } from 'react-dom'
import { generateSource } from './generateSource'
import { SampleEditor } from './SampleEditor'

render(
  <div>
    <span>Hello</span>
    <button onClick={() => generateSource().then((source) => console.log(source))}>Generate</button>
    <SampleEditor />
  </div>,
  document.getElementById('root'),
)
