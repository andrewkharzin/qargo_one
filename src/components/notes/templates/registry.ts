// templates/registry.ts
import { WrhAptData } from './procedures/types';
import { TodoData } from './todos/types';

export type TemplateType = 'wrh-apt' | 'todo';

export interface TemplateDefinition<T> {
  type: TemplateType;
  displayName: string;
  icon: string; // Use string instead of JSX element
  description: string;
  component: () => Promise<{ default: React.ComponentType<any> }>;
  defaultData: T;
  category: 'operations' | 'personal';
}

// Template registry
export const templateRegistry: Record<TemplateType, TemplateDefinition<any>> = {
  'wrh-apt': {
    type: 'wrh-apt',
    displayName: 'Warehouse Procedure',
    icon: 'Warehouse', // Just the icon name
    description: 'Create warehouse operating procedures and guidelines',
    component: () => import('./procedures/WrhApt').then(mod => mod),
    defaultData: {
      airlineIata: '',
      airlineName: '',
      warehouseName: '',
      warehouseCode: '',
      revision: 1,
      effectiveDate: '',
      cargoType: 'general',
      handlingProcedure: '',
      requiredEquipment: [],
      safetyPrecautions: '',
      contacts: [],
      dutyStaff: [],
      emergencyProcedures: '',
      documentationRequirements: [],
    },
    category: 'operations'
  },
  'todo': {
    type: 'todo',
    displayName: 'Task',
    icon: 'ListTodo', // Just the icon name
    description: 'Create a new task with deadlines and priorities',
    component: () => import('./todos/ToDo').then(mod => mod),
    defaultData: {
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      category: '',
      tags: [],
      reminders: [],
      subtasks: [],
      notes: '',
    },
    category: 'personal'
  }
};

// Helper functions
export const getTemplateDefinition = <T>(type: TemplateType): TemplateDefinition<T> => {
  return templateRegistry[type];
};

export const getDefaultData = <T>(type: TemplateType): T => {
  return { ...templateRegistry[type].defaultData };
};

export const getAllTemplateTypes = (): TemplateType[] => {
  return Object.keys(templateRegistry) as TemplateType[];
};
