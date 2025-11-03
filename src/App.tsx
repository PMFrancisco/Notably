import { useState, useEffect } from 'react'
import browser from 'webextension-polyfill'
import { 
  NoteTemplate,
  NotesListTemplate,
  LoadingTemplate
} from './components'
import { 
  exportNotesToJson,
  importNotesFromJson,
  importNotes
} from './utils'
import { useNotes, useCurrentTab, useToast } from './hooks'

function App() {
  const [showAllNotes, setShowAllNotes] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  
  const { showToast } = useToast()

  const { currentUrl, isLoading } = useCurrentTab()
  const { 
    savedNote, 
    allNotes, 
    isSaving, 
    saveNote, 
    loadNoteForUrl, 
    loadAllNotesData, 
    deleteNote,
    toggleStar
  } = useNotes()

  // Theme initialization is now handled by ThemeSelector component

  // Load existing note when URL is available
  useEffect(() => {
    const loadExistingNote = async () => {
      if (!currentUrl) return
      
      try {
        await loadNoteForUrl(currentUrl)
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
    try {
      await saveNote(currentUrl, data.title, data.content, data.tags)
      const isUpdate = !!savedNote
      showToast(isUpdate ? 'Note updated!' : 'Note saved successfully!', 'success')
    } catch {
      showToast('Failed to save note', 'error')
    }
  }

  const handleDeleteNote = async () => {
    if (!currentUrl) return
    try {
      await deleteNote(currentUrl)
      showToast('Note deleted', 'success')
    } catch {
      showToast('Failed to delete note', 'error')
    }
  }

  const handleDeleteNoteById = async (url: string) => {
    try {
      await deleteNote(url)
      await loadAllNotesData() // Refresh the list
      showToast('Note deleted', 'success')
    } catch {
      showToast('Failed to delete note', 'error')
    }
  }

  const handleOpenPage = async (url: string) => {
    try {
      await browser.tabs.create({ url })
    } catch (error) {
      console.error('Error opening page:', error)
      showToast('Failed to open page', 'error')
    }
  }

  const handleExportNotes = async () => {
    setIsExporting(true)
    try {
      await exportNotesToJson()
      showToast('Notes exported successfully!', 'success')
    } catch (error) {
      console.error('Error exporting notes:', error)
      showToast('Failed to export notes', 'error')
    } finally {
      setIsExporting(false)
    }
  }

  const handleImportNotes = async (file: File) => {
    setIsImporting(true)
    try {
      const validatedNotes = await importNotesFromJson(file)
      const count = await importNotes(validatedNotes)
      await loadAllNotesData() // Refresh the list
      showToast(`Imported ${count} note${count !== 1 ? 's' : ''} successfully!`, 'success')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to import notes'
      showToast(errorMessage, 'error')
    } finally {
      setIsImporting(false)
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
        onToggleStar={toggleStar}
        onOpenPage={handleOpenPage}
        onExportNotes={handleExportNotes}
        onImportNotes={handleImportNotes}
        isImporting={isImporting}
        isExporting={isExporting}
      />
    )
  }

  const handleToggleStar = async () => {
    if (!currentUrl) return
    try {
      await toggleStar(currentUrl)
    } catch {
      showToast('Failed to update star', 'error')
    }
  }

  return (
    <NoteTemplate
      currentUrl={currentUrl}
      savedNote={savedNote || undefined}
      onSave={handleSaveNote}
      onDelete={handleDeleteNote}
      onShowAllNotes={() => setShowAllNotes(true)}
      onToggleStar={savedNote ? handleToggleStar : undefined}
      isSaving={isSaving}
    />
  )
}

export default App
