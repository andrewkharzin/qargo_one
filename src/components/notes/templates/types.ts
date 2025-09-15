// templates/types.ts
export interface BaseTemplateProps<T> {
  data: Partial<T>;
  onChange: (data: Partial<T>) => void;
  mode?: 'create' | 'edit' | 'view';
}

export type TemplateComponent<T> = React.ComponentType<BaseTemplateProps<T>>;
