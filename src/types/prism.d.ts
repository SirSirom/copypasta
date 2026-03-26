declare module 'highlight.js' {
  export interface HighlightResult {
    value: string
    language?: string
    relevance: number
  }

  export interface HighlightStatic {
    highlight(code: string, options: { language: string; ignoreIllegals?: boolean }): HighlightResult
    highlightAuto(code: string): HighlightResult
    highlightAll(): void
  }

  const hljs: HighlightStatic
  export default hljs
}

declare module 'highlight.js/styles/*' {
  export {}
}
