import React, { useMemo, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { FilterBuilder } from './components/FilterBuilder';
import { DataTable } from './components/DataTable';
import { FilterCondition } from './types';
import { sampleEmployees } from './data/sampleData';
import { filterEmployees } from './utils/filtering';

/**
 * Main application component
 * Integrates filter builder with data table for real-time filtering
 */
function App() {
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([]);

  // Apply filters to the data
  const filteredData = useMemo(() => {
    return filterEmployees(sampleEmployees, filterConditions);
  }, [filterConditions]);

  const totalRecords = sampleEmployees.length;
  const filteredRecords = filteredData.length;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Dynamic Filter Component System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Build and apply multiple filters to explore employee data in real-time
        </Typography>
      </Box>

      <FilterBuilder
        conditions={filterConditions}
        onConditionsChange={setFilterConditions}
      />

      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Total Records: <strong>{totalRecords}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Filtered Records: <strong>{filteredRecords}</strong>
          </Typography>
          {filterConditions.length > 0 && (
            <Typography variant="body2" color="text.secondary">
              Active Filters: <strong>{filterConditions.length}</strong>
            </Typography>
          )}
        </Box>
      </Paper>

      <DataTable data={filteredData} />
    </Container>
  );
}

export default App;



