import React from 'react';
import { Select, MenuItem, FormControl, Checkbox, ListItemText, InputLabel } from '@mui/material';
import { MultiSelectOperator } from '../../types';

interface MultiSelectFilterInputProps {
  operator: MultiSelectOperator;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
}

/**
 * Multi-select filter input component
 * Supports: In, Not In
 */
export const MultiSelectFilterInput: React.FC<MultiSelectFilterInputProps> = ({
  operator,
  value,
  onChange,
  options,
}) => {
  const handleChange = (event: any) => {
    const newValue = event.target.value;
    // On autofill we get a stringified value.
    const valueArray = typeof newValue === 'string' ? newValue.split(',') : newValue;
    onChange(valueArray);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Select options...</InputLabel>
      <Select
        multiple
        value={value || []}
        onChange={handleChange}
        renderValue={(selected) => {
          if (selected.length === 0) return '';
          if (selected.length === 1) return selected[0];
          return `${selected.length} selected`;
        }}
        variant="outlined"
        sx={{
          borderRadius: 1,
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={(value || []).indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
