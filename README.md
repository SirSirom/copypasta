# CopyPasta - Code Snippet Manager

A modern web application for saving, organizing, and sharing code snippets. Built with Firebase for authentication and data storage.

## Features

- **User Authentication**: Sign up and login with email/password or Google account
- **Code Snippet Management**: Save code snippets with syntax highlighting
- **Search & Filter**: Find snippets by title, tags, or code content
- **Multiple Languages**: Support for JavaScript, Python, Java, C++, C#, PHP, Ruby, Go, Rust, HTML, CSS, SQL, Bash, and more
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Changes are reflected immediately

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Authentication, Firestore)
- **Code Highlighting**: Prism.js
- **Icons**: Font Awesome
- **Hosting**: Firebase Hosting

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd copypasta
   ```

2. **Install Firebase CLI** (if not already installed)

   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase**

   ```bash
   firebase login
   ```

4. **Initialize Firebase project** (if not already done)

   ```bash
   firebase init
   ```

   Select Hosting, Firestore, and Authentication when prompted.

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
