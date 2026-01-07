# Dynamic Filter Component System

A comprehensive, type-safe dynamic filter component system built with React 18, TypeScript, and Material UI. This application demonstrates advanced component architecture, state management, and client-side data filtering capabilities.

## 🎯 Features

### Core Functionality
- **Dynamic Filter Builder**: Add, remove, and manage multiple filter conditions
- **Multi-Type Filter Support**: Handles 7 different data types with appropriate operators
- **Real-Time Filtering**: Instant table updates as filters are applied
- **Sortable Data Table**: Click column headers to sort data
- **Type-Safe Architecture**: Full TypeScript implementation with strict typing

### Supported Field Types

1. **Text Fields**
   - Operators: Equals, Contains, Starts With, Ends With, Does Not Contain
   - Case-insensitive matching

2. **Number Fields**
   - Operators: Equals, Greater Than, Less Than, Greater Than or Equal, Less Than or Equal
   - Input validation for numeric values

3. **Date Fields**
   - Operators: Between (date range)
   - Date range picker with calendar interface

4. **Amount/Currency Fields**
   - Operators: Between (amount range)
   - Min/max amount inputs with proper formatting

5. **Single Select Fields**
   - Operators: Is, Is Not
   - Dropdown with predefined options

6. **Multi-Select Fields**
   - Operators: In, Not In
   - Multi-select dropdown with checkboxes

7. **Boolean Fields**
   - Operators: Is
   - Toggle switch for true/false selection

### Advanced Features
- **Nested Object Filtering**: Filter by nested properties using dot notation (e.g., `address.city`)
- **Array Filtering**: Filter records based on array field contents (e.g., skills)
- **Filter Persistence**: Filter state is maintained during component lifecycle
- **Performance Optimized**: Efficient filtering algorithms for 50+ records
- **Professional UI**: Clean, modern interface using Material UI components

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material UI (MUI)** - Component library
- **Lucide React** - Icons

## 📦 Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── filterInputs/          # Field-specific input components
│   │   ├── TextFilterInput.tsx
│   │   ├── NumberFilterInput.tsx
│   │   ├── DateFilterInput.tsx
│   │   ├── AmountFilterInput.tsx
│   │   ├── SingleSelectFilterInput.tsx
│   │   ├── MultiSelectFilterInput.tsx
│   │   ├── BooleanFilterInput.tsx
│   │   └── index.tsx          # Dynamic input selector
│   ├── FilterBuilder.tsx       # Main filter builder component
│   ├── FilterRow.tsx           # Individual filter condition row
│   └── DataTable.tsx           # Sortable data table component
├── data/
│   ├── generateSampleData.ts   # Sample data generator
│   └── sampleData.ts           # Generated employee dataset
├── types/
│   ├── index.ts                # Core TypeScript types
│   └── fieldDefinitions.ts     # Field definitions and operators
├── utils/
│   └── filtering.ts            # Filtering algorithms
├── App.tsx                      # Main application component
├── main.tsx                     # Application entry point
└── index.css                    # Global styles
```

## 🎨 Component Architecture

### FilterBuilder
The main container component that manages filter conditions state and provides add/remove/clear functionality.

**Props:**
- `conditions: FilterCondition[]` - Array of active filter conditions
- `onConditionsChange: (conditions: FilterCondition[]) => void` - Callback when conditions change

### FilterRow
Individual filter condition row that allows users to:
- Select a field to filter on
- Choose an operator based on field type
- Input filter value using appropriate input component

**Props:**
- `condition: FilterCondition` - The filter condition to display/edit
- `onFieldChange`, `onOperatorChange`, `onValueChange` - Callbacks for updates
- `onRemove: () => void` - Callback to remove this filter

### FilterInput
Dynamic input component that renders the appropriate input based on field type:
- Automatically selects correct input component
- Handles value formatting and validation
- Provides type-safe value handling

### DataTable
Displays filtered data in a sortable table:
- Click column headers to sort
- Handles nested object display
- Formats arrays, dates, and currency values
- Shows "No results" when filters return empty dataset

## 🔍 Filtering Logic

The filtering system uses a sophisticated algorithm that:

1. **Groups conditions by field**: Conditions for the same field are grouped together
2. **Applies OR logic within fields**: If multiple conditions exist for the same field, at least one must match
3. **Applies AND logic between fields**: All field groups must have at least one matching condition
4. **Handles nested objects**: Uses dot notation to access nested properties
5. **Processes arrays**: Supports IN/NOT IN operations for array fields
6. **Validates data types**: Ensures proper type conversion and validation

### Example Filter Scenarios

**Scenario 1: Single Filter**
- Filter: Department = "Engineering"
- Result: All employees in Engineering department

**Scenario 2: Multiple Filters (AND)**
- Filter 1: Department = "Engineering"
- Filter 2: Salary Between $80,000 - $100,000
- Result: Engineering employees with salary in range (both conditions must match)

**Scenario 3: Nested Object Filter**
- Filter: City = "San Francisco"
- Result: All employees with address.city = "San Francisco"

**Scenario 4: Array Filter**
- Filter: Skills IN ["React", "TypeScript"]
- Result: Employees who have React OR TypeScript in their skills array

## 📊 Sample Data

The application includes 60 sample employee records with:
- Personal information (name, email)
- Employment details (department, role, salary, join date)
- Skills array
- Address information (nested object)
- Performance metrics (projects, last review, performance rating)
- Active status (boolean)

## 🚀 Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## 📝 Code Quality

- **TypeScript**: Strict mode enabled with comprehensive type definitions
- **ESLint**: Configured with React and TypeScript rules
- **Component Organization**: Clear separation of concerns
- **Reusability**: Modular components designed for reuse
- **Documentation**: Inline comments for complex logic

## 🎯 Usage Examples

### Adding a Filter

1. Click "Add Filter" button
2. Select a field from the dropdown (e.g., "Department")
3. Choose an operator (e.g., "Is")
4. Enter/select the filter value
5. Table updates automatically

### Removing a Filter

- Click the trash icon on any filter row
- Or click "Clear All" to remove all filters

### Sorting Data

- Click any column header to sort
- Click again to reverse sort order
- Sorting works on filtered data

## 🔧 Customization

### Adding New Field Types

1. Add the field type to `FieldType` in `src/types/index.ts`
2. Create a new input component in `src/components/filterInputs/`
3. Add operators in `getOperatorsForFieldType()` in `src/types/fieldDefinitions.ts`
4. Implement filtering logic in `src/utils/filtering.ts`
5. Add the input case in `FilterInput` component

### Modifying Field Definitions

Edit `src/types/fieldDefinitions.ts` to:
- Add new fields
- Modify field options
- Change field labels or paths
- Add custom formatters

## 🐛 Troubleshooting

**Issue**: Filters not applying
- Ensure filter values are properly filled
- Check browser console for errors
- Verify field definitions match data structure

**Issue**: Date filters not working
- Ensure dates are in YYYY-MM-DD format
- Check that both "from" and "to" dates are selected

**Issue**: Build errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires Node 16+)

## 📄 License

This project is created for assessment purposes.

## 👨‍💻 Development Notes

- All components are functional components using React Hooks
- State management uses React's built-in `useState` and `useMemo`
- Filtering is optimized with memoization to prevent unnecessary recalculations
- The architecture is designed to be easily extensible for new field types and operators

---

**Built with ❤️ using React, TypeScript, and Material UI**

