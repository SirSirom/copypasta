import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useStore } from '../store/store'

export default function UserProfile() {
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (!user) return null

  const initials = user.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="border-t pt-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {initials || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{user.displayName}</p>
          <p className="text-xs text-gray-600 truncate">{user.email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        aria-label="Logout"
        className="w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  )
}
