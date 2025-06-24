import { useState, useEffect } from 'react'
import { 
  NoteTemplate,
  NotesListTemplate,
  LoadingTemplate
} from './components'
import { 
  Note,
  formatDate,
  parseTags,
  formatTagsForInput,
  getHostnameFromUrl,
  exportNotesToJson
} from './utils'
import { useNotes, useCurrentTab } from './hooks'

function App() {
  const [showAllNotes, setShowAllNotes] = useState(false)

  const { currentUrl, isLoading } = useCurrentTab()
  const { 
    savedNote, 
    allNotes, 
    isSaving, 
    saveNote, 
    loadNoteForUrl, 
    loadAllNotesData, 
    deleteNote,
    clearCurrentNote
  } = useNotes()

  // Load existing note when URL is available
  useEffect(() => {
    const loadExistingNote = async () => {
      if (!currentUrl) return
      
      try {
        const existingNote = await loadNoteForUrl(currentUrl)
      } catch (error) {
        console.error('Error loading existing note:', error)
      }
    }

    loadExistingNote()
  }, [currentUrl, loadNoteForUrl])

  // Load all notes when viewing the list
  useEffect(() => {
    if (showAllNotes) {
      loadAllNotesData()
    }
  }, [showAllNotes, loadAllNotesData])

  const handleSaveNote = async (data: { title: string; content: string; tags: string[] }) => {
    if (!currentUrl) return
    await saveNote(currentUrl, data.title, data.content, data.tags)
  }

  const handleDeleteNote = async () => {
    if (!currentUrl) return

    await deleteNote(currentUrl)
  }

  const handleDeleteNoteById = async (url: string) => {
    await deleteNote(url)
    await loadAllNotesData() // Refresh the list
  }

  const handleExportNotes = async () => {
    try {
      await exportNotesToJson()
    } catch (error) {
      console.error('Error exporting notes:', error)
    }
  }

  if (isLoading) {
    return <LoadingTemplate />
  }

  if (showAllNotes) {
    return (
      <NotesListTemplate
        notes={allNotes}
        onBack={() => setShowAllNotes(false)}
        onDeleteNote={handleDeleteNoteById}
        onExportNotes={handleExportNotes}
      />
    )
  }

  return (
    <NoteTemplate
      currentUrl={currentUrl}
      savedNote={savedNote || undefined}
      onSave={handleSaveNote}
      onDelete={handleDeleteNote}
      onShowAllNotes={() => setShowAllNotes(true)}
      isSaving={isSaving}
    />
  )
}

export default App
