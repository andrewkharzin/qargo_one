import {
    Type,
    AlignLeft,
    CheckSquare,
    Calendar,
    Tag,
    User,
    Hash,
    ToggleLeft,
    FileText
  } from "lucide-react";
  import { FieldTypeDefinition } from "../../../types/notes/templates";


  
  export const fieldTypes: FieldTypeDefinition[] = [
    { 
      id: 'text', 
      label: 'Text Input', 
      icon: Type, 
      description: 'Single line text input',
      supportsValidation: true
    },
    { 
      id: 'textarea', 
      label: 'Text Area', 
      icon: AlignLeft, 
      description: 'Multi-line text input',
      supportsValidation: true
    },
    { 
      id: 'select', 
      label: 'Select Dropdown', 
      icon: CheckSquare, 
      description: 'Dropdown selection',
      supportsOptions: true,
      defaultOptions: ['Option 1', 'Option 2']
    },
    { 
      id: 'checkbox', 
      label: 'Checkbox', 
      icon: CheckSquare, 
      description: 'True/false option' 
    },
    { 
      id: 'date', 
      label: 'Date Picker', 
      icon: Calendar, 
      description: 'Date selection' 
    },
    { 
      id: 'tags', 
      label: 'Tags Input', 
      icon: Tag, 
      description: 'Multi-tag input' 
    },
    { 
      id: 'user', 
      label: 'User Select', 
      icon: User, 
      description: 'User assignment' 
    },
    { 
      id: 'number', 
      label: 'Number', 
      icon: Hash, 
      description: 'Numeric input',
      supportsValidation: true
    },
    { 
      id: 'toggle', 
      label: 'Toggle Switch', 
      icon: ToggleLeft, 
      description: 'On/off switch' 
    },
    { 
      id: 'rich_text', 
      label: 'Rich Text',
      icon: FileText, 
      description: 'WYSIWYG editor' 
    }
  ];
  
  // Helper function to get field type by ID
  export const getFieldTypeById = (id: string) => {
    return fieldTypes.find(ft => ft.id === id);
  };