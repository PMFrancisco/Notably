import React from 'react'
import { CardContent, CardFooter, Button, Input, Textarea } from '../atoms'
import { TagInput } from '../molecules'
import { useNoteForm, useKeyboardShortcuts } from '../../hooks'
import { NoteFormData } from '../../types'

interface NoteFormProps {
  initialData?: Partial<NoteFormData>
  onSave: (data: NoteFormData) => void
  onDelete?: () => void
  isSaving?: boolean
  saveButtonText?: string
  showDeleteButton?: boolean
}

export const NoteForm: React.FC<NoteFormProps> = ({
  initialData,
  onSave,
  onDelete,
  isSaving = false,
  saveButtonText = 'Save Note',
  showDeleteButton = false
}) => {
  const {
    title,
    content,
    setTitle,
    setContent,
    setTags,
    handleSave,
    handleDelete,
    parsedTags,
    isFormValid
  } = useNoteForm({
    initialData,
    onSave,
    onDelete
  })

  // Add keyboard shortcuts
  useKeyboardShortcuts({
    onSave: isFormValid && !isSaving ? handleSave : undefined,
    onDelete: showDeleteButton && onDelete && !isSaving ? handleDelete : undefined,
    enabled: true
  })

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <CardContent className="flex-1 flex flex-col space-y-3 pb-0 overflow-y-auto">
        <Input
          id="title"
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSaving}
          className="h-9"
        />

        <Textarea
          id="content"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSaving}
          className="flex-1 min-h-[120px] resize-none"
        />

        <TagInput
          tags={parsedTags}
          onTagsChange={(newTags) => setTags(newTags.join(', '))}
          disabled={isSaving}
        />
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 pb-3 flex-shrink-0">
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          disabled={isSaving || !isFormValid}
          fullWidth
          title="Save note (Ctrl+Enter)"
        >
          {isSaving ? '💾 Saving...' : `💾 ${saveButtonText}`}
        </Button>
        
        {showDeleteButton && onDelete && (
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
            disabled={isSaving}
            title="Delete note (Ctrl+Shift+Backspace)"
          >
            🗑️
          </Button>
        )}
      </CardFooter>
    </div>
  )
} 