import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { Employee } from '../types';
import { getNestedValue } from '../utils/filtering';
import { fieldDefinitions } from '../types/fieldDefinitions';

interface DataTableProps {
  data: Employee[];
}

type SortField = keyof Employee | 'address.city' | 'address.state' | 'address.country';
type SortDirection = 'asc' | 'desc';

/**
 * Data table component with sorting and real-time updates
 * Displays employee data in a sortable table format
 */
export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
      let aValue = getNestedValue(a, sortField as string);
      let bValue = getNestedValue(b, sortField as string);

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortField, sortDirection]);

  const formatCellValue = (value: any, fieldPath: string): string | React.ReactNode => {
    if (value == null) return '-';
    
    // Handle arrays (e.g., skills)
    if (Array.isArray(value)) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {value.map((item, index) => (
            <Chip key={index} label={item} size="small" />
          ))}
        </Box>
      );
    }
    
    // Handle objects (e.g., address)
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    // Handle dates
    if (fieldPath.includes('Date') || fieldPath.includes('Review')) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString();
        }
      } catch (e) {
        // Fall through to default formatting
      }
    }
    
    // Handle salary/amount fields
    if (fieldPath === 'salary') {
      return `$${Number(value).toLocaleString()}`;
    }
    
    // Handle boolean
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    return String(value);
  };

  // Define table columns
  const columns = [
    { id: 'name', label: 'Name', path: 'name', sortable: true },
    { id: 'email', label: 'Email', path: 'email', sortable: true },
    { id: 'department', label: 'Department', path: 'department', sortable: true },
    { id: 'role', label: 'Role', path: 'role', sortable: true },
    { id: 'salary', label: 'Salary', path: 'salary', sortable: true },
    { id: 'joinDate', label: 'Join Date', path: 'joinDate', sortable: true },
    { id: 'isActive', label: 'Active', path: 'isActive', sortable: true },
    { id: 'skills', label: 'Skills', path: 'skills', sortable: false },
    { id: 'city', label: 'City', path: 'address.city', sortable: true },
    { id: 'state', label: 'State', path: 'address.state', sortable: true },
    { id: 'projects', label: 'Projects', path: 'projects', sortable: true },
    { id: 'lastReview', label: 'Last Review', path: 'lastReview', sortable: true },
    { id: 'performanceRating', label: 'Rating', path: 'performanceRating', sortable: true },
  ];

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{
                  color: 'primary.contrastText',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                }}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={sortField === column.path}
                    direction={sortField === column.path ? sortDirection : 'asc'}
                    onClick={() => handleSort(column.path as SortField)}
                    sx={{
                      color: 'primary.contrastText',
                      '&.MuiTableSortLabel-root': {
                        color: 'primary.contrastText',
                      },
                      '&.MuiTableSortLabel-root:hover': {
                        color: 'primary.contrastText',
                      },
                      '&.Mui-active': {
                        color: 'primary.contrastText',
                      },
                      '& .MuiTableSortLabel-icon': {
                        color: 'primary.contrastText !important',
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No results found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'action.hover',
                  },
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {formatCellValue(getNestedValue(row, column.path), column.path)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



