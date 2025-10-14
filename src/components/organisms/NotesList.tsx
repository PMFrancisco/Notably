import React, { useRef, useState } from 'react'
import { CardContent, Button } from '../atoms'
import { NoteCard } from './NoteCard'
import { EmptyState } from '../atoms'
import { Note } from '../../types'

interface NotesListProps {
  notes: Record<string, Note>
  onDeleteNote: (url: string) => void
  onExportNotes: () => void
  onImportNotes: (file: File) => Promise<void>
  isFiltering?: boolean
  className?: string
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  onDeleteNote,
  onExportNotes,
  onImportNotes,
  isFiltering = false,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isImporting, setIsImporting] = useState(false)
  
  const noteEntries = Object.entries(notes).filter(([, note]) => note.title || note.content)
  
  // Determine empty state message
  const emptyMessage = isFiltering 
    ? "No notes match your search" 
    : "No notes saved yet"

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    try {
      await onImportNotes(file)
    } catch (error) {
      // Error is already logged in the parent component
    } finally {
      setIsImporting(false)
      // Reset file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <CardContent className={`space-y-3 h-72 overflow-y-auto ${className}`}>
        {noteEntries.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          noteEntries.map(([url, note]) => (
            <NoteCard
              key={url}
              note={{ ...note, url }}
              onDelete={onDeleteNote}
            />
          ))
        )}
      </CardContent>
      
      <div className="px-6 pb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex gap-2">
          <Button 
            onClick={handleImportClick}
            size="sm"
            className="flex-1"
            disabled={isImporting}
          >
            {isImporting ? 'Importing...' : 'Import'}
          </Button>
          <Button 
            onClick={onExportNotes} 
            size="sm"
            className="flex-1"
          >
            Export
          </Button>
        </div>
      </div>
    </>
  )
} 