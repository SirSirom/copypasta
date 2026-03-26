# CopyPasta - Code Snippet Manager

A modern, responsive web application for saving, organizing, and managing code snippets. Built with **React**, **TypeScript**, **Tailwind CSS**, and **Firebase**.

## Features

- **User Authentication**: Secure login with email/password or Google Sign-In
- **Code Snippet Management**: Create, edit, and delete code snippets
- **Search & Filter**: Find snippets by title, content, or tags with real-time filtering
- **Tag Organization**: Multi-select tag filtering for easy organization
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Changes are reflected immediately in the UI
- **Keyboard Shortcuts**: Press ESC to close modals
- **Copy to Clipboard**: Quick copy functionality for code snippets
- **Accessibility**: Full keyboard navigation and ARIA labels

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore (optional)
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- A Firebase project (create at [firebase.google.com](https://firebase.google.com))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd copypasta
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file based on `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Firebase credentials from your Firebase console.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This generates an optimized build in the `dist` folder.

### Deploy to Firebase Hosting

```bash
npm run build
firebase deploy
```

## Project Structure

```
copypasta/
├── src/
│   ├── components/
│   │   ├── LoginScreen.tsx        # Authentication UI
│   │   ├── Sidebar.tsx            # Left sidebar with search/tags
│   │   ├── SearchInput.tsx        # Search component
│   │   ├── TagList.tsx            # Tag filter component
│   │   ├── UserProfile.tsx        # User profile & logout
│   │   ├── MainLayout.tsx         # Main app layout
│   │   ├── NoteGrid.tsx           # Grid of snippets
│   │   ├── NoteCard.tsx           # Individual snippet card
│   │   ├── EditorModal.tsx        # Create/edit modal
│   │   └── FloatingButton.tsx     # FAB for new snippets
│   ├── store/
│   │   └── store.ts              # Zustand state management
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── lib/
│   │   └── firebase.ts           # Firebase configuration
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── public/
│   └── index.html                # HTML template
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Key Components

### LoginScreen
Handles user authentication with email/password and Google Sign-In.

### Sidebar
Includes search input, tag filter list, and user profile section.

### NoteGrid & NoteCard
Displays snippets in a responsive grid with copy, edit, and delete actions.

### EditorModal
Modal for creating and editing snippets with support for:
- Title and content input
- Tag management
- Save/Cancel actions

### FloatingButton
Fixed position button (bottom-right) to create new snippets.

## State Management

The app uses **Zustand** for centralized state management:

```typescript
type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}
```

### Store Actions

- `addNote(note)` - Create a new snippet
- `updateNote(note)` - Update existing snippet
- `deleteNote(id)` - Delete a snippet
- `setSearchQuery(query)` - Update search filter
- `setSelectedTags(tags)` - Update tag filters
- `setUser(user)` - Update authenticated user

## Keyboard Shortcuts

- **ESC** - Close modals
- **Future**: Ctrl+N could be added for quick new snippet

## Styling

The app uses Tailwind CSS utility-first approach with:

- **Consistent spacing**: `p-4`, `gap-6`
- **Rounded corners**: `rounded-xl`
- **Subtle shadows**: `shadow-sm`, `shadow-md`
- **Color palette**: Neutral grays with blue accent
- **Responsive**: Mobile-first design with breakpoints

## Accessibility

- All buttons have `aria-label` attributes
- Modal focuses and can be closed with ESC
- Inputs have proper labels
- Semantic HTML structure
- WCAG 2.1 AA compliant

## Future Enhancements

- [ ] Markdown preview support
- [ ] Code syntax highlighting
- [ ] Drag & drop sorting
- [ ] Dark mode
- [ ] Export snippets
- [ ] Share functionality
- [ ] Collaboration features
- [ ] Integration with Firestore for persistence

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

5. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## Usage

1. **Sign Up/Login**: Create an account or sign in with your existing credentials
2. **Add Snippets**: Click "Add New Snippet" to create a new code snippet
3. **Search**: Use the search bar to find specific snippets
4. **Edit/Delete**: Use the action buttons on each snippet card

## Security

- User data is isolated - users can only access their own snippets
- Firebase security rules ensure proper access control
- Authentication is required for all data operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
