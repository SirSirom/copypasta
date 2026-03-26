import { useMemo, useState } from 'react'
import { useStore } from '../store/store'
import { highlightCode } from '../lib/syntax'
import Toast from './Toast'
import type { Note } from '../types'

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const setEditingNote = useStore((state) => state.setEditingNote)
  const deleteNote = useStore((state) => state.deleteNote)
  const setModalOpen = useStore((state) => state.setModalOpen)
  const [showCopyFeedback, setShowCopyFeedback] = useState(false)

  const truncateText = (text: string, lines: number) => {
    return text.split('\n').slice(0, lines).join('\n')
  }

  const language = note.language || 'javascript'
  const highlighted = useMemo(
    () => highlightCode(truncateText(note.content, 8), language),
    [note.content, language]
  )

  const handleCodeClick = async () => {
    try {
      await navigator.clipboard.writeText(note.content)
      setShowCopyFeedback(true)
      setTimeout(() => setShowCopyFeedback(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleEdit = () => {
    setEditingNote(note)
    setModalOpen(true)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      deleteNote(note.id)
    }
  }

  const createdDate = new Date(note.updatedAt || note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
      {/* Title */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-lg text-gray-900 truncate mb-1">{note.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">{createdDate}</p>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
        </div>
      </div>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="px-4 pt-3 pb-1 flex flex-wrap gap-1">
          {note.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              #{tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Code Preview - Clickable Area */}
      <div
        onClick={handleCodeClick}
        className="mx-4 my-3 cursor-pointer group bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors h-[180px] relative overflow-hidden flex flex-col"
        title="Click to copy"
      >
        <pre
          className="text-gray-100 text-xs font-mono leading-5 overflow-hidden whitespace-pre-wrap break-words flex-1"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        {/* Gradient overlay for truncation indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none" />
      </div>

      {/* Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition"
          title="Edit snippet"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
          title="Delete snippet"
        >
          Delete
        </button>
      </div>

      {/* Copy Toast Feedback */}
      {showCopyFeedback && <Toast message="Copied to clipboard!" />}
    </div>
  )
}

