import { useStore } from '../store/store'
import Sidebar from './Sidebar'
import NoteGrid from './NoteGrid'
import EditorModal from './EditorModal'
import FloatingButton from './FloatingButton'

export default function MainLayout() {
  // Notes are now loaded from Firestore via App.tsx -> loadUserNotes
  const notes = useStore((state) => state.notes)

  return (
    <div className="grid grid-cols-[260px_1fr] h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="p-6 bg-gray-50 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Snippets</h1>
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No snippets yet. Create your first one!</p>
            </div>
          ) : (
            <NoteGrid />
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingButton />

      {/* Editor Modal */}
      <EditorModal />
    </div>
  )
}

