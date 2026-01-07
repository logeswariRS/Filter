/**
 * Field types supported by the filter system
 */
export type FieldType = 
  | 'text' 
  | 'number' 
  | 'date' 
  | 'amount' 
  | 'singleSelect' 
  | 'multiSelect' 
  | 'boolean';

/**
 * Operators available for each field type
 */
export type TextOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'doesNotContain';
export type NumberOperator = 'equals' | 'greaterThan' | 'lessThan' | 'greaterThanOrEqual' | 'lessThanOrEqual';
export type DateOperator = 'between';
export type AmountOperator = 'between';
export type SingleSelectOperator = 'is' | 'isNot';
export type MultiSelectOperator = 'in' | 'notIn';
export type BooleanOperator = 'is';

export type Operator = 
  | TextOperator 
  | NumberOperator 
  | DateOperator 
  | AmountOperator 
  | SingleSelectOperator 
  | MultiSelectOperator 
  | BooleanOperator;

/**
 * Field definition for the filter system
 */
export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  path: string; // Dot notation path for nested fields (e.g., "address.city")
  options?: string[]; // For singleSelect and multiSelect fields
  format?: (value: any) => string; // Optional formatter for display
}

/**
 * Filter condition structure
 */
export interface FilterCondition {
  id: string;
  field: string; // Field ID
  operator: Operator;
  value: any; // Value(s) depending on operator type
}

/**
 * Sample data structure - Employee record
 */
export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string; // ISO date string
  isActive: boolean;
  skills: string[];
  address: {
    city: string;
    state: string;
    country: string;
  };
  projects: number;
  lastReview: string; // ISO date string
  performanceRating: number;
}

/**
 * Filter state management
 */
export interface FilterState {
  conditions: FilterCondition[];
}

/**
 * Table column definition
 */
export interface TableColumn {
  id: string;
  label: string;
  path: string;
  sortable?: boolean;
  format?: (value: any) => string | React.ReactNode;
}




