import { create } from 'zustand'
import { collection, addDoc, updateDoc, deleteDoc, doc, query, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Note, User, AuthState, AppState } from '../types'

interface StoreState extends AuthState, AppState {
  // Auth actions
  setUser: (user: User | null) => void
  setAuthLoading: (loading: boolean) => void
  logout: () => void

  // App actions
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => Promise<void>
  updateNote: (note: Note) => Promise<void>
  deleteNote: (id: string) => Promise<void>
  loadUserNotes: (userId: string) => void
  setSearchQuery: (query: string) => void
  setSelectedTags: (tags: Set<string>) => void
  setAllTags: (tags: string[]) => void
  setModalOpen: (open: boolean) => void
  setEditingNote: (note: Note | null) => void
  filterNotes: () => void
}

export const useStore = create<StoreState>((set, get) => ({
  // Auth state
  user: null,
  isLoading: true,
  isAuthenticated: false,

  // App state
  notes: [],
  filteredNotes: [],
  selectedTags: new Set(),
  searchQuery: '',
  isModalOpen: false,
  editingNote: null,
  allTags: [],

  // Auth actions
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setAuthLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null, isAuthenticated: false, notes: [], filteredNotes: [], allTags: [] }),

  // App actions
  setNotes: (notes) => {
    set({ notes })
    get().filterNotes()
  },

  addNote: async (note) => {
    const state = get()
    if (!state.user) {
      console.error('User not authenticated')
      return
    }

    try {
      // Add to Firestore
      const docRef = await addDoc(collection(db, 'users', state.user.id, 'snippets'), {
        title: note.title,
        content: note.content,
        language: note.language,
        tags: note.tags,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      })

      // Update local state with Firestore ID
      const newNote = { ...note, id: docRef.id }
      const notes = [newNote, ...state.notes]
      set({ notes })
      get().filterNotes()
    } catch (error) {
      console.error('Error adding note to Firestore:', error)
      throw error
    }
  },

  updateNote: async (note) => {
    const state = get()
    if (!state.user) {
      console.error('User not authenticated')
      return
    }

    try {
      // Update in Firestore
      const noteRef = doc(db, 'users', state.user.id, 'snippets', note.id)
      await updateDoc(noteRef, {
        title: note.title,
        content: note.content,
        language: note.language,
        tags: note.tags,
        updatedAt: note.updatedAt,
      })

      // Update local state
      const notes = state.notes.map((n) => (n.id === note.id ? note : n))
      set({ notes })
      get().filterNotes()
    } catch (error) {
      console.error('Error updating note in Firestore:', error)
      throw error
    }
  },

  deleteNote: async (id) => {
    const state = get()
    if (!state.user) {
      console.error('User not authenticated')
      return
    }

    try {
      // Delete from Firestore
      const noteRef = doc(db, 'users', state.user.id, 'snippets', id)
      await deleteDoc(noteRef)

      // Update local state
      const notes = state.notes.filter((n) => n.id !== id)
      set({ notes })
      get().filterNotes()
    } catch (error) {
      console.error('Error deleting note from Firestore:', error)
      throw error
    }
  },

  loadUserNotes: (userId) => {
    // Set up real-time listener for user's snippets
    const snippetsRef = collection(db, 'users', userId, 'snippets')
    const q = query(snippetsRef)

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notes: Note[] = []
      const tagsSet = new Set<string>()

      snapshot.forEach((doc) => {
        const data = doc.data()
        const note: Note = {
          id: doc.id,
          title: data.title,
          content: data.content,
          language: data.language || 'javascript',
          tags: data.tags || [],
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        }
        notes.push(note)

        // Collect all tags
        note.tags.forEach((tag) => tagsSet.add(tag))
      })

      set({
        notes: notes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
        allTags: Array.from(tagsSet),
      })
      get().filterNotes()
    })

    // Store unsubscribe function (optional: for cleanup)
    return unsubscribe
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().filterNotes()
  },
  setSelectedTags: (tags) => {
    set({ selectedTags: tags })
    get().filterNotes()
  },
  setAllTags: (tags) => set({ allTags: tags }),
  setModalOpen: (open) => set({ isModalOpen: open }),
  setEditingNote: (note) => set({ editingNote: note }),

  filterNotes: () => {
    const { notes, searchQuery, selectedTags } = get()
    const filtered = notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTags = selectedTags.size === 0 || note.tags.some((tag) => selectedTags.has(tag))
      return matchesSearch && matchesTags
    })
    set({ filteredNotes: filtered })
  },
}))

