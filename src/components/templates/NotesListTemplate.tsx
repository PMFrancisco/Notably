import React from 'react'
import { Card, CardHeader } from '../atoms'
import { NoteHeader } from '../molecules'
import { NotesList } from '../organisms'
import { Note } from '../../types'

interface NotesListTemplateProps {
  notes: Record<string, Note>
  onBack: () => void
  onDeleteNote: (url: string) => void
  onExportNotes: () => void
}

export const NotesListTemplate: React.FC<NotesListTemplateProps> = ({
  notes,
  onBack,
  onDeleteNote,
  onExportNotes
}) => {
  const noteCount = Object.entries(notes).filter(([_, note]) => note.title || note.content).length

  return (
    <div className="w-80 h-96 bg-background">
      <Card className="h-full rounded-none border-none">
        <CardHeader>
          <NoteHeader
            title="All Notes"
            subtitle={`${noteCount} saved notes`}
            onBackClick={onBack}
          />
        </CardHeader>

        <NotesList
          notes={notes}
          onDeleteNote={onDeleteNote}
          onExportNotes={onExportNotes}
        />

      </Card>
    </div>
  )
} 