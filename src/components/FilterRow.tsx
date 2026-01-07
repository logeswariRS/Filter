import React from 'react';
import {
  Box,
  Select,
  MenuItem,
  IconButton,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import { FilterCondition } from '../types';
import { fieldDefinitions, getOperatorsForFieldType, getOperatorLabel } from '../types/fieldDefinitions';
import { FilterInput } from './filterInputs';

interface FilterRowProps {
  condition: FilterCondition;
  index: number;
  onFieldChange: (fieldId: string) => void;
  onOperatorChange: (operator: string) => void;
  onValueChange: (value: any) => void;
  onRemove: () => void;
}

/**
 * Individual filter row component
 * Allows selecting field, operator, and inputting filter value
 */
export const FilterRow: React.FC<FilterRowProps> = ({
  condition,
  index,
  onFieldChange,
  onOperatorChange,
  onValueChange,
  onRemove,
}) => {
  const selectedField = fieldDefinitions.find(f => f.id === condition.field);
  const availableOperators = selectedField
    ? getOperatorsForFieldType(selectedField.type)
    : [];

  const handleFieldChange = (e: any) => {
    const newFieldId = e.target.value;
    const newField = fieldDefinitions.find(f => f.id === newFieldId);
    
    if (newField) {
      onFieldChange(newFieldId);
      // Reset operator to first available operator for the new field
      const operators = getOperatorsForFieldType(newField.type);
      if (operators.length > 0) {
        onOperatorChange(operators[0]);
      }
      // Reset value based on field type
      if (newField.type === 'date') {
        onValueChange({ from: '', to: '' });
      } else if (newField.type === 'amount') {
        onValueChange({ min: '', max: '' });
      } else if (newField.type === 'multiSelect') {
        onValueChange([]);
      } else if (newField.type === 'boolean') {
        onValueChange(false);
      } else {
        onValueChange('');
      }
    }
  };

  const handleOperatorChange = (e: any) => {
    onOperatorChange(e.target.value);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease',
        position: 'relative',
        '&:hover': {
          boxShadow: 4,
          borderColor: 'primary.light',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Chip
          label={`Filter ${index + 1}`}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 600, mr: 1 }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          onClick={onRemove}
          color="error"
          size="small"
          aria-label="Remove filter"
          sx={{
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'white',
            },
          }}
        >
          <Trash2 size={18} />
        </IconButton>
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Field</InputLabel>
            <Select
              value={condition.field || ''}
              onChange={handleFieldChange}
              label="Field"
              variant="outlined"
              sx={{
                borderRadius: 1,
              }}
            >
              {fieldDefinitions.map((field) => (
                <MenuItem key={field.id} value={field.id}>
                  {field.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small" disabled={!selectedField}>
            <InputLabel>Operator</InputLabel>
            <Select
              value={condition.operator || ''}
              onChange={handleOperatorChange}
              label="Operator"
              variant="outlined"
              sx={{
                borderRadius: 1,
              }}
            >
              {availableOperators.map((operator) => (
                <MenuItem key={operator} value={operator}>
                  {getOperatorLabel(operator)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          {selectedField && (
            <FilterInput
              field={selectedField}
              condition={condition}
              onChange={onValueChange}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
