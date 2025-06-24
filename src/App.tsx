import { useState, useEffect } from 'react'
import browser from 'webextension-polyfill'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter,
  Button,
  Input,
  Textarea,
  Label,
  Badge,
  Separator
} from './components/ui'

interface Note {
  title: string;
  content: string;
  url: string;
  timestamp: number;
  tags?: string[];
}

function App() {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [tags, setTags] = useState('')
  const [currentUrl, setCurrentUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [savedNote, setSavedNote] = useState<Note | null>(null)
  const [showAllNotes, setShowAllNotes] = useState(false)
  const [allNotes, setAllNotes] = useState<{ [key: string]: Note }>({})

  // Get current tab URL and load existing note
  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true })
        if (tabs[0]?.url) {
          const url = tabs[0].url
          setCurrentUrl(url)
          
          // Load existing note for this URL
          const result = await browser.storage.sync.get(url)
          if (result[url]) {
            const existingNote = result[url] as Note
            setSavedNote(existingNote)
            setTitle(existingNote.title)
            setNote(existingNote.content)
            setTags(existingNote.tags?.join(', ') || '')
          }
        }
      } catch (error) {
        console.error('Error getting current tab:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getCurrentTab()
  }, [])

  // Load all notes when viewing the list
  const loadAllNotes = async () => {
    try {
      const result = await browser.storage.sync.get(null)
      setAllNotes(result as { [key: string]: Note })
    } catch (error) {
      console.error('Error loading all notes:', error)
    }
  }

  useEffect(() => {
    if (showAllNotes) {
      loadAllNotes()
    }
  }, [showAllNotes])

  const saveNote = async () => {
    if (!currentUrl || (!title.trim() && !note.trim())) return

    setIsSaving(true)
    
    const noteData: Note = {
      title: title.trim(),
      content: note.trim(),
      url: currentUrl,
      timestamp: Date.now(),
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
    }

    try {
      await browser.storage.sync.set({ [currentUrl]: noteData })
      setSavedNote(noteData)
    } catch (error) {
      console.error('Error saving note:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const deleteNote = async () => {
    if (!currentUrl) return

    try {
      await browser.storage.sync.remove(currentUrl)
      setSavedNote(null)
      setTitle('')
      setNote('')
      setTags('')
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  const deleteNoteById = async (url: string) => {
    try {
      await browser.storage.sync.remove(url)
      await loadAllNotes() // Refresh the list
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  const exportNotes = async () => {
    try {
      const result = await browser.storage.sync.get(null)
      const dataStr = JSON.stringify(result, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `notably-export-${new Date().toISOString().split('T')[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting notes:', error)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const parsedTags = tags.split(',').map(tag => tag.trim()).filter(Boolean)

  if (isLoading) {
    return (
      <div className="w-80 h-96 flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (showAllNotes) {
    const noteEntries = Object.entries(allNotes).filter(([_, note]) => note.title || note.content)
    
    return (
      <div className="w-80 h-96 bg-background">
        <Card className="h-full rounded-none border-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">All Notes</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllNotes(false)}
              >
                ← Back
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {noteEntries.length} saved notes
            </div>
          </CardHeader>

          <CardContent className="space-y-3 overflow-y-auto max-h-64">
            {noteEntries.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No notes saved yet
              </div>
            ) : (
              noteEntries.map(([url, note]) => (
                <Card key={url} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm truncate flex-1">
                        {note.title || 'Untitled'}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNoteById(url)}
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        ×
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground truncate flex-1">
                        {new URL(url).hostname}
                      </span>
                      <span className="text-muted-foreground">
                        {formatDate(note.timestamp)}
                      </span>
                    </div>
                    {note.tags && note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </CardContent>

          <Separator />
          
          <CardFooter className="pt-3">
            <Button 
              onClick={exportNotes} 
              variant="outline" 
              size="sm"
              fullWidth
            >
              Export All Notes
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-80 h-96 bg-background">
      <Card className="h-full rounded-none border-none">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Notably</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAllNotes(true)}
            >
              All Notes
            </Button>
          </div>
          <div className="text-xs text-muted-foreground truncate" title={currentUrl}>
            {currentUrl ? new URL(currentUrl).hostname : 'No URL'}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Note title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your note here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isSaving}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              placeholder="tag1, tag2, tag3..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={isSaving}
            />
            {parsedTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {parsedTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="flex justify-between pt-3">
          <Button
            onClick={saveNote}
            disabled={isSaving || (!title.trim() && !note.trim())}
            size="sm"
            className="flex-1 mr-2"
          >
            {isSaving ? 'Saving...' : savedNote ? 'Update Note' : 'Save Note'}
          </Button>
          
          {savedNote && (
            <Button
              variant="destructive"
              size="sm"
              onClick={deleteNote}
              disabled={isSaving}
            >
              Delete
            </Button>
          )}
        </CardFooter>

        {savedNote && (
          <div className="px-6 pb-4">
            <div className="text-xs text-green-600 flex items-center gap-1">
              <span>✓</span>
              <span>Note saved • {formatDate(savedNote.timestamp)}</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default App
