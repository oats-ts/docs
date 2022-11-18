import React from 'react'
import { Link } from '../../../../components/Link'

export const readerHints = {
  inline: 'You can edit your OpenAPI document inline in this editor',
  path: (
    <>
      The URI or file path where your source OpenAPI document will be read from. You can pick from{' '}
      <Link href="https://github.com/oats-ts/oats-schemas" target="_blank">
        Oats test documents
      </Link>
      , or check out{' '}
      <Link href="https://apis.guru" target="_blank">
        https://apis.guru
      </Link>{' '}
      for examples
    </>
  ),
  language: 'The language used by your OpenAPI document',
  protocol: 'The protocol used to read your OpenAPI document',
}
