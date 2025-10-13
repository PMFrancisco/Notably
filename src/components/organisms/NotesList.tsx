import React from 'react'
import { CardContent, Button } from '../atoms'
import { NoteCard } from './NoteCard'
import { EmptyState } from '../atoms'
import { Note } from '../../types'

interface NotesListProps {
  notes: Record<string, Note>
  onDeleteNote: (url: string) => void
  onExportNotes: () => void
  isFiltering?: boolean
  className?: string
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  onDeleteNote,
  onExportNotes,
  isFiltering = false,
  className = ''
}) => {
  const noteEntries = Object.entries(notes).filter(([, note]) => note.title || note.content)
  
  // Determine empty state message
  const emptyMessage = isFiltering 
    ? "No notes match your search" 
    : "No notes saved yet"

  return (
    <>
      <CardContent className={`space-y-3 overflow-y-auto flex-1 ${className}`}>
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
      
      <div className="px-6 pt-3 pb-6 flex-shrink-0">
        <Button 
          onClick={onExportNotes} 
          size="sm"
          className="w-full"
        >
          Export All Notes
        </Button>
      </div>
    </>
  )
} 