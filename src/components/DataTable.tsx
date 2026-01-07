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
            <Chip 
              key={index} 
              label={item} 
              size="small" 
              sx={{
                backgroundColor: 'primary.light',
                color: 'white',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              }}
            />
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
      return (
        <Chip
          label={value ? 'Yes' : 'No'}
          size="small"
          color={value ? 'success' : 'default'}
          sx={{
            fontWeight: 600,
          }}
        />
      );
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
    <TableContainer 
      component={Paper} 
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Table sx={{ minWidth: 650 }} size="medium">
        <TableHead>
          <TableRow 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                  py: 2,
                }}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={sortField === column.path}
                    direction={sortField === column.path ? sortDirection : 'asc'}
                    onClick={() => handleSort(column.path as SortField)}
                    sx={{
                      color: 'white !important',
                      '&.MuiTableSortLabel-root': {
                        color: 'white',
                      },
                      '&.MuiTableSortLabel-root:hover': {
                        color: 'rgba(255, 255, 255, 0.8)',
                      },
                      '&.Mui-active': {
                        color: 'white',
                      },
                      '& .MuiTableSortLabel-icon': {
                        color: 'white !important',
                        opacity: 0.7,
                      },
                      '&.Mui-active .MuiTableSortLabel-icon': {
                        opacity: 1,
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
              <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No results found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters to see more results
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: rowIndex % 2 === 0 ? 'background.paper' : 'action.hover',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                    transform: 'scale(1.001)',
                  },
                  '& td': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell 
                    key={column.id}
                    sx={{
                      py: 1.5,
                      fontSize: '0.875rem',
                    }}
                  >
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
