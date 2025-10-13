import { useMemo } from 'react'
import { Note } from '../types'

export const useSearch = (
  notes: Record<string, Note>,
  searchQuery: string
): Record<string, Note> => {
  return useMemo(() => {
    // If no search query, return all notes
    if (!searchQuery.trim()) {
      return notes
    }

    const query = searchQuery.toLowerCase().trim()
    const filteredNotes: Record<string, Note> = {}

    // Filter notes based on title, content, and tags
    Object.entries(notes).forEach(([url, note]) => {
      const titleMatch = note.title.toLowerCase().includes(query)
      const contentMatch = note.content.toLowerCase().includes(query)
      const tagsMatch = note.tags?.some(tag => 
        tag.toLowerCase().includes(query)
      ) || false

      if (titleMatch || contentMatch || tagsMatch) {
        filteredNotes[url] = note
      }
    })

    return filteredNotes
  }, [notes, searchQuery])
}

