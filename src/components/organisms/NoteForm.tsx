import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, Button, Separator } from '../atoms'
import { FormField, TagDisplay } from '../molecules'
import { parseTags, formatTagsForInput } from '../../utils'

interface NoteFormData {
  title: string
  content: string
  tags: string[]
}

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
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [tags, setTags] = useState(
    initialData?.tags ? formatTagsForInput(initialData.tags) : ''
  )

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setContent(initialData.content || '')
      setTags(initialData.tags ? formatTagsForInput(initialData.tags) : '')
    }
  }, [initialData])

  const handleSave = () => {
    const parsedTags = parseTags(tags)
    onSave({
      title,
      content,
      tags: parsedTags
    })
  }

  const parsedTags = parseTags(tags)
  const isFormValid = title.trim() || content.trim()

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
        >
          {isSaving ? 'Saving...' : saveButtonText}
        </Button>
        
        {showDeleteButton && onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            disabled={isSaving}
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 