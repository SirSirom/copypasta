import { useEffect, useState, useRef } from 'react'
import { useStore } from '../store/store'
import { highlightCode } from '../lib/syntax'
import Toast from './Toast'
import type { Note } from '../types'

const LANGUAGES = [
  'javascript',
  'typescript',
  'jsx',
  'python',
  'java',
  'cpp',
  'csharp',
  'php',
  'ruby',
  'go',
  'rust',
  'html',
  'css',
  'sql',
  'bash',
  'json',
  'plaintext',
]

export default function EditorModal() {
  const isModalOpen = useStore((state) => state.isModalOpen)
  const setModalOpen = useStore((state) => state.setModalOpen)
  const editingNote = useStore((state) => state.editingNote)
  const addNote = useStore((state) => state.addNote)
  const updateNote = useStore((state) => state.updateNote)
  const setEditingNote = useStore((state) => state.setEditingNote)
  const setAllTags = useStore((state) => state.setAllTags)
  const allTags = useStore((state) => state.allTags)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [tags, setTags] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightContainerRef = useRef<HTMLPreElement>(null)

  // Initialize form when editing or opening for new note
  useEffect(() => {
    if (isModalOpen) {
      if (editingNote) {
        setTitle(editingNote.title)
        setContent(editingNote.content)
        setLanguage(editingNote.language || 'javascript')
        setTags(editingNote.tags.join(', '))
      } else {
        setTitle('')
        setContent('')
        setLanguage('javascript')
        setTags('')
      }
    }
  }, [isModalOpen, editingNote])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isModalOpen])

  const closeModal = () => {
    setModalOpen(false)
    setEditingNote(null)
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessage('Code copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
      setCopiedMessage('Failed to copy code')
    }
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and content')
      return
    }

    setIsSaving(true)

    try {
      const now = new Date().toISOString()
      const parsedTags = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)

      // Update all tags
      const allTagsSet = new Set(allTags)
      parsedTags.forEach((tag) => allTagsSet.add(tag))
      setAllTags(Array.from(allTagsSet))

      if (editingNote) {
        // Update existing note
        const updatedNote: Note = {
          ...editingNote,
          title,
          content,
          language,
          tags: parsedTags,
          updatedAt: now,
        }
        await updateNote(updatedNote)
      } else {
        // Create new note - let Firestore generate the ID
        const newNote: Note = {
          id: '', // Will be set by Firestore
          title,
          content,
          language,
          tags: parsedTags,
          createdAt: now,
          updatedAt: now,
        }
        await addNote(newNote)
      }

      closeModal()
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Failed to save snippet')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={closeModal}>
      <div
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {editingNote ? 'Edit Snippet' : 'Create New Snippet'}
          </h2>
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="modal-title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="modal-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter snippet title…"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold outline-none transition"
          />
        </div>

        {/* Language Selection */}
        <div className="mb-4">
          <label htmlFor="modal-language" className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            id="modal-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Code Editor with Live Syntax Highlighting */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Code</label>
            <button
              onClick={handleCopyCode}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition"
            >
              Copy Code
            </button>
          </div>

          {/* Editor Wrapper */}
          <div
            className="relative rounded-lg border border-gray-300 bg-gray-900 overflow-hidden"
            style={{ height: '400px' }}
          >
            {/* Highlighted Code Container - Behind textarea */}
            <pre
              ref={highlightContainerRef}
              className="absolute inset-0 p-3 m-0 font-mono text-sm text-gray-100 pointer-events-none whitespace-pre-wrap break-words leading-6 overflow-auto"
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
              }}
              dangerouslySetInnerHTML={{ __html: highlightCode(content, language) }}
            />

            {/* Input Textarea - On top, reads input */}
            <textarea
              ref={textareaRef}
              id="modal-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onScroll={(e) => {
                if (highlightContainerRef.current) {
                  highlightContainerRef.current.scrollTop = e.currentTarget.scrollTop
                  highlightContainerRef.current.scrollLeft = e.currentTarget.scrollLeft
                }
              }}
              placeholder="Enter your code here…"
              className="absolute inset-0 w-full h-full p-3 bg-transparent text-white font-mono text-sm leading-6 border-0 outline-none resize-none focus:ring-0 placeholder-gray-500 overflow-auto focus:ring-2 focus:ring-blue-500"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Tags Input */}
        <div className="mb-6">
          <label htmlFor="modal-tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            id="modal-tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., javascript, react, utility"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isSaving ? 'Saving…' : editingNote ? 'Update' : 'Create'}
          </button>
        </div>
      </div>

      {/* Copy Toast */}
      {copiedMessage && <Toast message={copiedMessage} />}
    </div>
  )
}
