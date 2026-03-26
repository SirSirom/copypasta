import { useStore } from '../store/store'

export default function TagList() {
  const allTags = useStore((state) => state.allTags)
  const selectedTags = useStore((state) => state.selectedTags)
  const setSelectedTags = useStore((state) => state.setSelectedTags)

  const handleTagChange = (tag: string) => {
    const newTags = new Set(selectedTags)
    if (newTags.has(tag)) {
      newTags.delete(tag)
    } else {
      newTags.add(tag)
    }
    setSelectedTags(newTags)
  }

  if (allTags.length === 0) {
    return (
      <div className="text-sm text-gray-500">No tags yet. Create a snippet to add tags.</div>
    )
  }

  return (
    <div className="space-y-2 overflow-y-auto">
      {allTags.map((tag) => (
        <label key={tag} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
          <input
            type="checkbox"
            checked={selectedTags.has(tag)}
            onChange={() => handleTagChange(tag)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            aria-label={`Filter by ${tag}`}
          />
          <span className="text-sm text-gray-700">{tag}</span>
        </label>
      ))}
    </div>
  )
}
