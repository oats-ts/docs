declare module '*.md' {
  const content: string
  export default content
}

declare module '*.yaml' {
  const content: string
  export default content
}

declare namespace NodeJS {
  export interface ProcessEnv {
    MODE: 'production' | 'development'
  }
}
