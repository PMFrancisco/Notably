import React, { useState } from 'react';
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
} from './ui';

interface Note {
  id: string;
  title: string;
  content: string;
  url: string;
  tags: string[];
  createdAt: Date;
}

interface NoteFormProps {
  note?: Note;
  onSave: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onDelete?: (id: string) => void;
  currentUrl: string;
}

export const NoteForm: React.FC<NoteFormProps> = ({ 
  note, 
  onSave, 
  onDelete, 
  currentUrl 
}) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(note?.tags.join(', ') || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    
    setIsLoading(true);
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        url: currentUrl,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!note?.id || !onDelete) return;
    
    setIsLoading(true);
    try {
      await onDelete(note.id);
    } finally {
      setIsLoading(false);
    }
  };

  const parsedTags = tags.split(',').map(tag => tag.trim()).filter(Boolean);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">
          {note ? 'Edit Note' : 'New Note'}
        </CardTitle>
        <div className="text-sm text-muted-foreground truncate">
          {currentUrl}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
            className="min-h-[120px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            placeholder="tag1, tag2, tag3..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            disabled={isLoading}
          />
          {parsedTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {parsedTags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <Separator />
      
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isLoading || !title.trim() || !content.trim()}
            size="sm"
          >
            {isLoading ? 'Saving...' : 'Save Note'}
          </Button>
        </div>
        
        {note && onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}; 