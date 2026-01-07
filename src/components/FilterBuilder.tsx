import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import { Plus, X, Filter } from 'lucide-react';
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
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Filter size={24} color="#1976d2" />
          <Typography variant="h6" component="h2" fontWeight={600}>
            Filters
          </Typography>
          {conditions.length > 0 && (
            <Typography
              variant="caption"
              sx={{
                ml: 1,
                px: 1,
                py: 0.5,
                backgroundColor: 'primary.light',
                color: 'white',
                borderRadius: 1,
                fontWeight: 600,
              }}
            >
              {conditions.length} active
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {conditions.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="medium"
              startIcon={<X size={18} />}
              onClick={handleClearAll}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Clear All
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<Plus size={18} />}
            onClick={handleAddFilter}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            Add Filter
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {conditions.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            px: 2,
            backgroundColor: 'action.hover',
            borderRadius: 2,
            border: '2px dashed',
            borderColor: 'divider',
          }}
        >
          <Filter size={48} color="#9e9e9e" style={{ marginBottom: 16, opacity: 0.5 }} />
          <Typography variant="body1" color="text.secondary" fontWeight={500}>
            No filters applied
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click "Add Filter" to start filtering your data
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {conditions.map((condition, index) => (
            <FilterRow
              key={condition.id}
              condition={condition}
              index={index}
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
