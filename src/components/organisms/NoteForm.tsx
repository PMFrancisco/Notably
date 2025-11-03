import React from 'react'
import { Card, CardContent, CardFooter, Button } from '../atoms'
import { FormField, TagDisplay } from '../molecules'
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
    tags,
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
    <Card className="h-full rounded-none border-none">
      <CardContent className="space-y-4">
        <FormField
          id="title"
          label="Title"
          type="text"
          placeholder="Note title (optional)"
          value={title}
          onChange={setTitle}
          disabled={isSaving}
        />

        <FormField
          id="content"
          label="Content"
          type="textarea"
          placeholder="Write your note here..."
          value={content}
          onChange={setContent}
          disabled={isSaving}
          rows={4}
        />

        <FormField
          id="tags"
          label="Tags (comma separated)"
          type="text"
          placeholder="tag1, tag2, tag3..."
          value={tags}
          onChange={setTags}
          disabled={isSaving}
        />

        <TagDisplay tags={parsedTags} variant="secondary" />
      </CardContent>


      <CardFooter className="flex justify-between pt-3">
        <Button
          onClick={handleSave}
          disabled={isSaving || !isFormValid}
          size="sm"
          className="flex-1 mr-2"
          title="Save note (Ctrl+Enter)"
        >
          {isSaving ? 'Saving...' : saveButtonText}
        </Button>
        
        {showDeleteButton && onDelete && (
          <Button
            size="sm"
            onClick={handleDelete}
            disabled={isSaving}
            className="text-destructive hover:text-destructive"
            title="Delete note (Ctrl+Shift+Backspace)"
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 