import React from 'react';
import { FilterCondition, FieldDefinition } from '../../types';
import { TextFilterInput } from './TextFilterInput';
import { NumberFilterInput } from './NumberFilterInput';
import { DateFilterInput } from './DateFilterInput';
import { AmountFilterInput } from './AmountFilterInput';
import { SingleSelectFilterInput } from './SingleSelectFilterInput';
import { MultiSelectFilterInput } from './MultiSelectFilterInput';
import { BooleanFilterInput } from './BooleanFilterInput';

interface FilterInputProps {
  field: FieldDefinition;
  condition: FilterCondition;
  onChange: (value: any) => void;
}

/**
 * Dynamic filter input component that renders the appropriate input
 * based on the field type
 */
export const FilterInput: React.FC<FilterInputProps> = ({
  field,
  condition,
  onChange,
}) => {
  switch (field.type) {
    case 'text':
      return (
        <TextFilterInput
          operator={condition.operator as any}
          value={condition.value || ''}
          onChange={onChange}
        />
      );
    
    case 'number':
      return (
        <NumberFilterInput
          operator={condition.operator as any}
          value={condition.value || ''}
          onChange={onChange}
        />
      );
    
    case 'date':
      return (
        <DateFilterInput
          operator={condition.operator as any}
          value={condition.value || { from: '', to: '' }}
          onChange={onChange}
        />
      );
    
    case 'amount':
      return (
        <AmountFilterInput
          operator={condition.operator as any}
          value={condition.value || { min: '', max: '' }}
          onChange={onChange}
        />
      );
    
    case 'singleSelect':
      return (
        <SingleSelectFilterInput
          operator={condition.operator as any}
          value={condition.value || ''}
          onChange={onChange}
          options={field.options || []}
        />
      );
    
    case 'multiSelect':
      return (
        <MultiSelectFilterInput
          operator={condition.operator as any}
          value={condition.value || []}
          onChange={onChange}
          options={field.options || []}
        />
      );
    
    case 'boolean':
      return (
        <BooleanFilterInput
          operator={condition.operator as any}
          value={condition.value || false}
          onChange={onChange}
        />
      );
    
    default:
      return null;
  }
};
