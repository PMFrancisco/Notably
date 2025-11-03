export interface Note {
  title: string;
  content: string;
  url: string;
  timestamp: number;
  tags?: string[];
  starred?: boolean;
}

export interface TrashedNote {
  note: Note;
  deletedAt: number;
  originalUrl: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  tags: string[];
} 