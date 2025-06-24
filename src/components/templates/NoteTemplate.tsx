import React from 'react'
import { Card, CardHeader, Separator } from '../atoms'
import { NoteHeader } from '../molecules'
import { NoteForm } from '../organisms'
import { getHostnameFromUrl, formatDate } from '../../utils'
import { Note } from '../../types'

interface NoteTemplateProps {
  currentUrl?: string
  savedNote?: Note
  onSave: (data: { title: string; content: string; tags: string[] }) => void
  onDelete: () => void
  onShowAllNotes: () => void
  isSaving: boolean
}

export const NoteTemplate: React.FC<NoteTemplateProps> = ({
  currentUrl,
  savedNote,
  onSave,
  onDelete,
  onShowAllNotes,
  isSaving
}) => {
  return (
    <div className="w-80 h-96 bg-background">
      <Card className="h-full rounded-none border-none">
        <CardHeader>
          <NoteHeader
            title="Notably"
            subtitle={currentUrl ? getHostnameFromUrl(currentUrl) : 'No URL'}
            actionButton={
              <button
                onClick={onShowAllNotes}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                All Notes
              </button>
            }
          />
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

        {savedNote && (
          <div className="px-6 pb-4">
            <div className="text-xs text-green-600 flex items-center gap-1">
              <span>✓</span>
              <span>Note saved • {formatDate(savedNote.timestamp)}</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
} 