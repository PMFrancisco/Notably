import { useState, useEffect } from 'react'
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
import { 
  Note,
  formatDate,
  parseTags,
  formatTagsForInput,
  getHostnameFromUrl,
  exportNotesToJson
} from './utils'
import { useNotes, useCurrentTab } from './hooks'

function App() {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [tags, setTags] = useState('')
  const [showAllNotes, setShowAllNotes] = useState(false)

  const { currentUrl, isLoading } = useCurrentTab()
  const { 
    savedNote, 
    allNotes, 
    isSaving, 
    saveNote, 
    loadNoteForUrl, 
    loadAllNotesData, 
    deleteNote,
    clearCurrentNote
  } = useNotes()

  // Load existing note when URL is available
  useEffect(() => {
    const loadExistingNote = async () => {
      if (!currentUrl) return
      
      try {
        const existingNote = await loadNoteForUrl(currentUrl)
        if (existingNote) {
          setTitle(existingNote.title)
          setNote(existingNote.content)
          setTags(formatTagsForInput(existingNote.tags || []))
        }
      } catch (error) {
        console.error('Error loading existing note:', error)
      }
    }

    loadExistingNote()
  }, [currentUrl, loadNoteForUrl])

  // Load all notes when viewing the list
  useEffect(() => {
    if (showAllNotes) {
      loadAllNotesData()
    }
  }, [showAllNotes, loadAllNotesData])

  const handleSaveNote = async () => {
    if (!currentUrl) return
    
    const parsedTags = parseTags(tags)
    await saveNote(currentUrl, title, note, parsedTags)
  }

  const handleDeleteNote = async () => {
    if (!currentUrl) return

    await deleteNote(currentUrl)
    setTitle('')
    setNote('')
    setTags('')
  }

  const handleDeleteNoteById = async (url: string) => {
    await deleteNote(url)
    await loadAllNotesData() // Refresh the list
  }

  const handleExportNotes = async () => {
    try {
      await exportNotesToJson()
    } catch (error) {
      console.error('Error exporting notes:', error)
    }
  }

  const parsedTags = parseTags(tags)

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
                        onClick={() => handleDeleteNoteById(url)}
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
                        {getHostnameFromUrl(url)}
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
              onClick={handleExportNotes} 
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
            {currentUrl ? getHostnameFromUrl(currentUrl) : 'No URL'}
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
            onClick={handleSaveNote}
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
              onClick={handleDeleteNote}
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
