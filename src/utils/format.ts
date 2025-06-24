export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const parseTags = (tagsString: string): string[] => {
  return tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
}

export const formatTagsForInput = (tags: string[]): string => {
  return tags.join(', ')
} 