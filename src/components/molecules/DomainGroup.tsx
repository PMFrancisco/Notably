import React, { useState } from 'react'
import { NoteCard } from '../organisms'
import { Note } from '../../types'

interface DomainGroupProps {
  domain: string
  notes: Note[]
  onDeleteNote: (url: string) => void
}

export const DomainGroup: React.FC<DomainGroupProps> = ({
  domain,
  notes,
  onDeleteNote
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isExpanded ? '▼' : '▶'}
          </span>
          <span className="font-medium text-foreground">{domain}</span>
          <span className="text-xs text-muted-foreground">
            ({notes.length} {notes.length === 1 ? 'note' : 'notes'})
          </span>
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-3 space-y-2 bg-accent/30">
          {notes.map((note) => (
            <NoteCard
              key={note.url}
              note={note}
              onDelete={onDeleteNote}
            />
          ))}
        </div>
      )}
    </div>
  )
}

