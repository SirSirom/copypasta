import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useStore } from './store/store'
import type { User as FirebaseUser } from 'firebase/auth'
import type { User } from './types'
import LoginScreen from './components/LoginScreen'
import MainLayout from './components/MainLayout'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const setUser = useStore((state) => state.setUser)
  const loadUserNotes = useStore((state) => state.loadUserNotes)
  const user = useStore((state) => state.user)
  const setAuthLoading = useStore((state) => state.setAuthLoading)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'User',
          photoURL: firebaseUser.photoURL || undefined,
        }
        setUser(user)
        // Load user's snippets from Firestore
        loadUserNotes(firebaseUser.uid)
      } else {
        setUser(null)
      }
      setAuthLoading(false)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, loadUserNotes, setAuthLoading])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CopyPasta...</p>
        </div>
      </div>
    )
  }

  return user ? <MainLayout /> : <LoginScreen />
}

