import React from 'react'
import { Badge } from '../atoms'

interface TagDisplayProps {
  tags: string[]
  variant?: 'outline' | 'secondary' | 'default' | 'destructive'
  className?: string
}

export const TagDisplay: React.FC<TagDisplayProps> = ({ 
  tags, 
  variant = 'secondary',
  className = '' 
}) => {
  if (tags.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {tags.map((tag, index) => (
        <Badge key={index} variant={variant} className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  )
} 