import { useState, useEffect, useCallback } from 'react'
import { parseTags, formatTagsForInput } from '../utils'
import { NoteFormData } from '../types'

interface UseNoteFormProps {
  initialData?: Partial<NoteFormData>
  onSave?: (data: NoteFormData) => void
  onDelete?: () => void
}

export const useNoteForm = ({ 
  initialData, 
  onSave, 
  onDelete 
}: UseNoteFormProps = {}) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [tags, setTags] = useState(
    initialData?.tags ? formatTagsForInput(initialData.tags) : ''
  )

  // Sync with initialData when it changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setContent(initialData.content || '')
      setTags(initialData.tags ? formatTagsForInput(initialData.tags) : '')
    }
  }, [initialData])

  // Clear the form
  const clearForm = useCallback(() => {
    setTitle('')
    setContent('')
    setTags('')
  }, [])

  // Handle save
  const handleSave = useCallback(() => {
    const parsedTags = parseTags(tags)
    const formData = {
      title,
      content,
      tags: parsedTags
    }
    
    onSave?.(formData)
    return formData
  }, [title, content, tags, onSave])

  // Handle delete
  const handleDelete = useCallback(() => {
    onDelete?.()
    clearForm()
  }, [onDelete, clearForm])

  // Form validation
  const isFormValid = title.trim() || content.trim()

  // Parsed tags for display
  const parsedTags = parseTags(tags)

  return {
    // Form state
    title,
    content,
    tags,
    
    // Setters
    setTitle,
    setContent,
    setTags,
    
    // Actions
    handleSave,
    handleDelete,
    clearForm,
    
    // Computed data
    parsedTags,
    isFormValid,
    
    // Form data
    formData: {
      title,
      content,
      tags: parsedTags
    }
  }
} 