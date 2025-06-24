import { useState, useEffect } from 'react'
import browser from 'webextension-polyfill'
import './App.css'

interface Note {
  title: string;
  content: string;
  url: string;
  timestamp: number;
}

function App() {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [savedNote, setSavedNote] = useState<Note | null>(null)

  // Get current tab URL and load existing note
  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true })
        if (tabs[0]?.url) {
          const url = tabs[0].url
          setCurrentUrl(url)
          
          // Load existing note for this URL
          const result = await browser.storage.sync.get(url)
          if (result[url]) {
            const existingNote = result[url] as Note
            setSavedNote(existingNote)
            setTitle(existingNote.title)
            setNote(existingNote.content)
          }
        }
      } catch (error) {
        console.error('Error getting current tab:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getCurrentTab()
  }, [])

  const saveNote = async () => {
    if (!currentUrl || (!title.trim() && !note.trim())) return

    const noteData: Note = {
      title: title.trim(),
      content: note.trim(),
      url: currentUrl,
      timestamp: Date.now()
    }

    try {
      await browser.storage.sync.set({ [currentUrl]: noteData })
      setSavedNote(noteData)
      console.log('Note saved successfully')
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  const deleteNote = async () => {
    if (!currentUrl) return

    try {
      await browser.storage.sync.remove(currentUrl)
      setSavedNote(null)
      setTitle('')
      setNote('')
      console.log('Note deleted successfully')
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="w-80 h-96 p-4 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="w-80 h-96 p-4 bg-white">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Notably</h1>
        <div className="text-xs text-gray-500 truncate" title={currentUrl}>
          {currentUrl}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Note title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <textarea
            placeholder="Write your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={saveNote}
            disabled={!title.trim() && !note.trim()}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {savedNote ? 'Update Note' : 'Save Note'}
          </button>
          
          {savedNote && (
            <button
              onClick={deleteNote}
              className="bg-red-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          )}
        </div>

        {savedNote && (
          <div className="text-xs text-green-600 mt-2">
            ✓ Note saved for this page
          </div>
        )}
      </div>
    </div>
  )
}

export default App
