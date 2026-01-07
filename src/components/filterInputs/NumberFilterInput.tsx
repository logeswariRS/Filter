import React from 'react';
import { TextField } from '@mui/material';
import { NumberOperator } from '../../types';

interface NumberFilterInputProps {
  operator: NumberOperator;
  value: number | '';
  onChange: (value: number | '') => void;
}

/**
 * Number filter input component
 * Supports: Equals, Greater Than, Less Than, Greater Than or Equal, Less Than or Equal
 */
export const NumberFilterInput: React.FC<NumberFilterInputProps> = ({
  operator,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      onChange('');
      return;
    }
    const numValue = Number(inputValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  return (
    <TextField
      fullWidth
      size="small"
      type="number"
      placeholder="Enter number..."
      value={value === '' ? '' : value}
      onChange={handleChange}
      variant="outlined"
      inputProps={{ step: 'any' }}
    />
  );
};



