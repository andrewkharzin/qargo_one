export interface Note {
  id: string;
  title?: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  category_id?: string;
  category?: string | Category; // ✅ can be string OR Category
  color?: string;
  tags?: string[];
  is_public?: boolean;
  type?: string;
  priority?: number;
  urgency?: number;
  is_archived?: boolean;
  word_count?: number;
  reactions?: Reaction[];
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

export interface UserProfile {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
}
export interface Reaction {
  id: string;
  note_id: string;
  user_id: string;
  reaction_type: string;
  created_at: string;
  user_profile?: UserProfile | null;
}
