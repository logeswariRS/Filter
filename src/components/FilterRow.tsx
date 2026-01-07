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
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import { FilterCondition, FieldDefinition } from '../types';
import { fieldDefinitions, getOperatorsForFieldType, getOperatorLabel } from '../types/fieldDefinitions';
import { FilterInput } from './filterInputs';

interface FilterRowProps {
  condition: FilterCondition;
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
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Field</InputLabel>
            <Select
              value={condition.field || ''}
              onChange={handleFieldChange}
              label="Field"
              variant="outlined"
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
            >
              {availableOperators.map((operator) => (
                <MenuItem key={operator} value={operator}>
                  {getOperatorLabel(operator)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={5}>
          {selectedField && (
            <FilterInput
              field={selectedField}
              condition={condition}
              onChange={onValueChange}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={1}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton
              onClick={onRemove}
              color="error"
              size="small"
              aria-label="Remove filter"
            >
              <Trash2 size={18} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};



