# Notably 📝

> A modern, cross-browser note-taking extension that helps you capture ideas, thoughts, and information on any website.

![Version](https://img.shields.io/badge/version-0.4.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![React](https://img.shields.io/badge/react-19.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.8.3-blue.svg)

---

## ✨ Features

- 📝 **Quick Note Taking** - Take notes instantly on any website
- 🔗 **URL Association** - Notes are automatically linked to the current website
- 🏷️ **Tag System** - Organize notes with custom tags for easy categorization
- 🔍 **Search & Filter** - Quickly find notes by searching through titles, content, and tags
- 📚 **View All Notes** - Browse all your saved notes in one place
- 🎨 **Theme Customization** - Choose from 6 beautiful color themes (Yellow, Pink, Blue, Green, Orange, Purple)
- 📤 **Export Functionality** - Export all your notes to JSON format
- 📥 **Import Functionality** - Import notes from previously exported JSON files
- 🗑️ **Easy Management** - Delete notes you no longer need
- ☁️ **Cloud Sync** - Automatic synchronization across devices using browser sync storage
- 🌐 **Cross-Browser** - Works on both Chrome and Firefox
- ⌨️ **Keyboard Shortcuts** - Quick save and delete with keyboard commands

---

## ⌨️ Keyboard Shortcuts

Speed up your note-taking workflow with these convenient keyboard shortcuts:

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+Enter` (Mac: `Cmd+Enter`) | Save Note | Quickly save the current note |
| `Ctrl+Shift+Backspace` (Mac: `Cmd+Shift+Backspace`) | Delete Note | Delete the current note |

> **Tip**: Hover over the Save and Delete buttons to see the keyboard shortcuts!

---

## 📸 Screenshots

<!-- TODO: Add screenshots here -->
```
Coming soon! Screenshots of the extension in action.
```

---

## 🚀 Installation

### For Users

#### Chrome Web Store
*Coming soon - Extension will be available on Chrome Web Store*

#### Firefox Add-ons
*Coming soon - Extension will be available on Firefox Add-ons*

#### Manual Installation (Development)

**Chrome:**
1. Download or clone this repository
2. Run `npm install` and `npm run build:chrome`
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" (toggle in top-right corner)
5. Click "Load unpacked"
6. Select the `dist-chrome` folder from the project

**Firefox:**
1. Download or clone this repository
2. Run `npm install` and `npm run build:firefox`
3. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the `dist-firefox` folder

---

## 💻 Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/PMFrancisco/Notably.git
   cd Notably
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   # Build for both browsers
   npm run build:cross-browser

   # Or build for specific browser
   npm run build:chrome    # Chrome/Edge
   npm run build:firefox   # Firefox
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build the extension |
| `npm run build-ts` | TypeScript check + build |
| `npm run build:cross-browser` | Build for both Chrome and Firefox |
| `npm run build:chrome` | Build specifically for Chrome |
| `npm run build:firefox` | Build specifically for Firefox |
| `npm run lint` | Run ESLint for code quality |
| `npm test` | Run Jest tests |
| `npm run preview` | Preview production build |

---

## 🛠️ Tech Stack

**Frontend:**
- **React 19.2.0** - UI framework
- **TypeScript 5.8.3** - Type safety
- **Vite 6.3.6** - Build tool & dev server
- **Tailwind CSS 4.1.14** - Styling
- **Lucide React** - Icons

**Browser APIs:**
- **webextension-polyfill** - Cross-browser compatibility

**Testing:**
- **Jest 29.7.0** - Test runner
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction testing

**Code Quality:**
- **ESLint 9.37.0** - Linting
- **TypeScript ESLint** - TypeScript-specific linting rules

---

## 📁 Project Structure

```
Notably/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── public/
│   ├── icons/             # Extension icons
│   ├── manifest.json      # Base manifest
│   ├── manifest-chrome.json
│   └── manifest-firefox.json
├── src/
│   ├── components/        # React components (Atomic Design)
│   │   ├── atoms/        # Basic UI elements
│   │   ├── molecules/    # Composite components
│   │   ├── organisms/    # Complex components
│   │   └── templates/    # Page layouts
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── background/       # Background script
│   ├── content/          # Content script
│   ├── __tests__/        # Test files
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── scripts/              # Build scripts
└── jest/                 # Jest configuration
```

### Architecture

The project follows the **Atomic Design** pattern:
- **Atoms**: Basic building blocks (Button, Input, Badge, etc.)
- **Molecules**: Simple combinations (FormField, NoteHeader, etc.)
- **Organisms**: Complex components (NoteForm, NotesList, etc.)
- **Templates**: Page layouts (NoteTemplate, NotesListTemplate, etc.)

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

Run tests with coverage:

```bash
npm test -- --coverage
```

**Current Test Coverage:**
- ✅ 22 tests passing
- Component rendering
- User interactions
- Form validation
- Note management
- Navigation
- Search functionality

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Run quality checks**
   ```bash
   npm run lint    # Check code quality
   npm test        # Run tests
   npm run build   # Ensure it builds
   ```

5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
   *Follow [Conventional Commits](https://www.conventionalcommits.org/) format*

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

---

## 📝 Usage

### Taking a Note

1. Click the Notably icon in your browser toolbar
2. The extension popup opens showing the current website
3. Add a title (optional) and your note content
4. Add tags by typing and pressing Enter or comma
5. Click "Save Note" to save

### Viewing All Notes

1. Open the extension popup
2. Click "All Notes" button
3. Browse all your saved notes
4. Use the search bar to filter notes by title, content, or tags
5. Click on any note to view details
6. Use the delete button to remove notes

### Exporting Notes

1. Go to "All Notes" view
2. Click "Export All Notes" button
3. A JSON file will be downloaded with all your notes

### Importing Notes

1. Go to "All Notes" view
2. Click "Import Notes" button
3. Select a previously exported JSON file
4. Your notes will be imported and merged with existing notes
5. Notes with the same URL will be overwritten with the imported version

### Changing Themes

1. Look for the colored circle in the top-right corner
2. Click it to reveal the theme selector
3. Choose your preferred color theme
4. The theme is saved automatically

---

## 🔐 Privacy

- ✅ **No data collection** - Notably doesn't collect or send any user data
- ✅ **Local storage** - All notes are stored locally in your browser
- ✅ **Browser sync** - Optional sync uses your browser's built-in sync (encrypted by your browser)
- ✅ **No tracking** - No analytics, no tracking, no telemetry
- ✅ **Open source** - Full transparency - check the code yourself!

### Permissions

- `storage` - To save your notes
- `tabs` - To get the current tab's URL
- `activeTab` - To associate notes with websites

---

## 🗺️ Roadmap

### Version 0.4.0 (Current)
- [x] Search and filter notes
- [x] Import notes from JSON
- [x] Keyboard shortcuts
- [x] Toast notifications
- [ ] Note statistics

### Version 0.5.0 (Future)
- [ ] Markdown support
- [ ] Folders/categories
- [ ] Favorites/starred notes
- [ ] Trash with restore functionality
- [ ] Dark mode

### Version 0.6.0+ (Future)
- [ ] Smart tagging with autocomplete
- [ ] Note templates
- [ ] Linked notes
- [ ] Enhanced themes
- [ ] Browser sidebar support

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## 📜 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**PMFrancisco**
- GitHub: [@PMFrancisco](https://github.com/PMFrancisco)
- Project: [Notably](https://github.com/PMFrancisco/Notably)

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Cross-browser compatibility via [webextension-polyfill](https://github.com/mozilla/webextension-polyfill)

---

## 📧 Support

If you encounter any issues or have questions:
- 🐛 [Open an issue](https://github.com/PMFrancisco/Notably/issues)
- 💬 [Start a discussion](https://github.com/PMFrancisco/Notably/discussions)

---

## ⭐ Show Your Support

If you find Notably useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the code
- 📢 Sharing with others

---

<div align="center">
  <br />
  <p>Made with ❤️ by PMFrancisco</p>
  <p>Happy note-taking! 📝</p>
</div>
