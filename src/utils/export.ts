import { loadAllNotes } from './storage'

export const exportNotesToJson = async (): Promise<void> => {
  try {
    const allNotes = await loadAllNotes()
    const dataStr = JSON.stringify(allNotes, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `notably-export-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting notes:', error)
    throw error
  }
} 