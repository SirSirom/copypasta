import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export const languageMap: Record<string, string> = {
  javascript: 'javascript',
  js: 'javascript',
  typescript: 'typescript',
  ts: 'typescript',
  jsx: 'javascript',
  python: 'python',
  py: 'python',
  java: 'java',
  cpp: 'cpp',
  'c++': 'cpp',
  csharp: 'csharp',
  'c#': 'csharp',
  php: 'php',
  ruby: 'ruby',
  rb: 'ruby',
  go: 'go',
  golang: 'go',
  rust: 'rust',
  rs: 'rust',
  sql: 'sql',
  bash: 'bash',
  shell: 'bash',
  sh: 'bash',
  html: 'html',
  xml: 'xml',
  css: 'css',
  json: 'json',
  plaintext: 'plaintext',
  text: 'plaintext',
}

export const highlightCode = (code: string, language: string = 'plaintext'): string => {
  try {
    const lang = languageMap[language.toLowerCase()] || 'plaintext'
    
    // Try to highlight - if language not found, hljs will auto-detect
    const result = hljs.highlight(code, { language: lang, ignoreIllegals: true })
    return result.value
  } catch (error) {
    try {
      // Fallback: auto-detect language
      const result = hljs.highlightAuto(code)
      return result.value
    } catch (err) {
      console.error('Syntax highlight error:', err)
      return escapeHtml(code)
    }
  }
}

const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export const initPrism = () => {
  // No-op for compatibility
}
