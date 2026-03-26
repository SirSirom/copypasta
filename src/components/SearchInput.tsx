import { useEffect, useState } from 'react'
import { useStore } from '../store/store'

export default function SearchInput() {
  const searchQuery = useStore((state) => state.searchQuery)
  const setSearchQuery = useStore((state) => state.setSearchQuery)
  const [value, setValue] = useState(searchQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value, setSearchQuery])

  return (
    <div className="mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search…"
        aria-label="Search snippets"
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      />
    </div>
  )
}
