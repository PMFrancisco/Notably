import { Note } from '../types'

export interface ImportValidationResult {
  isValid: boolean
  notes?: Record<string, Note>
  error?: string
}

const isValidNote = (note: any): note is Note => {
  return (
    typeof note === 'object' &&
    note !== null &&
    typeof note.title === 'string' &&
    typeof note.content === 'string' &&
    typeof note.url === 'string' &&
    typeof note.timestamp === 'number' &&
    (note.tags === undefined || Array.isArray(note.tags))
  )
}

export const importNotesFromJson = async (file: File): Promise<Record<string, Note>> => {
  try {
    // Read file contents
    const text = await file.text()
    
    // Parse JSON
    let data: any
    try {
      data = JSON.parse(text)
    } catch (error) {
      throw new Error('Invalid JSON file. Please select a valid Notably export file.')
    }

    // Validate structure
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid file format. Expected an object with notes.')
    }

    // Validate each note
    const validatedNotes: Record<string, Note> = {}
    const entries = Object.entries(data)

    if (entries.length === 0) {
      throw new Error('No notes found in the file.')
    }

    for (const [url, note] of entries) {
      if (!isValidNote(note)) {
        throw new Error(`Invalid note format for URL: ${url}. Missing required fields.`)
      }
      validatedNotes[url] = note
    }

    return validatedNotes
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to import notes. Please try again.')
  }
}
