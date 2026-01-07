import { FieldDefinition } from './index';

/**
 * Field definitions for the employee data table
 * These define which fields can be filtered and how
 */
export const fieldDefinitions: FieldDefinition[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    path: 'name',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'text',
    path: 'email',
  },
  {
    id: 'department',
    label: 'Department',
    type: 'singleSelect',
    path: 'department',
    options: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Product', 'Design'],
  },
  {
    id: 'role',
    label: 'Role',
    type: 'text',
    path: 'role',
  },
  {
    id: 'salary',
    label: 'Salary',
    type: 'amount',
    path: 'salary',
    format: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    id: 'joinDate',
    label: 'Join Date',
    type: 'date',
    path: 'joinDate',
  },
  {
    id: 'isActive',
    label: 'Active Status',
    type: 'boolean',
    path: 'isActive',
  },
  {
    id: 'skills',
    label: 'Skills',
    type: 'multiSelect',
    path: 'skills',
    options: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'city',
    label: 'City',
    type: 'text',
    path: 'address.city',
  },
  {
    id: 'state',
    label: 'State',
    type: 'singleSelect',
    path: 'address.state',
    options: ['CA', 'NY', 'TX', 'FL', 'WA', 'IL', 'MA', 'CO', 'GA', 'NC'],
  },
  {
    id: 'projects',
    label: 'Projects',
    type: 'number',
    path: 'projects',
  },
  {
    id: 'lastReview',
    label: 'Last Review',
    type: 'date',
    path: 'lastReview',
  },
  {
    id: 'performanceRating',
    label: 'Performance Rating',
    type: 'number',
    path: 'performanceRating',
  },
];

/**
 * Get operators available for a given field type
 */
export function getOperatorsForFieldType(type: FieldDefinition['type']): string[] {
  switch (type) {
    case 'text':
      return ['equals', 'contains', 'startsWith', 'endsWith', 'doesNotContain'];
    case 'number':
      return ['equals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'];
    case 'date':
      return ['between'];
    case 'amount':
      return ['between'];
    case 'singleSelect':
      return ['is', 'isNot'];
    case 'multiSelect':
      return ['in', 'notIn'];
    case 'boolean':
      return ['is'];
    default:
      return [];
  }
}

/**
 * Get operator label for display
 */
export function getOperatorLabel(operator: string): string {
  const labels: Record<string, string> = {
    equals: 'Equals',
    contains: 'Contains',
    startsWith: 'Starts With',
    endsWith: 'Ends With',
    doesNotContain: 'Does Not Contain',
    greaterThan: 'Greater Than',
    lessThan: 'Less Than',
    greaterThanOrEqual: 'Greater Than or Equal',
    lessThanOrEqual: 'Less Than or Equal',
    between: 'Between',
    is: 'Is',
    isNot: 'Is Not',
    in: 'In',
    notIn: 'Not In',
  };
  return labels[operator] || operator;
}




