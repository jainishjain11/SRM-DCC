# Quick Start Guide - Supabase Integration

## What Changed?

Your application has been fully migrated from mock data to real-time Supabase data. Here's what you need to know:

## Project Structure

```
src/
├── lib/
│   └── supabase.ts                 # Supabase client configuration
├── services/
│   └── companyService.ts           # Data fetching functions
├── hooks/
│   └── useCompany.ts               # React Query hooks
├── types/
│   └── company.ts                  # TypeScript interfaces (schema-mapped)
├── pages/
│   ├── Companies.tsx               # ✅ Updated - Uses Supabase
│   ├── CompanyDetail.tsx           # ✅ Updated - Uses Supabase
│   ├── Dashboard.tsx               # ✅ Updated - Uses Supabase
│   ├── Analytics.tsx               # ✅ Updated - Uses Supabase
│   ├── Skills.tsx                  # No changes needed
│   └── Innovation.tsx              # No changes needed
└── components/
    ├── companies/
    │   ├── CompanyCard.tsx         # ✅ Updated - Uses company_id
    │   ├── CompanyFilters.tsx      # No changes needed
    └── ...
```

## Key Files Created

1. **src/lib/supabase.ts** - Supabase client initialization
2. **src/services/companyService.ts** - All data fetching functions
3. **src/hooks/useCompany.ts** - React Query hooks for components
4. **SUPABASE_INTEGRATION.md** - Complete documentation
5. **ENTITY_SCHEMA_MAPPING.md** - Field mapping guide

## Environment Setup

Your `.env` file should contain:
```
VITE_SUPABASE_URL=https://sddevrjdhbnndjdxagnt.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_71Ox3JdRXEMcnLyw0ger1w_8SSCM9bv
```

## How to Use in Components

### Example 1: Display All Companies
```typescript
import { useCompanies } from '@/hooks/useCompany';

export default function MyComponent() {
  const { companies, isLoading, error } = useCompanies();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      {companies.map(company => (
        <div key={company.company_id}>{company.name}</div>
      ))}
    </div>
  );
}
```

### Example 2: Display Company Details
```typescript
import { useCompany } from '@/hooks/useCompany';

export default function CompanyDetailPage() {
  const { company, isLoading } = useCompany(1); // company_id = 1

  if (isLoading) return <Skeleton />;
  if (!company) return <NotFound />;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.overview_text}</p>
      <p>Type: {company.company_type}</p>
      <p>Category: {company.category}</p>
    </div>
  );
}
```

### Example 3: Get Related Data
```typescript
import {
  useCompany,
  useCompanyBusiness,
  useCompanyCulture,
} from '@/hooks/useCompany';

export default function CompanyTab() {
  const companyId = 1;
  const { company } = useCompany(companyId);
  const { business } = useCompanyBusiness(companyId);
  const { culture } = useCompanyCulture(companyId);

  return (
    <div>
      <h1>{company?.name}</h1>
      <section>
        <h2>Business</h2>
        <p>{business?.core_value_proposition}</p>
      </section>
      <section>
        <h2>Culture</h2>
        <p>{culture?.work_culture_summary}</p>
      </section>
    </div>
  );
}
```

### Example 4: Use Analytics
```typescript
import { useCompanyTypeDistribution } from '@/hooks/useCompany';
import { PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsDashboard() {
  const { distribution, isLoading } = useCompanyTypeDistribution();

  if (isLoading) return <Skeleton />;

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={distribution}
        dataKey="count"
        nameKey="company_type"
        cx="50%"
        cy="50%"
        outerRadius={80}
      >
        {distribution.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
```

## Important Changes from Previous Version

### 1. Company ID Field
**Old:** `company.id` (string)
**New:** `company.company_id` (number)

Update all references:
```typescript
// ❌ Old
<Component key={company.id} />

// ✅ New
<Component key={company.company_id} />

// ❌ Old
useCompany(parseInt(id))

// ✅ New
useCompany(id) // already a number from params
```

### 2. Foundation Year Field
**Old:** `company.founded_year`
**New:** `company.incorporation_year`

### 3. Array Fields Now Come as JSON Strings
**Old:** `company.operating_countries` was `["India", "USA"]`
**New:** `company.operating_countries` is `'["India", "USA"]'` (JSON string)

The application automatically parses these with:
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

### 4. Real-Time Updates
Data refreshes automatically every 30 seconds. For immediate updates, use real-time hooks:
```typescript
const { companies } = useCompaniesRealtime(); // Live updates
```

## Available Hooks

### Company Queries
```typescript
useCompanies()                          // All companies
useCompany(id)                          // Single company
useCompanyWithRelations(id)             // Company + all related data
useCompanyRealtime(id)                  // Real-time single company
useCompaniesRealtime()                  // Real-time all companies
```

