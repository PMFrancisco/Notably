import { useState, useCallback } from 'react'
import { Note, TrashedNote } from '../types'
import { 
  saveNote as saveNoteToStorage, 
  loadNote, 
  loadAllNotes, 
  deleteNote as deleteNoteFromStorage, 
  createNoteData,
  moveNoteToTrash as moveToTrashStorage,
  restoreNoteFromTrash as restoreFromTrashStorage,
  permanentlyDeleteNote as permanentDeleteStorage,
  emptyTrash as emptyTrashStorage,
  loadTrash,
  cleanupTrash as cleanupTrashStorage,
  getTrashCount
} from '../utils'

export const useNotes = () => {
  const [savedNote, setSavedNote] = useState<Note | null>(null)
  const [allNotes, setAllNotes] = useState<{ [key: string]: Note }>({})
  const [trash, setTrash] = useState<{ [key: string]: TrashedNote }>({})
  const [trashCount, setTrashCount] = useState<number>(0)
  const [isSaving, setIsSaving] = useState(false)

  const saveNote = useCallback(async (
    url: string,
    title: string,
    content: string,
    tags: string[]
  ) => {
    if (!url || (!title.trim() && !content.trim())) return

    setIsSaving(true)
    
    try {
      // Load existing note to preserve starred status
      const existingNote = await loadNote(url)
      
      // Create new note data
      const noteData = createNoteData(title, content, url, tags)
      
      // Preserve starred status if it exists
      if (existingNote?.starred) {
        noteData.starred = existingNote.starred
      }

      await saveNoteToStorage(url, noteData)
      setSavedNote(noteData)
    } catch (error) {
      console.error('Error saving note:', error)
      throw error
    } finally {
      setIsSaving(false)
    }
  }, [])

  const loadNoteForUrl = useCallback(async (url: string) => {
    try {
      const note = await loadNote(url)
      setSavedNote(note)
      return note
    } catch (error) {
      console.error('Error loading note:', error)
      throw error
    }
  }, [])

  const loadAllNotesData = useCallback(async () => {
    try {
      const notes = await loadAllNotes()
      setAllNotes(notes)
      return notes
    } catch (error) {
      console.error('Error loading all notes:', error)
      throw error
    }
  }, [])

  const deleteNote = useCallback(async (url: string) => {
    try {
      await deleteNoteFromStorage(url)
      setSavedNote(null)
      // Update allNotes if it was loaded
      setAllNotes(prevNotes => {
        const newNotes = { ...prevNotes }
        delete newNotes[url]
        return newNotes
      })
    } catch (error) {
      console.error('Error deleting note:', error)
      throw error
    }
  }, [])

  const clearCurrentNote = useCallback(() => {
    setSavedNote(null)
  }, [])

  const toggleStar = useCallback(async (url: string) => {
    try {
      // Load the current note
      const note = await loadNote(url)
      if (!note) return

      // Toggle starred status
      const updatedNote = { ...note, starred: !note.starred }

      // Save back to storage
      await saveNoteToStorage(url, updatedNote)

      // Update savedNote if it's the current note
      if (savedNote?.url === url) {
        setSavedNote(updatedNote)
      }

      // Update allNotes
      setAllNotes(prevNotes => ({
        ...prevNotes,
        [url]: updatedNote
      }))
    } catch (error) {
      console.error('Error toggling star:', error)
      throw error
    }
  }, [savedNote])

  // Trash operations
  const loadTrashData = useCallback(async () => {
    try {
      await cleanupTrashStorage()
      const trashData = await loadTrash()
      setTrash(trashData)
      const count = await getTrashCount()
      setTrashCount(count)
      return trashData
    } catch (error) {
      console.error('Error loading trash:', error)
      throw error
    }
  }, [])

  const moveToTrash = useCallback(async (url: string) => {
    try {
      const note = await loadNote(url)
      if (!note) return

      await moveToTrashStorage(url, note)
      
      // Update local state
      setSavedNote(null)
      setAllNotes(prevNotes => {
        const newNotes = { ...prevNotes }
        delete newNotes[url]
        return newNotes
      })
      
      // Reload trash to update UI
      await loadTrashData()
    } catch (error) {
      console.error('Error moving to trash:', error)
      throw error
    }
  }, [loadTrashData])

  const restoreFromTrash = useCallback(async (url: string) => {
    try {
      const restoredNote = await restoreFromTrashStorage(url)
      if (!restoredNote) return

      // Update local state
      setAllNotes(prevNotes => ({
        ...prevNotes,
        [url]: restoredNote
      }))
      
      setTrash(prevTrash => {
        const newTrash = { ...prevTrash }
        delete newTrash[url]
        return newTrash
      })
      
      // Update trash count
      const count = await getTrashCount()
      setTrashCount(count)
    } catch (error) {
      console.error('Error restoring from trash:', error)
      throw error
    }
  }, [])

  const permanentlyDelete = useCallback(async (url: string) => {
    try {
      await permanentDeleteStorage(url)
      
      // Update local state
      setTrash(prevTrash => {
        const newTrash = { ...prevTrash }
        delete newTrash[url]
        return newTrash
      })
      
      // Update trash count
      const count = await getTrashCount()
      setTrashCount(count)
    } catch (error) {
      console.error('Error permanently deleting:', error)
      throw error
    }
  }, [])

  const emptyTrash = useCallback(async () => {
    try {
      await emptyTrashStorage()
      setTrash({})
      setTrashCount(0)
    } catch (error) {
      console.error('Error emptying trash:', error)
      throw error
    }
  }, [])

  return {
    savedNote,
    allNotes,
    isSaving,
    saveNote,
    loadNoteForUrl,
    loadAllNotesData,
    deleteNote,
    clearCurrentNote,
    toggleStar,
    // Trash operations
    trash,
    trashCount,
    loadTrashData,
    moveToTrash,
    restoreFromTrash,
    permanentlyDelete,
    emptyTrash
  }
} 