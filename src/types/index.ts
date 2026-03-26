export interface Note {
  id: string
  title: string
  content: string
  language?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface AppState {
  notes: Note[]
  filteredNotes: Note[]
  selectedTags: Set<string>
  searchQuery: string
  isModalOpen: boolean
  editingNote: Note | null
  allTags: string[]
}
