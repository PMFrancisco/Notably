import React, { useRef } from 'react'
import { CardContent, Button } from '../atoms'
import { NoteCard } from './NoteCard'
import { EmptyState } from '../atoms'
import { DomainGroup } from '../molecules'
import { Note } from '../../types'
import { groupNotesByDomain } from '../../utils'

interface NotesListProps {
  notes: Record<string, Note>
  onDeleteNote: (url: string) => void
  onExportNotes: () => void
  onImportNotes: (file: File) => Promise<void>
  isFiltering?: boolean
  isImporting: boolean
  isExporting: boolean
  className?: string
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  onDeleteNote,
  onExportNotes,
  onImportNotes,
  isFiltering = false,
  isImporting,
  isExporting,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const noteEntries = Object.entries(notes).filter(([, note]) => note.title || note.content)
  
  // Group notes by domain
  const groupedNotes = groupNotesByDomain(notes)
  
  // Determine empty state message
  const emptyMessage = isFiltering 
    ? "No notes match your search" 
    : "No notes saved yet"

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    await onImportNotes(file)
    
    // Reset file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <CardContent className={`h-72 overflow-y-auto ${className}`}>
        {noteEntries.length === 0 ? (
          <div className="py-3">
            <EmptyState message={emptyMessage} />
          </div>
        ) : isFiltering ? (
          // When searching, show flat list
          <div className="space-y-3 p-3">
            {noteEntries.map(([url, note]) => (
              <NoteCard
                key={url}
                note={{ ...note, url }}
                onDelete={onDeleteNote}
              />
            ))}
          </div>
        ) : (
          // When not searching, show grouped by domain
          <div className="space-y-0">
            {groupedNotes.map(([domain, domainNotes]) => (
              <DomainGroup
                key={domain}
                domain={domain}
                notes={domainNotes as Note[]}
                onDeleteNote={onDeleteNote}
              />
            ))}
          </div>
        )}
      </CardContent>
      
      <div className="px-6 pb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex gap-2">
          <Button 
            onClick={handleImportClick}
            size="sm"
            className="flex-1"
            disabled={isImporting || isExporting}
          >
            {isImporting ? 'Importing...' : 'Import'}
          </Button>
          <Button 
            onClick={onExportNotes} 
            size="sm"
            className="flex-1"
            disabled={isImporting || isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>
      </div>
    </>
  )
} 