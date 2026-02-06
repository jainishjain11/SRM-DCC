# Supabase Integration Documentation

## Overview
This document outlines the complete Supabase integration for the Pixel Perfect Replica application. The application now uses real-time data from Supabase instead of mock data, with full schema alignment and database integrity.

## Architecture

### 1. Configuration (`src/lib/supabase.ts`)
- Initializes Supabase client with environment variables
- Validates required environment variables at runtime
- Provides error handling utilities

**Environment Variables Required:**
```
VITE_SUPABASE_URL=https://sddevrjdhbnndjdxagnt.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_71Ox3JdRXEMcnLyw0ger1w_8SSCM9bv
```

### 2. Type System (`src/types/company.ts`)
All TypeScript interfaces are directly mapped from the Supabase schema:

#### Main Tables:
- **Company** - Core company information (35 fields)
- **CompanyBrandReputation** - Brand metrics and reputation data (10 fields)
- **CompanyBusiness** - Business model, strategy, market info (24 fields)
- **CompanyCompensation** - Salary, benefits, incentives (8 fields)
- **CompanyCulture** - Culture, values, diversity metrics (16 fields)
- **CompanyFinancials** - Revenue, funding, growth metrics (18 fields)
- **CompanyLogistics** - Work environment, location, commute info (15 fields)
- **CompanyPeople** - Leadership, contacts, board members (10 fields)
- **CompanyTalentGrowth** - Learning, growth, development opportunities (23 fields)
- **CompanyTechnologies** - Tech stack, R&D, cybersecurity (9 fields)

#### Distribution Types:
- **CompanyTypeDistribution** - Count by company_type
- **CategoryDistribution** - Count by category
- **EmployeeSizeDistribution** - Count by employee_size

### 3. Service Layer (`src/services/companyService.ts`)
Provides all data fetching functions:

#### Company Queries:
- `fetchCompanies()` - Get all companies
- `fetchCompanyById(companyId)` - Get single company
- `fetchCompaniesByCategory(category)` - Filter by category
- `fetchCompaniesByType(companyType)` - Filter by type

#### Related Data Queries:
- `fetchCompanyBusiness(companyId)`
- `fetchCompanyBrandReputation(companyId)`
- `fetchCompanyCompensation(companyId)`
- `fetchCompanyCulture(companyId)`
- `fetchCompanyFinancials(companyId)`
- `fetchCompanyLogistics(companyId)`
- `fetchCompanyPeople(companyId)`
- `fetchCompanyTalentGrowth(companyId)`
- `fetchCompanyTechnologies(companyId)`

#### Batch Operations:
- `fetchCompanyWithAllRelations(companyId)` - Fetch all related data in parallel

#### Analytics:
- `fetchCompanyTypeDistribution()` - Distribution by type
- `fetchCategoryDistribution()` - Distribution by category
- `fetchEmployeeSizeDistribution()` - Distribution by employee size

#### Real-time Subscriptions:
- `subscribeToCompanies(callback)` - Listen to all company changes
- `subscribeToCompany(companyId, callback)` - Listen to specific company updates

### 4. React Hooks (`src/hooks/useCompany.ts`)
Custom hooks for component integration:

#### Company Hooks:
- `useCompanies()` - Fetch all companies with auto-refresh (30s)
- `useCompany(companyId)` - Fetch single company
- `useCompanyWithRelations(companyId)` - Fetch with all relations

#### Related Data Hooks:
- `useCompanyBusiness(companyId)`
- `useCompanyBrandReputation(companyId)`
- `useCompanyCompensation(companyId)`
- `useCompanyCulture(companyId)`
- `useCompanyFinancials(companyId)`
- `useCompanyLogistics(companyId)`
- `useCompanyPeople(companyId)`
- `useCompanyTalentGrowth(companyId)`
- `useCompanyTechnologies(companyId)`

#### Analytics Hooks:
- `useCompanyTypeDistribution()` - Get type distribution
- `useCategoryDistribution()` - Get category distribution
- `useEmployeeSizeDistribution()` - Get size distribution

#### Real-time Hooks:
- `useCompaniesRealtime()` - Real-time all companies
- `useCompanyRealtime(companyId)` - Real-time single company

### 5. Updated Pages

#### Companies.tsx
- Uses `useCompanies()` hook
- Displays loading states and skeletons
- Filters: company type, category, employee size
- Real-time data updates every 30 seconds

