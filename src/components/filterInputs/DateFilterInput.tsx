import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { DateOperator } from '../../types';

interface DateFilterInputProps {
  operator: DateOperator;
  value: { from: string; to: string };
  onChange: (value: { from: string; to: string }) => void;
}

/**
 * Date range filter input component
 * Supports: Between (date range)
 */
export const DateFilterInput: React.FC<DateFilterInputProps> = ({
  operator,
  value,
  onChange,
}) => {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      from: e.target.value,
    });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      to: e.target.value,
    });
  };

  return (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
      <TextField
        size="small"
        type="date"
        label="From"
        value={value.from || ''}
        onChange={handleFromChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        inputProps={{ max: value.to || undefined }}
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          },
        }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
        to
      </Typography>
      <TextField
        size="small"
        type="date"
        label="To"
        value={value.to || ''}
        onChange={handleToChange}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: value.from || undefined }}
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
          },
        }}
      />
    </Box>
  );
};
