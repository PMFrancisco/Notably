import { TrashedNote } from '../../types'
import { getDaysUntilDeletion } from '../../utils'
import { formatDate } from '../../utils/format'
import { Card, CardContent, Badge, Button } from '../atoms'

interface TrashedNoteCardProps {
  url: string
  trashedNote: TrashedNote
  onRestore: (url: string) => void
  onPermanentDelete: (url: string) => void
}

export const TrashedNoteCard = ({ 
  url, 
  trashedNote, 
  onRestore, 
  onPermanentDelete 
}: TrashedNoteCardProps) => {
  const { note, deletedAt } = trashedNote
  const daysRemaining = getDaysUntilDeletion(deletedAt)
  const deletedDate = formatDate(deletedAt)

  return (
    <Card className="group">
      <CardContent className="p-4 space-y-3">
        {/* Title and Actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base line-clamp-1">
              {note.starred && <span className="mr-1">⭐</span>}
              {note.title || 'Untitled Note'}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Deleted {deletedDate} • {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
            </p>
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRestore(url)}
              title="Restore note"
            >
              ↺
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onPermanentDelete(url)}
              title="Delete permanently"
            >
              ×
            </Button>
          </div>
        </div>

        {/* Content Preview */}
        {note.content && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {note.content}
          </p>
        )}

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