#### CompanyDetail.tsx
- Uses `useCompany()` and related hooks
- 8 tabs with comprehensive company data:
  - Overview: Basic info, global presence
  - Business & Strategy: Offerings, competitive landscape, market strategy
  - Technology: Tech stack, R&D, cybersecurity
  - People & Leadership: Leadership, contacts, board members
  - Culture: Culture, diversity, ethics, values
  - Talent & Growth: Learning, career growth, work impact
  - Compensation & Logistics: Pay, benefits, work environment
  - Financials & Brand: Revenue, funding, reputation
- Parsing support for JSON-encoded array fields
- Loading and error states

#### Dashboard.tsx
- Uses `useCompanies()` and distribution hooks
- Key metrics: Total companies, types, categories
- Company type breakdown
- Recently added companies grid
- Loading states with skeletons

#### Analytics.tsx
- Uses distribution hooks
- Company type distribution (pie chart)
- Category distribution (bar chart)
- Loading states with skeletons

### 6. Data Flow

```
User Interface (React Components)
        ↓
React Query Hooks (useCompany.ts)
        ↓
Service Layer (companyService.ts)
        ↓
Supabase Client (supabase.ts)
        ↓
Supabase Backend
        ↓
PostgreSQL Database
```

## JSON Field Handling

Many fields in the Supabase schema store JSON-encoded arrays (e.g., `operating_countries`, `core_values`). The application includes a `parseJsonString()` utility in `CompanyDetail.tsx` to handle:

```typescript
const parseJsonString = (value: string | null | undefined): string[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return value ? [value] : [];
  }
};
```

## Data Integrity Guarantees

1. **Schema Alignment**: All TypeScript interfaces directly map to Supabase table structures
2. **Type Safety**: Strict typing prevents invalid data operations
3. **Null Handling**: All fields support nullable values matching the schema
4. **Foreign Keys**: `company_id` relationships are maintained across all related tables
5. **Validation**: Supabase enforces PRIMARY KEY and FOREIGN KEY constraints

## Real-Time Updates

- Components refetch data every 30 seconds via React Query
- Real-time subscription hooks available for live updates
- `subscribeToCompanies()` and `subscribeToCompany()` for real-time listeners

## Error Handling

All service functions include:
- Try-catch error handling
- Console logging of errors
- Graceful fallbacks returning empty arrays or null
- User-friendly error messages in components

## Performance Optimizations

1. **Stale Time**: 5 minutes for most queries to reduce unnecessary refetches
2. **Refetch Interval**: 30 seconds for company data to balance freshness and performance
3. **Parallel Requests**: `fetchCompanyWithAllRelations()` uses Promise.all() for batch operations
4. **Memoization**: React Query handles caching and deduplication

## Migration Notes

### From Mock Data to Supabase:
1. Removed all mock data imports from components
2. Replaced static arrays with dynamic hook calls
3. Updated component keys from `company.id` to `company.company_id`
4. Added loading states and error handling
5. Enhanced field parsing for JSON-encoded arrays

### Breaking Changes:
- `company.id` → `company.company_id`
- `company.founded_year` → `company.incorporation_year`
- Array fields now may come as JSON strings requiring parsing

## Usage Examples

### Fetching Companies
```typescript
const { companies, isLoading, error } = useCompanies();

// Use in JSX
{companies.map(c => <CompanyCard key={c.company_id} company={c} />)}
```

### Fetching Company Details
```typescript
const companyId = 1;
const { company, isLoading } = useCompany(companyId);

if (isLoading) return <Skeleton />;
if (!company) return <NotFound />;

return <div>{company.name}</div>;
```

### Analytics
```typescript
const { distribution } = useCompanyTypeDistribution();

// Use in charts
<PieChart data={distribution} dataKey="count" nameKey="company_type" />
```

## Testing

All service functions should be tested against actual Supabase tables to ensure:
1. Correct table names and column names
2. Proper null handling
3. Foreign key relationships work correctly
4. Real-time subscriptions fire appropriately

## Troubleshooting

### Missing Environment Variables
```
Error: Missing Supabase environment variables
```
**Solution**: Ensure `.env` contains both `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

### Data Not Loading
1. Check browser console for errors
2. Verify Supabase project is running
3. Ensure network connectivity
4. Check React Query DevTools for request status

### Type Errors
- Verify the Company interface matches your Supabase schema
- Check that all nullable fields are properly typed with `| null`

## Future Enhancements

1. Add authentication for data mutations (create, update, delete)
2. Implement optimistic updates for user actions
3. Add pagination for large datasets
4. Create custom hooks for common filter combinations
5. Add data export functionality
6. Implement advanced search and filtering
7. Add data validation before submission
