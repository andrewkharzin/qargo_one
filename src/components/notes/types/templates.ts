export interface TemplateField {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    required: boolean;
    options?: string[];
    validation?: FieldValidation;
  }
  
  export interface FieldValidation {
    min?: number;
    max?: number;
    pattern?: string;
    errorMessage?: string;
  }
  
  export interface Template {
    id?: string;
    name: string;
    description: string;
    noteType: string;
    category: string;
    fields: TemplateField[];
    tags?: string[];
    version?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface FieldTypeDefinition {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    description: string;
    supportsOptions?: boolean;
    supportsValidation?: boolean;
    defaultOptions?: string[];
  }
  
  export interface PredefinedTemplate {
    name: string;
    description: string;
    noteType: string;
    category: string;
    fields: TemplateField[];
  }
  
  export interface TemplateNote {
    title: string;
    content: string;
    note_type: string;
    category_id: string | null;
    templates_data: Template;
    tags: string[];
  }