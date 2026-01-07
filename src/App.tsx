import React, { useMemo, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Chip,
  Stack,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import { Filter, Database, TrendingUp } from 'lucide-react';
import { FilterBuilder } from './components/FilterBuilder';
import { DataTable } from './components/DataTable';
import { FilterCondition } from './types';
import { sampleEmployees } from './data/sampleData';
import { filterEmployees } from './utils/filtering';

// Enhanced theme with better colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

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
  const hasFilters = filterConditions.length > 0;
  const isFiltered = filteredRecords !== totalRecords;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <Filter size={32} />
              <Box>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  Dynamic Filter Component System
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
                  Build and apply multiple filters to explore employee data in real-time
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Filter Builder */}
          <FilterBuilder
            conditions={filterConditions}
            onConditionsChange={setFilterConditions}
          />

          {/* Statistics Section */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              background: 'linear-gradient(to right, #ffffff 0%, #f8f9fa 100%)',
            }}
          >
            <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
              <Stack direction="row" spacing={1} alignItems="center">
                <Database size={20} color="#1976d2" />
                <Typography variant="body2" color="text.secondary">
                  Total Records:
                </Typography>
                <Chip 
                  label={totalRecords} 
                  color="primary" 
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>
              
              <Divider orientation="vertical" flexItem />
              
              <Stack direction="row" spacing={1} alignItems="center">
                <TrendingUp size={20} color={isFiltered ? "#2e7d32" : "#757575"} />
                <Typography variant="body2" color="text.secondary">
                  Filtered Records:
                </Typography>
                <Chip 
                  label={filteredRecords} 
                  color={isFiltered ? "success" : "default"}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>

              {hasFilters && (
                <>
                  <Divider orientation="vertical" flexItem />
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Filter size={18} color="#9c27b0" />
                    <Typography variant="body2" color="text.secondary">
                      Active Filters:
                    </Typography>
                    <Chip 
                      label={filterConditions.length} 
                      color="secondary" 
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </Paper>

          {/* Data Table */}
          <DataTable data={filteredData} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
