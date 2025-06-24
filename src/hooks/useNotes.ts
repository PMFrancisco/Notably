import { useState, useCallback } from 'react'
import { Note } from '../types'
import { 
  saveNote as saveNoteToStorage, 
  loadNote, 
  loadAllNotes, 
  deleteNote as deleteNoteFromStorage, 
  createNoteData 
} from '../utils'

export const useNotes = () => {
  const [savedNote, setSavedNote] = useState<Note | null>(null)
  const [allNotes, setAllNotes] = useState<{ [key: string]: Note }>({})
  const [isSaving, setIsSaving] = useState(false)

  const saveNote = useCallback(async (
    url: string,
    title: string,
    content: string,
    tags: string[]
  ) => {
    if (!url || (!title.trim() && !content.trim())) return

    setIsSaving(true)
    
    const noteData = createNoteData(title, content, url, tags)

    try {
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

  return {
    savedNote,
    allNotes,
    isSaving,
    saveNote,
    loadNoteForUrl,
    loadAllNotesData,
    deleteNote,
    clearCurrentNote
  }
} 