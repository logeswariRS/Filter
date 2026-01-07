import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { BooleanOperator } from '../../types';

interface BooleanFilterInputProps {
  operator: BooleanOperator;
  value: boolean;
  onChange: (value: boolean) => void;
}

/**
 * Boolean filter input component
 * Supports: Is
 */
export const BooleanFilterInput: React.FC<BooleanFilterInputProps> = ({
  operator,
  value,
  onChange,
}) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          color="primary"
        />
      }
      label={value ? 'Yes' : 'No'}
    />
  );
};
