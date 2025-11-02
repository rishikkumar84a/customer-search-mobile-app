// Field types supported by the configuration system
export type FieldType = 'text' | 'date' | 'email' | 'phone' | 'select';

// Configuration for a single form field
export interface FieldConfig {
  type: FieldType;
  label: string;
  placeholder?: string;
  renderOrder: number;
  required?: boolean;
  validation?: (value: string) => string | null;
  options?: Array<{ label: string; value: string }>; // For select fields
}

// Configuration object for search form
export interface SearchConfig {
  fields: Record<string, FieldConfig>;
}

// Configuration for display sections in detail view
export interface DisplaySection {
  title: string;
  renderOrder: number;
  fields: Array<{
    key: string;
    label: string;
    format?: (value: any) => string;
  }>;
}

// Configuration for list item display
export interface ListItemConfig {
  primaryFields: string[];
  secondaryFields: string[];
  formatter?: (customer: any) => {
    title: string;
    subtitle: string;
    details: string[];
  };
}

// Complete display configuration
export interface DisplayConfig {
  listItem: ListItemConfig;
  detailSections: DisplaySection[];
}
