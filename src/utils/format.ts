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

export const getDomainFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return 'Unknown'
  }
}

export const groupNotesByDomain = (notes: Record<string, { url: string; [key: string]: unknown }>) => {
  const grouped: Record<string, Array<{ url: string; [key: string]: unknown }>> = {}
  
  Object.entries(notes).forEach(([url, note]) => {
    const domain = getDomainFromUrl(url)
    if (!grouped[domain]) {
      grouped[domain] = []
    }
    grouped[domain].push({ ...note, url })
  })
  
  // Sort domains alphabetically
  return Object.entries(grouped)
    .sort(([domainA], [domainB]) => domainA.localeCompare(domainB))
} 