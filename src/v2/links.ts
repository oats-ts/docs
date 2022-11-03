import { MarkdownPageName } from '../md/markdown'

type Links = {
  docs: () => string
  doc: (page: MarkdownPageName) => string
  editor: () => string
  index: () => string
}

const devLinks: Links = {
  docs: () => `/documentation.html`,
  doc: (page) => `/documentation/${page}.html`,
  editor: () => `/editor.html`,
  index: () => `/`,
}

const prodLinks: Links = {
  docs: () => `/documentation`,
  doc: (page) => `/documentation/${page}`,
  editor: () => `/editor`,
  index: () => `/`,
}

console.log(process.env.MODE)

export const links = process.env.MODE === 'development' ? devLinks : prodLinks
