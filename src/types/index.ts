export interface Note {
  title: string;
  content: string;
  url: string;
  timestamp: number;
  tags?: string[];
}

export interface NoteFormData {
  title: string;
  content: string;
  tags: string[];
} 