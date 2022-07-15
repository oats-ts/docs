import React from 'react'
import { render } from 'react-dom'
import { generateSource } from './generateSource'

render(
  <div>
    <span>Hello</span>
    <button onClick={() => generateSource().then((source) => console.log(source))}>Generate</button>
  </div>,
  document.getElementById('root'),
)
