import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import { Plus, X } from 'lucide-react';
import { FilterCondition } from '../types';
import { fieldDefinitions, getOperatorsForFieldType } from '../types/fieldDefinitions';
import { FilterRow } from './FilterRow';

interface FilterBuilderProps {
  conditions: FilterCondition[];
  onConditionsChange: (conditions: FilterCondition[]) => void;
}

/**
 * Main filter builder component
 * Manages multiple filter conditions and provides add/remove/clear functionality
 */
export const FilterBuilder: React.FC<FilterBuilderProps> = ({
  conditions,
  onConditionsChange,
}) => {
  const handleAddFilter = () => {
    const firstField = fieldDefinitions[0];
    const firstOperator = getOperatorsForFieldType(firstField.type)[0];
    
    const newCondition: FilterCondition = {
      id: `filter-${Date.now()}-${Math.random()}`,
      field: firstField.id,
      operator: firstOperator,
      value: getDefaultValueForFieldType(firstField.type),
    };
    
    onConditionsChange([...conditions, newCondition]);
  };

  const handleRemoveFilter = (id: string) => {
    onConditionsChange(conditions.filter(c => c.id !== id));
  };

  const handleFieldChange = (id: string, fieldId: string) => {
    const newConditions = conditions.map(condition => {
      if (condition.id === id) {
        const newField = fieldDefinitions.find(f => f.id === fieldId);
        if (newField) {
          const operators = getOperatorsForFieldType(newField.type);
          return {
            ...condition,
            field: fieldId,
            operator: operators[0],
            value: getDefaultValueForFieldType(newField.type),
          };
        }
      }
      return condition;
    });
    onConditionsChange(newConditions);
  };

  const handleOperatorChange = (id: string, operator: string) => {
    const newConditions = conditions.map(condition => {
      if (condition.id === id) {
        return { ...condition, operator };
      }
      return condition;
    });
    onConditionsChange(newConditions);
  };

  const handleValueChange = (id: string, value: any) => {
    const newConditions = conditions.map(condition => {
      if (condition.id === id) {
        return { ...condition, value };
      }
      return condition;
    });
    onConditionsChange(newConditions);
  };

  const handleClearAll = () => {
    onConditionsChange([]);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Filters
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {conditions.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<X size={16} />}
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Plus size={16} />}
            onClick={handleAddFilter}
          >
            Add Filter
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {conditions.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">
            No filters applied. Click "Add Filter" to start filtering your data.
          </Typography>
        </Box>
      ) : (
        <Box>
          {conditions.map((condition) => (
            <FilterRow
              key={condition.id}
              condition={condition}
              onFieldChange={(fieldId) => handleFieldChange(condition.id, fieldId)}
              onOperatorChange={(operator) => handleOperatorChange(condition.id, operator)}
              onValueChange={(value) => handleValueChange(condition.id, value)}
              onRemove={() => handleRemoveFilter(condition.id)}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

/**
 * Get default value for a field type
 */
function getDefaultValueForFieldType(type: string): any {
  switch (type) {
    case 'date':
      return { from: '', to: '' };
    case 'amount':
      return { min: '', max: '' };
    case 'multiSelect':
      return [];
    case 'boolean':
      return false;
    default:
      return '';
  }
}



