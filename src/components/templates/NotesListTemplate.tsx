import React, { useState } from 'react'
import { Card, CardHeader } from '../atoms'
import { NoteHeader, SearchBar } from '../molecules'
import { NotesList } from '../organisms'
import { Note } from '../../types'
import { useSearch } from '../../hooks'

interface NotesListTemplateProps {
  notes: Record<string, Note>
  onBack: () => void
  onDeleteNote: (url: string) => void
  onExportNotes: () => void
  onImportNotes: (file: File) => Promise<void>
  isImporting: boolean
  isExporting: boolean
}

export const NotesListTemplate: React.FC<NotesListTemplateProps> = ({
  notes,
  onBack,
  onDeleteNote,
  onExportNotes,
  onImportNotes,
  isImporting,
  isExporting
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter notes based on search query
  const filteredNotes = useSearch(notes, searchQuery)
  
  // Count only notes with content
  const totalNotes = Object.entries(notes).filter(([, note]) => note.title || note.content).length
  const filteredCount = Object.entries(filteredNotes).filter(([, note]) => note.title || note.content).length
  
  // Determine subtitle based on search state
  const subtitle = searchQuery 
    ? `${filteredCount} result${filteredCount !== 1 ? 's' : ''} found`
    : `${totalNotes} saved note${totalNotes !== 1 ? 's' : ''}`

  return (
    <div className="w-80 h-96 bg-background">
      <Card className="h-full rounded-none border-none">
        <CardHeader>
          <NoteHeader
            title="All Notes"
            subtitle={subtitle}
            onBackClick={onBack}
          />
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search notes..."
            className="mt-3"
          />
        </CardHeader>

        <NotesList
          notes={filteredNotes}
          onDeleteNote={onDeleteNote}
          onExportNotes={onExportNotes}
          onImportNotes={onImportNotes}
          isFiltering={!!searchQuery}
          isImporting={isImporting}
          isExporting={isExporting}
        />
      </Card>
    </div>
  )
} 