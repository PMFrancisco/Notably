import React, { useState } from 'react'
import { Card, CardHeader, Button } from '../atoms'
import { SearchBar } from '../molecules'
import { NotesList } from '../organisms'
import { Note } from '../../types'
import { useSearch } from '../../hooks'

interface NotesListTemplateProps {
  notes: Record<string, Note>
  onBack: () => void
  onDeleteNote: (url: string) => void
  onToggleStar: (url: string) => void
  onOpenPage: (url: string) => void
  onExportNotes: () => void
  onImportNotes: (file: File) => Promise<void>
  isImporting: boolean
  isExporting: boolean
}

export const NotesListTemplate: React.FC<NotesListTemplateProps> = ({
  notes,
  onBack,
  onDeleteNote,
  onToggleStar,
  onOpenPage,
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
    <div className="w-80 flex-1 flex flex-col bg-background">
      <Card className="flex-1 rounded-none border-none flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Button
                variant="icon"
                size="icon"
                onClick={onBack}
                title="Back"
              >
                ←
              </Button>
              <div className="min-w-0">
                <h1 className="text-lg font-semibold leading-tight">All Notes</h1>
                <div className="text-xs text-muted-foreground truncate">
                  {subtitle}
                </div>
              </div>
            </div>
          </div>
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search notes..."
          />
        </CardHeader>

        <NotesList
          notes={filteredNotes}
          onDeleteNote={onDeleteNote}
          onToggleStar={onToggleStar}
          onOpenPage={onOpenPage}
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