### Related Data
```typescript
useCompanyBusiness(id)
useCompanyBrandReputation(id)
useCompanyCompensation(id)
useCompanyCulture(id)
useCompanyFinancials(id)
useCompanyLogistics(id)
useCompanyPeople(id)
useCompanyTalentGrowth(id)
useCompanyTechnologies(id)
```

### Analytics
```typescript
useCompanyTypeDistribution()
useCategoryDistribution()
useEmployeeSizeDistribution()
```

## Service Functions (Lower Level)

If you need direct access to service layer:

```typescript
import {
  fetchCompanies,
  fetchCompanyById,
  fetchCompanyBusiness,
  // ... other service functions
} from '@/services/companyService';

// Direct usage (without React hooks)
const companies = await fetchCompanies();
const company = await fetchCompanyById(1);
const business = await fetchCompanyBusiness(1);
```

## Data Schema

All data is strongly typed according to the Supabase schema. TypeScript will catch mismatches:

```typescript
// ✅ Correct
const name: string | null = company.name;

// ❌ Incorrect - company_id is number, not string
const id: string = company.company_id;

// ✅ Correct
const id: number = company.company_id;
```

## Testing Your Integration

1. **Check Network Tab**: Verify requests to Supabase API
   - URL should start with your Supabase URL
   - Status should be 200

2. **Check React Query DevTools**:
   ```typescript
   import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
   
   // Add to your App component
   <ReactQueryDevtools initialIsOpen={false} />
   ```

3. **Verify Data in Console**:
   ```typescript
   const { companies } = useCompanies();
   console.log('Companies:', companies);
   ```

4. **Check Supabase Dashboard**:
   - Navigate to your Supabase project
   - Verify tables exist and have data
   - Check logs for any errors

## Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution**: Add to `.env`:
```
VITE_SUPABASE_URL=https://sddevrjdhbnndjdxagnt.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_71Ox3JdRXEMcnLyw0ger1w_8SSCM9bv
```

### Issue: Data is undefined
**Solution**: Check loading state and error:
```typescript
const { company, isLoading, error } = useCompany(id);

if (isLoading) return <Loading />;
if (error) return <Error message={error.message} />;
if (!company) return <NotFound />;

return <div>{company.name}</div>;
```

### Issue: Arrays showing as "[object Object]"
**Solution**: Use the parseJsonString helper:
```typescript
const tags = parseJsonString(company.core_values);
return tags.map(tag => <Tag key={tag}>{tag}</Tag>);
```

### Issue: Component not updating with new data
**Solution**: Ensure you're using the hook correctly:
```typescript
// ✅ Good - hook at component level
const { companies } = useCompanies();
return <List items={companies} />;

// ❌ Bad - hook inside condition
if (condition) {
  const { companies } = useCompanies(); // Wrong!
}
```

## Performance Tips

1. **Use Skeletons During Load**:
   ```typescript
   {isLoading && <SkeletonCard />}
   {!isLoading && <CompanyCard company={company} />}
   ```

2. **Leverage Caching**:
   React Query caches data for 5 minutes. Multiple requests within that time use cached data.

3. **Use Batch Operations**:
   ```typescript
   // ✅ Parallel fetching
   const data = await fetchCompanyWithAllRelations(id);
   
   // ❌ Sequential fetching (slower)
   const company = await fetchCompanyById(id);
   const business = await fetchCompanyBusiness(id);
   ```

4. **Consider Pagination**:
   For large datasets, implement pagination:
   ```typescript
   // Future enhancement - not yet implemented
   const { companies } = useCompanies({ page: 1, limit: 20 });
   ```

## Next Steps

1. ✅ Test the Companies page - verify all companies load
2. ✅ Test Company Detail page - verify all tabs display data correctly
3. ✅ Test Dashboard - verify metrics display
4. ✅ Test Analytics - verify charts render
5. 📋 Populate any missing database records
6. 📋 Implement data mutation endpoints (if needed)
7. 📋 Add more advanced filtering options

## Support & Questions

Refer to:
- **SUPABASE_INTEGRATION.md** - Detailed architecture and API reference
- **ENTITY_SCHEMA_MAPPING.md** - Field definitions and relationships
- TypeScript interfaces in **src/types/company.ts** - Available fields

## File References

- Supabase config: [src/lib/supabase.ts](src/lib/supabase.ts)
- Service layer: [src/services/companyService.ts](src/services/companyService.ts)
- React hooks: [src/hooks/useCompany.ts](src/hooks/useCompany.ts)
- Type definitions: [src/types/company.ts](src/types/company.ts)
- Documentation: [SUPABASE_INTEGRATION.md](SUPABASE_INTEGRATION.md)
- Schema mapping: [ENTITY_SCHEMA_MAPPING.md](ENTITY_SCHEMA_MAPPING.md)
