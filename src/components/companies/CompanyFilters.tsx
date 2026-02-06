import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface CompanyFiltersProps {
  companyTypes: FilterOption[];
  categories: FilterOption[];
  employeeSizes: FilterOption[];
  selectedType: string | null;
  selectedCategory: string | null;
  selectedSize: string | null;
  onTypeChange: (value: string | null) => void;
  onCategoryChange: (value: string | null) => void;
  onSizeChange: (value: string | null) => void;
}

export function CompanyFilters({
  companyTypes,
  categories,
  employeeSizes,
  selectedType,
  selectedCategory,
  selectedSize,
  onTypeChange,
  onCategoryChange,
  onSizeChange,
}: CompanyFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Company Type */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Company Type</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTypeChange(null)}
            className={cn("filter-chip", !selectedType && "selected")}
          >
            All
          </button>
          {companyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onTypeChange(type.value)}
              className={cn("filter-chip", selectedType === type.value && "selected")}
            >
              {type.label}
              {type.count !== undefined && (
                <span className="ml-1 text-xs opacity-70">({type.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Category</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={cn("filter-chip", !selectedCategory && "selected")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={cn("filter-chip", selectedCategory === cat.value && "selected")}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Size */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Employee Size</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSizeChange(null)}
            className={cn("filter-chip", !selectedSize && "selected")}
          >
            All
          </button>
          {employeeSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => onSizeChange(size.value)}
              className={cn("filter-chip", selectedSize === size.value && "selected")}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
