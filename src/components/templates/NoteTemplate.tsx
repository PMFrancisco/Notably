import React from 'react'
import { Card, CardHeader, Button } from '../atoms'
import { ThemeSelector } from '../molecules'
import { NoteForm } from '../organisms'
import { getHostnameFromUrl, formatDate } from '../../utils'
import { Note } from '../../types'

interface NoteTemplateProps {
  currentUrl?: string
  savedNote?: Note
  onSave: (data: { title: string; content: string; tags: string[] }) => void
  onDelete: () => void
  onShowAllNotes: () => void
  onToggleStar?: () => void
  isSaving: boolean
}

export const NoteTemplate: React.FC<NoteTemplateProps> = ({
  currentUrl,
  savedNote,
  onSave,
  onDelete,
  onShowAllNotes,
  onToggleStar,
  isSaving
}) => {
  return (
    <div className="w-80 flex-1 flex flex-col bg-background">
      <Card className="flex-1 rounded-none border-none flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold leading-tight">Notably</h1>
              <div className="flex items-center justify-between gap-2 mt-1">
                <div className="text-xs text-muted-foreground truncate">
                  {currentUrl ? getHostnameFromUrl(currentUrl) : 'No URL'}
                </div>
                {savedNote && (
                  <div className="text-xs text-green-600 flex items-center gap-1 flex-shrink-0">
                    <span>✓</span>
                    <span className="whitespace-nowrap">{formatDate(savedNote.timestamp)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              {savedNote && onToggleStar && (
                <Button
                  variant="icon"
                  size="icon"
                  onClick={onToggleStar}
                  title={savedNote.starred ? 'Unstar note' : 'Star note'}
                >
                  {savedNote.starred ? '⭐' : '☆'}
                </Button>
              )}
              <Button
                variant="icon"
                size="icon"
                onClick={onShowAllNotes}
                title="All Notes"
              >
                📚
              </Button>
              <ThemeSelector />
            </div>
          </div>
        </CardHeader>

        <NoteForm
          initialData={savedNote ? {
            title: savedNote.title,
            content: savedNote.content,
            tags: savedNote.tags || []
          } : undefined}
          onSave={onSave}
          onDelete={savedNote ? onDelete : undefined}
          isSaving={isSaving}
          saveButtonText={savedNote ? 'Update Note' : 'Save Note'}
          showDeleteButton={!!savedNote}
        />
      </Card>
    </div>
  )
} 