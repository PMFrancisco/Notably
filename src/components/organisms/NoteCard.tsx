import React from 'react'
import { Card, Button } from '../atoms'
import { TagDisplay } from '../molecules'
import { Note } from '../../types'
import { formatDate } from '../../utils'

interface NoteCardProps {
  note: Note & { url: string }
  onDelete: (url: string) => void
  onToggleStar?: (url: string) => void
  onOpenPage?: (url: string) => void
  compact?: boolean
}

export const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  onDelete,
  onToggleStar,
  onOpenPage,
  compact = false 
}) => {
  return (
    <Card className="p-3 group">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {onToggleStar && (
              <Button
                variant="icon"
                size="icon"
                onClick={() => onToggleStar(note.url)}
                title={note.starred ? 'Unstar note' : 'Star note'}
                className="text-base flex-shrink-0"
              >
                {note.starred ? '⭐' : '☆'}
              </Button>
            )}
            <h4 className="font-medium text-sm truncate">
              {note.title || 'Untitled'}
            </h4>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDate(note.timestamp)}
            </span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onOpenPage && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenPage(note.url)}
                  className="h-6 w-6 text-sm"
                  title="Open page"
                >
                  ↗
                </Button>
              )}
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete(note.url)}
                className="h-6 w-6 text-lg"
                title="Delete note"
              >
                ×
              </Button>
            </div>
          </div>
        </div>
        
        {!compact && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {note.content}
          </p>
        )}
        
        {note.tags && note.tags.length > 0 && (
          <TagDisplay 
            tags={note.tags} 
            variant="outline"
          />
        )}
      </div>
    </Card>
  )
} 