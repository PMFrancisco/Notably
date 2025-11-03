import { useState } from 'react'
import { TrashedNote } from '../../types'
import { Card, CardHeader, CardContent, Button } from '../atoms'
import { TrashedNoteCard } from './TrashedNoteCard'

interface TrashViewProps {
  trash: { [key: string]: TrashedNote }
  onRestore: (url: string) => void
  onPermanentDelete: (url: string) => void
  onEmptyTrash: () => void
  onBack: () => void
}

export const TrashView = ({ 
  trash, 
  onRestore, 
  onPermanentDelete, 
  onEmptyTrash,
  onBack 
}: TrashViewProps) => {
  const [showEmptyConfirm, setShowEmptyConfirm] = useState(false)
  
  const trashEntries = Object.entries(trash).sort(
    ([, a], [, b]) => b.deletedAt - a.deletedAt
  )
  
  const trashCount = trashEntries.length

  const handleEmptyTrash = () => {
    if (showEmptyConfirm) {
      onEmptyTrash()
      setShowEmptyConfirm(false)
    } else {
      setShowEmptyConfirm(true)
    }
  }

  return (
    <Card className="flex flex-col min-h-[500px]">
      {/* Header */}
      <CardHeader className="flex-shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            title="Back to all notes"
          >
            ← Back
          </Button>
          <h2 className="text-xl font-semibold">🗑️ Trash</h2>
          <div className="w-16" /> {/* Spacer for alignment */}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            {trashCount === 0 
              ? 'No items in trash' 
              : `${trashCount} item${trashCount !== 1 ? 's' : ''} • Kept for 30 days`}
          </p>
          {trashCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEmptyTrash}
            >
              {showEmptyConfirm ? '⚠️ Confirm Empty' : 'Empty Trash'}
            </Button>
          )}
        </div>
        
        {showEmptyConfirm && (
          <div className="flex items-center justify-between px-3 py-2 bg-destructive/10 border border-destructive/20 rounded-md text-sm">
            <span>This will permanently delete all {trashCount} items!</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmptyConfirm(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 overflow-y-auto min-h-0 space-y-3 pb-4">
        {trashCount === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="text-6xl mb-4">🗑️</div>
            <p className="text-lg font-medium text-muted-foreground">Trash is empty</p>
            <p className="text-sm text-muted-foreground mt-2">
              Deleted notes will appear here for 30 days
            </p>
          </div>
        ) : (
          trashEntries.map(([url, trashedNote]) => (
            <TrashedNoteCard
              key={url}
              url={url}
              trashedNote={trashedNote}
              onRestore={onRestore}
              onPermanentDelete={onPermanentDelete}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}

