import browser from 'webextension-polyfill'
import { Note, TrashedNote } from '../types'

// Trash configuration
const TRASH_KEY = 'notably_trash'
const TRASH_MAX_DAYS = 30
const TRASH_MAX_COUNT = 50

export const saveNote = async (url: string, noteData: Note): Promise<void> => {
  try {
    await browser.storage.sync.set({ [url]: noteData })
  } catch (error) {
    console.error('Error saving note:', error)
    throw error
  }
}

export const loadNote = async (url: string): Promise<Note | null> => {
  try {
    const result = await browser.storage.sync.get(url)
    return result[url] as Note || null
  } catch (error) {
    console.error('Error loading note:', error)
    throw error
  }
}

export const loadAllNotes = async (): Promise<{ [key: string]: Note }> => {
  try {
    const result = await browser.storage.sync.get(null)
    // Filter out the trash key - it's not a note
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [TRASH_KEY]: _, ...notes } = result
    return notes as { [key: string]: Note }
  } catch (error) {
    console.error('Error loading all notes:', error)
    throw error
  }
}

export const deleteNote = async (url: string): Promise<void> => {
  try {
    await browser.storage.sync.remove(url)
  } catch (error) {
    console.error('Error deleting note:', error)
    throw error
  }
}

export const importNotes = async (notes: Record<string, Note>): Promise<number> => {
  try {
    // Batch import all notes
    await browser.storage.sync.set(notes)
    
    // Return count of imported notes
    return Object.keys(notes).length
  } catch (error) {
    console.error('Error importing notes:', error)
    throw error
  }
}

export const createNoteData = (
  title: string,
  content: string,
  url: string,
  tags: string[]
): Note => {
  return {
    title: title.trim(),
    content: content.trim(),
    url,
    timestamp: Date.now(),
    tags: tags.filter(Boolean)
  }
}

// Trash management functions

export const loadTrash = async (): Promise<{ [key: string]: TrashedNote }> => {
  try {
    const result = await browser.storage.sync.get(TRASH_KEY)
    return result[TRASH_KEY] || {}
  } catch (error) {
    console.error('Error loading trash:', error)
    throw error
  }
}

export const saveTrash = async (trash: { [key: string]: TrashedNote }): Promise<void> => {
  try {
    await browser.storage.sync.set({ [TRASH_KEY]: trash })
  } catch (error) {
    console.error('Error saving trash:', error)
    throw error
  }
}

export const cleanupTrash = async (): Promise<void> => {
  try {
    const trash = await loadTrash()
    const now = Date.now()
    const thirtyDaysInMs = TRASH_MAX_DAYS * 24 * 60 * 60 * 1000
    
    // Filter out expired notes (older than 30 days)
    let cleanedTrash = Object.entries(trash).filter(
      ([, trashedNote]) => now - trashedNote.deletedAt < thirtyDaysInMs
    )
    
    // If still over the count limit, keep only the most recent ones
    if (cleanedTrash.length > TRASH_MAX_COUNT) {
      cleanedTrash = cleanedTrash
        .sort(([, a], [, b]) => b.deletedAt - a.deletedAt)
        .slice(0, TRASH_MAX_COUNT)
    }
    
    const cleanedTrashObj = Object.fromEntries(cleanedTrash)
    await saveTrash(cleanedTrashObj)
  } catch (error) {
    console.error('Error cleaning up trash:', error)
    throw error
  }
}

export const moveNoteToTrash = async (url: string, note: Note): Promise<void> => {
  try {
    const trash = await loadTrash()
    
    // Add note to trash
    trash[url] = {
      note,
      deletedAt: Date.now(),
      originalUrl: url
    }
    
    await saveTrash(trash)
    
    // Remove from active notes
    await deleteNote(url)
    
    // Cleanup old trash
    await cleanupTrash()
  } catch (error) {
    console.error('Error moving note to trash:', error)
    throw error
  }
}

export const restoreNoteFromTrash = async (url: string): Promise<Note | null> => {
  try {
    const trash = await loadTrash()
    const trashedNote = trash[url]
    
    if (!trashedNote) {
      return null
    }
    
    // Restore note to active notes
    await saveNote(url, trashedNote.note)
    
    // Remove from trash
    delete trash[url]
    await saveTrash(trash)
    
    return trashedNote.note
  } catch (error) {
    console.error('Error restoring note from trash:', error)
    throw error
  }
}

export const permanentlyDeleteNote = async (url: string): Promise<void> => {
  try {
    const trash = await loadTrash()
    delete trash[url]
    await saveTrash(trash)
  } catch (error) {
    console.error('Error permanently deleting note:', error)
    throw error
  }
}

export const emptyTrash = async (): Promise<void> => {
  try {
    await saveTrash({})
  } catch (error) {
    console.error('Error emptying trash:', error)
    throw error
  }
}

export const getTrashCount = async (): Promise<number> => {
  try {
    const trash = await loadTrash()
    return Object.keys(trash).length
  } catch (error) {
    console.error('Error getting trash count:', error)
    return 0
  }
}

export const getDaysUntilDeletion = (deletedAt: number): number => {
  const now = Date.now()
  const thirtyDaysInMs = TRASH_MAX_DAYS * 24 * 60 * 60 * 1000
  const timeElapsed = now - deletedAt
  const timeRemaining = thirtyDaysInMs - timeElapsed
  const daysRemaining = Math.ceil(timeRemaining / (24 * 60 * 60 * 1000))
  return Math.max(0, daysRemaining)
} 