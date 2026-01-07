import React from 'react';
import { TextField } from '@mui/material';
import { TextOperator } from '../../types';

interface TextFilterInputProps {
  operator: TextOperator;
  value: string;
  onChange: (value: string) => void;
}

/**
 * Text filter input component
 * Supports: Equals, Contains, Starts With, Ends With, Does Not Contain
 */
export const TextFilterInput: React.FC<TextFilterInputProps> = ({
  operator: _operator,
  value,
  onChange,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Enter text..."
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 1,
        },
      }}
    />
  );
};
