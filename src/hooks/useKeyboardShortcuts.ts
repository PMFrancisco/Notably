import { useEffect } from 'react'

interface KeyboardShortcutsConfig {
  onSave?: () => void
  onDelete?: () => void
  enabled?: boolean
}

/**
 * Custom hook to handle keyboard shortcuts within the popup
 * 
 * Available shortcuts:
 * - Ctrl/Cmd + Enter: Save current note
 * - Ctrl/Cmd + Shift + Backspace: Delete current note
 */
export const useKeyboardShortcuts = ({
  onSave,
  onDelete,
  enabled = true
}: KeyboardShortcutsConfig) => {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const ctrlOrCmd = isMac ? event.metaKey : event.ctrlKey

      // Ctrl/Cmd + Enter: Save
      if (ctrlOrCmd && event.key === 'Enter' && onSave) {
        event.preventDefault()
        onSave()
        return
      }

      // Ctrl/Cmd + Shift + Backspace: Delete
      if (ctrlOrCmd && event.shiftKey && event.key === 'Backspace' && onDelete) {
        event.preventDefault()
        onDelete()
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onSave, onDelete, enabled])
}

