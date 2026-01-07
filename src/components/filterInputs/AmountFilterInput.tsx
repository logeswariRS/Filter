import React from 'react';
import { TextField, Box } from '@mui/material';
import { AmountOperator } from '../../types';

interface AmountFilterInputProps {
  operator: AmountOperator;
  value: { min: number | ''; max: number | '' };
  onChange: (value: { min: number | ''; max: number | '' }) => void;
}

/**
 * Amount/Currency range filter input component
 * Supports: Between (amount range)
 */
export const AmountFilterInput: React.FC<AmountFilterInputProps> = ({
  operator,
  value,
  onChange,
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numValue = inputValue === '' ? '' : Number(inputValue);
    if (inputValue === '' || (!isNaN(numValue as number) && numValue !== '')) {
      onChange({
        ...value,
        min: numValue as number | '',
      });
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numValue = inputValue === '' ? '' : Number(inputValue);
    if (inputValue === '' || (!isNaN(numValue as number) && numValue !== '')) {
      onChange({
        ...value,
        max: numValue as number | '',
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <TextField
        size="small"
        type="number"
        label="Min"
        placeholder="Min amount"
        value={value.min === '' ? '' : value.min}
        onChange={handleMinChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 'any', min: 0 }}
      />
      <TextField
        size="small"
        type="number"
        label="Max"
        placeholder="Max amount"
        value={value.max === '' ? '' : value.max}
        onChange={handleMaxChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 'any', min: value.min || 0 }}
      />
    </Box>
  );
};



