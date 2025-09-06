export interface Note {
  id: string;
  title?: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  category_id?: string;
  category?: string | Category; // Fix: Allow both types
  color?: string;
  tags?: string[];
  is_public?: boolean;
  type?: string;
  priority?: number;
  urgency?: number;
  is_archived?: boolean;
  word_count?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface NoteTag {
  id: string;
  name: string;
  tag_embedding?: number[] | null; // Assuming vector is represented as number array
  synonyms?: string[];
  category_id?: string;
  is_system_tag?: boolean;
}

export interface NoteTagMap {
  note_id: string;
  tag_id: string;
}

export interface NoteShare {
  id: string;
  note_id?: string;
  shared_with?: string;
  can_edit?: boolean;
  created_at?: string;
}

// Optional: Extended interfaces with relationships
export interface NoteTagWithCategory extends NoteTag {
  category?: Category;
}

export interface NoteWithTags extends Note {
  note_tags?: NoteTag[];
  tag_maps?: NoteTagMap[];
}

export interface NoteWithShares extends Note {
  shares?: NoteShare[];
}
