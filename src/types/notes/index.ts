export interface Note {
  id: string;
  title?: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  category_id?: string;
  category?: string | Category;
  color?: string;
  tags?: string[];
  is_public?: boolean;
  type?: string;
  priority?: number;
  urgency?: number;
  is_archived?: boolean;
  word_count?: number;
  reactions?: Reaction[];

  // Новые поля из схемы БД
  author_id: string;
  subcategory?: string;
  embedding?: number[] | null; // vector field
  ai_confidence?: number | null;
  parent_id?: string | null;
  related_notes?: string[]; // uuid[]
  metadata?: Record<string, any> | null; // jsonb field
  expires_at?: string | null; // timestamp with time zone
  version?: number;
  previous_version_id?: string | null;
  businessId?: string | null; // "businessId" field

  // Опциональные связи
  author?: UserProfile;
  parent_note?: Note;
  previous_version?: Note;
  note_versions?: NoteVersion[];
  note_attachments?: NoteAttachment[];
  note_comments?: NoteComment[];
  note_followers?: NoteFollower[];
  note_links?: NoteLink[];
  note_notifications?: NoteNotification[];
  note_permissions?: NotePermission[];
  note_ratings?: NoteRating[];
  note_reactions?: Reaction[];
  note_shares?: NoteShare[];
  note_tasks?: NoteTask[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at?: string;
  owner_id?: string;
  applicable_types?: string[]; // note_type[]
  category_embedding?: number[] | null; // vector
  metadata?: Record<string, any> | null; // jsonb
}

export interface NoteTag {
  id: string;
  name: string;
  tag_embedding?: number[] | null;
  synonyms?: string[];
  category_id?: string;
  is_system_tag?: boolean;
  created_at?: string;
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
  shared_user?: UserProfile;
}

export interface UserProfile {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  email?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Reaction {
  id: string;
  note_id: string;
  user_id: string;
  reaction_type: string;
  created_at: string;
  user_profile?: UserProfile | null;
}

export interface NoteAttachment {
  id: string;
  note_id: string;
  file_url: string;
  file_type?: string | null;
  uploaded_by?: string | null;
  created_at?: string;
  uploaded_user?: UserProfile;
}

export interface NoteComment {
  id: string;
  note_id: string;
  author_id: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  author?: UserProfile;
}

export interface NoteFollower {
  id: string;
  note_id?: string | null;
  user_id?: string | null;
  created_at?: string;
  user?: UserProfile;
}

export interface NoteLink {
  id: string;
  source_note_id: string;
  target_note_id: string;
  link_type?: string | null;
  created_at?: string;
  source_note?: Note;
  target_note?: Note;
}

export interface NoteNotification {
  id: string;
  note_id?: string | null;
  user_id?: string | null;
  event_type: string;
  is_read?: boolean;
  created_at?: string;
  note?: Note;
  user?: UserProfile;
}

export interface NotePermission {
  id: string;
  note_id: string;
  user_id: string;
  role: string;
  created_at?: string;
  note?: Note;
  user?: UserProfile;
}

export interface NoteRating {
  id: string;
  note_id: string;
  reviewer_id: string;
  rating: number;
  comment?: string | null;
  created_at?: string;
  note?: Note;
  reviewer?: UserProfile;
}

export interface NoteTask {
  id: string;
  note_id: string;
  content: string;
  is_completed?: boolean;
  assignee?: string | null;
  due_date?: string | null; // date
  created_at?: string;
  task_type?: string; // note_type
  priority?: number | null;
  estimated_time?: string | null; // interval
  ai_generated?: boolean;
  assigned_user?: UserProfile;
}

export interface NoteVersion {
  id: string;
  note_id: string;
  author_id?: string | null;
  title?: string | null;
  content?: string | null;
  created_at?: string;
  author?: UserProfile;
}

// Extended interfaces
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

export interface NoteWithMetadata extends Note {
  metadata: {
    templateData?: Record<string, any>;
    templateType?: string;
    word_count?: number;
    generatedDocumentNumber?: string;
    [key: string]: any;
  };
}

// Типы для шаблонов
export interface WrhAptData {
  airlineIata: string;
  airlineName: string;
  warehouseName: string;
  warehouseCode: string;
  revision: number;
  effectiveDate: string;
  documentNumber?: string;
  sequenceNumber?: number;
  cargoType: 'general' | 'dangerous' | 'special' | 'perishable';
  handlingProcedure: string;
  requiredEquipment: string[];
  safetyPrecautions: string;
  contacts: {
    name: string;
    role: string;
    phone: string;
    email: string;
  }[];
  dutyStaff: {
    name: string;
    shift: string;
    responsibilities: string;
  }[];
  emergencyProcedures: string;
  documentationRequirements: string[];
  temperatureControl?: string;
  specialHandlingInstructions?: string;
}

// Вспомогательные типы
export interface DocumentNumberResult {
  fullNumber: string;
  shortNumber: string;
  parts: {
    prefix: string;
    iata: string;
    warehouse: string;
    sequence: number;
    revision: number;
    year: number;
  };
}

export interface TemplateField {
  field_name: string;
  field_type: string;
  options: string[];
  required: boolean;
}

// Тип для note_type enum (если используется в вашей БД)
export type NoteType =
  | 'note'
  | 'quick_note'
  | 'bookmark'
  | 'procedure'
  | 'wrh_apt'
  | 'checklist'
  | 'template'
  | 'sop'
  | 'workflow'
  | 'problem'
  | 'incident'
  | 'solution'
  | 'workaround'
  | 'risk'
  | 'client_request'
  | 'client_feedback'
  | 'complaint'
  | 'approval'
  | 'email'
  | 'message'
  | 'meeting_notes'
  | 'call_summary'
  | 'knowledge_base'
  | 'training'
  | 'best_practice'
  | 'lesson_learned'
  | 'reminder'
  | 'alert'
  | 'auto_generated'
  | 'system_log'
  | 'booking_notes'
  | 'flight_notes'
  | 'airline_notes'
  | 'airport_notes'
  | 'emergency'
  | 'legal'
  | 'compliance'
  | 'audit'
  | 'task';

  // Add this to your existing types
export interface Bookmark {
  id: string;
  note_id: string;
  created_by: string;
  created_date: string;
  note?: Note;
}
