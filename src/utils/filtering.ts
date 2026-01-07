import { Employee, FilterCondition } from '../types';
import { fieldDefinitions } from '../types/fieldDefinitions';

/**
 * Get value from nested object using dot notation path
 * Example: getNestedValue(obj, 'address.city') returns obj.address.city
 */
export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

/**
 * Apply a single filter condition to an employee record
 */
function applyFilterCondition(employee: Employee, condition: FilterCondition): boolean {
  const fieldDef = fieldDefinitions.find(f => f.id === condition.field);
  if (!fieldDef) return true; // If field not found, include record
  
  const fieldValue = getNestedValue(employee, fieldDef.path);
  const operator = condition.operator;
  const filterValue = condition.value;
  
  switch (fieldDef.type) {
    case 'text':
      return applyTextFilter(fieldValue, operator, filterValue);
    
    case 'number':
      return applyNumberFilter(fieldValue, operator, filterValue);
    
    case 'date':
      return applyDateFilter(fieldValue, operator, filterValue);
    
    case 'amount':
      return applyAmountFilter(fieldValue, operator, filterValue);
    
    case 'singleSelect':
      return applySingleSelectFilter(fieldValue, operator, filterValue);
    
    case 'multiSelect':
      return applyMultiSelectFilter(fieldValue, operator, filterValue);
    
    case 'boolean':
      return applyBooleanFilter(fieldValue, operator, filterValue);
    
    default:
      return true;
  }
}

/**
 * Apply text filter operations
 */
function applyTextFilter(value: any, operator: string, filterValue: string): boolean {
  if (value == null) return false;
  
  const strValue = String(value).toLowerCase();
  const strFilter = String(filterValue).toLowerCase();
  
  switch (operator) {
    case 'equals':
      return strValue === strFilter;
    case 'contains':
      return strValue.includes(strFilter);
    case 'startsWith':
      return strValue.startsWith(strFilter);
    case 'endsWith':
      return strValue.endsWith(strFilter);
    case 'doesNotContain':
      return !strValue.includes(strFilter);
    default:
      return true;
  }
}

/**
 * Apply number filter operations
 */
function applyNumberFilter(value: any, operator: string, filterValue: number): boolean {
  if (value == null) return false;
  
  const numValue = Number(value);
  const numFilter = Number(filterValue);
  
  if (isNaN(numValue) || isNaN(numFilter)) return false;
  
  switch (operator) {
    case 'equals':
      return numValue === numFilter;
    case 'greaterThan':
      return numValue > numFilter;
    case 'lessThan':
      return numValue < numFilter;
    case 'greaterThanOrEqual':
      return numValue >= numFilter;
    case 'lessThanOrEqual':
      return numValue <= numFilter;
    default:
      return true;
  }
}

/**
 * Apply date filter operations
 */
function applyDateFilter(value: any, operator: string, filterValue: { from: string; to: string }): boolean {
  if (!value) return false;
  if (!filterValue || !filterValue.from || !filterValue.to) return false;
  
  const dateValue = new Date(value);
  if (isNaN(dateValue.getTime())) return false;
  
  switch (operator) {
    case 'between':
      const fromDate = new Date(filterValue.from);
      const toDate = new Date(filterValue.to);
      
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) return false;
      
      // Set time to end of day for 'to' date
      toDate.setHours(23, 59, 59, 999);
      return dateValue >= fromDate && dateValue <= toDate;
    default:
      return true;
  }
}

/**
 * Apply amount/currency filter operations
 */
function applyAmountFilter(value: any, operator: string, filterValue: { min: number | ''; max: number | '' }): boolean {
  if (value == null) return false;
  if (!filterValue || filterValue.min === '' || filterValue.max === '') return false;
  
  const numValue = Number(value);
  if (isNaN(numValue)) return false;
  
  const minValue = Number(filterValue.min);
  const maxValue = Number(filterValue.max);
  
  if (isNaN(minValue) || isNaN(maxValue)) return false;
  
  switch (operator) {
    case 'between':
      return numValue >= minValue && numValue <= maxValue;
    default:
      return true;
  }
}

/**
 * Apply single select filter operations
 */
function applySingleSelectFilter(value: any, operator: string, filterValue: string): boolean {
  if (value == null) return false;
  
  switch (operator) {
    case 'is':
      return String(value) === String(filterValue);
    case 'isNot':
      return String(value) !== String(filterValue);
    default:
      return true;
  }
}

/**
 * Apply multi-select filter operations
 */
function applyMultiSelectFilter(value: any, operator: string, filterValue: string[]): boolean {
  if (!Array.isArray(value) || value.length === 0) return false;
  if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
  
  switch (operator) {
    case 'in':
      // Check if any of the filter values are in the array
      return filterValue.some(fv => value.includes(fv));
    case 'notIn':
      // Check if none of the filter values are in the array
      return !filterValue.some(fv => value.includes(fv));
    default:
      return true;
  }
}

/**
 * Apply boolean filter operations
 */
function applyBooleanFilter(value: any, operator: string, filterValue: boolean): boolean {
  if (value == null) return false;
  
  switch (operator) {
    case 'is':
      return Boolean(value) === Boolean(filterValue);
    default:
      return true;
  }
}

/**
 * Filter employees based on multiple filter conditions
 * Uses AND logic between different fields, OR logic within same field (if multiple conditions)
 */
export function filterEmployees(
  employees: Employee[],
  conditions: FilterCondition[]
): Employee[] {
  if (conditions.length === 0) {
    return employees;
  }
  
  // Group conditions by field
  const conditionsByField = conditions.reduce((acc, condition) => {
    if (!acc[condition.field]) {
      acc[condition.field] = [];
    }
    acc[condition.field].push(condition);
    return acc;
  }, {} as Record<string, FilterCondition[]>);
  
  return employees.filter(employee => {
    // For each field, at least one condition must match (OR within same field)
    // All fields must have at least one matching condition (AND between fields)
    return Object.values(conditionsByField).every(fieldConditions => {
      return fieldConditions.some(condition => applyFilterCondition(employee, condition));
    });
  });
}

