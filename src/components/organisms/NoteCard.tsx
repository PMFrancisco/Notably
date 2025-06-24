import React from 'react'
import { Card, Button } from '../atoms'
import { TagDisplay } from '../molecules'
import { Note } from '../../types'
import { formatDate, getHostnameFromUrl } from '../../utils'

interface NoteCardProps {
  note: Note & { url: string }
  onDelete: (url: string) => void
  compact?: boolean
}

export const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  onDelete, 
  compact = false 
}) => {
  return (
    <Card className="p-3">
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm truncate flex-1">
            {note.title || 'Untitled'}
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(note.url)}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
          >
            ×
          </Button>
        </div>
        
        {!compact && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {note.content}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground truncate flex-1">
            {getHostnameFromUrl(note.url)}
          </span>
          <span className="text-muted-foreground">
            {formatDate(note.timestamp)}
          </span>
        </div>
        
        <TagDisplay 
          tags={note.tags || []} 
          variant="outline"
        />
      </div>
    </Card>
  )
} 