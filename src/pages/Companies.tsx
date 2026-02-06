import { useState, useMemo } from 'react';
import { CompanyCard } from '@/components/companies/CompanyCard';
import { CompanyFilters } from '@/components/companies/CompanyFilters';
import { useCompanies } from '@/hooks/useCompany';
import { Skeleton } from '@/components/ui/skeleton';

export default function Companies() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { companies, isLoading, error } = useCompanies();

  // Get unique filter options from data
  const companyTypes = useMemo(() => {
    const types = [...new Set(companies.map(c => c.company_type).filter(Boolean))];
    return types.map(type => ({
      value: type,
      label: type,
      count: companies.filter(c => c.company_type === type).length,
    }));
  }, [companies]);

  const categories = useMemo(() => {
    const cats = [...new Set(companies.map(c => c.category).filter(Boolean))];
    return cats.map(cat => ({ value: cat, label: cat }));
  }, [companies]);

  const employeeSizes = useMemo(() => {
    const sizes = [...new Set(companies.map(c => c.employee_size).filter(Boolean))];
    return sizes.map(size => ({ value: size, label: size }));
  }, [companies]);

  // Filter companies based on selection
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      if (selectedType && company.company_type !== selectedType) return false;
      if (selectedCategory && company.category !== selectedCategory) return false;
      if (selectedSize && company.employee_size !== selectedSize) return false;
      return true;
    });
  }, [selectedType, selectedCategory, selectedSize, companies]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load companies</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1>Companies</h1>
        <p className="text-muted-foreground mt-1">
          Browse and explore {isLoading ? '...' : `${companies.length} companies`} in the database
        </p>
      </div>

      {/* Filters */}
      <div className="enterprise-card p-4">
        <CompanyFilters
          companyTypes={companyTypes}
          categories={categories}
          employeeSizes={employeeSizes}
          selectedType={selectedType}
          selectedCategory={selectedCategory}
          selectedSize={selectedSize}
          onTypeChange={setSelectedType}
          onCategoryChange={setSelectedCategory}
          onSizeChange={setSelectedSize}
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {isLoading ? 'Loading companies...' : `Showing ${filteredCompanies.length} of ${companies.length} companies`}
        </p>
        {(selectedType || selectedCategory || selectedSize) && (
          <button
            onClick={() => {
              setSelectedType(null);
              setSelectedCategory(null);
              setSelectedSize(null);
            }}
            className="text-sm text-primary hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      )}

      {/* Company grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.company_id} company={company} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No companies match your filters</p>
          <button
            onClick={() => {
              setSelectedType(null);
              setSelectedCategory(null);
              setSelectedSize(null);
            }}
            className="text-primary hover:underline mt-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
