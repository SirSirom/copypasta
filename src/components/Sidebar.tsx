import SearchInput from './SearchInput'
import TagList from './TagList'
import UserProfile from './UserProfile'

export default function Sidebar() {
  return (
    <aside className="bg-white border-r border-gray-200 p-4 flex flex-col justify-between h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Filter</h2>
        
        <SearchInput />

        <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
        <TagList />
      </div>

      <UserProfile />
    </aside>
  )
}
