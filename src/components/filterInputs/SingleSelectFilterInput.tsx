import React from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';
import { SingleSelectOperator } from '../../types';

interface SingleSelectFilterInputProps {
  operator: SingleSelectOperator;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

/**
 * Single select filter input component
 * Supports: Is, Is Not
 */
export const SingleSelectFilterInput: React.FC<SingleSelectFilterInputProps> = ({
  operator: _operator,
  value,
  onChange,
  options,
}) => {
  return (
    <FormControl fullWidth size="small">
      <Select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        variant="outlined"
        sx={{
          borderRadius: 1,
        }}
      >
        <MenuItem value="">
          <em>Select option...</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
