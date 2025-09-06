export interface Note {
  id: string;
  title?: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  category_id?: string;
  category?: string; // Убедитесь, что это строка везде
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
