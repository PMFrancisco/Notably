import React, { useState, KeyboardEvent } from 'react'
import { Input } from '../atoms'
import { Badge } from '../atoms'

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Add tag...',
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed])
    }
    setInputValue('')
    setIsAdding(false)
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (inputValue.trim()) {
        addTag(inputValue)
      }
    } else if (e.key === 'Escape') {
      setInputValue('')
      setIsAdding(false)
    }
  }

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue)
    } else {
      setIsAdding(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 min-h-[36px] max-h-[72px] overflow-y-auto p-2 border border-border rounded-md bg-white/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1 pl-2 pr-1 py-1 flex-shrink-0"
        >
          <span className="text-xs">#{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(tag)}
            disabled={disabled}
            className="text-xs hover:text-destructive disabled:opacity-50"
            title={`Remove ${tag}`}
          >
            ×
          </button>
        </Badge>
      ))}
      
      {isAdding ? (
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 min-w-[100px] border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-7 px-2 py-0"
          autoFocus
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          disabled={disabled}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 px-2 py-1 flex-shrink-0"
        >
          + Add tag
        </button>
      )}
    </div>
  )
}

