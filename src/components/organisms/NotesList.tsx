import React from 'react'
import { CardContent, Button } from '../atoms'
import { NoteCard } from './NoteCard'
import { EmptyState } from '../atoms'
import { Note } from '../../types'

interface NotesListProps {
  notes: Record<string, Note>
  onDeleteNote: (url: string) => void
  onExportNotes: () => void
  className?: string
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  onDeleteNote,
  onExportNotes,
  className = ''
}) => {
  const noteEntries = Object.entries(notes).filter(([_, note]) => note.title || note.content)

  return (
    <>
      <CardContent className={`space-y-3 overflow-y-auto max-h-64 ${className}`}>
        {noteEntries.length === 0 ? (
          <EmptyState message="No notes saved yet" />
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
      
      <div className="px-6 pt-3">
        <Button 
          onClick={onExportNotes} 
          variant="outline" 
          size="sm"
          className="w-full"
        >
          Export All Notes
        </Button>
      </div>
    </>
  )
} 