import browser from 'webextension-polyfill'
import { Note } from '../types'

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
    return result as { [key: string]: Note }
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