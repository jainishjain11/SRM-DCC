import { Link } from 'react-router-dom';
import { Building2, MapPin, Users, Globe } from 'lucide-react';
import type { Company } from '@/types/company';
import { cn } from '@/lib/utils';

interface CompanyCardProps {
  company: Company;
  className?: string;
}

export function CompanyCard({ company, className }: CompanyCardProps) {
  return (
    <Link
      to={`/companies/${company.company_id}`}
      className={cn(
        "enterprise-card block p-4 transition-all hover:border-primary/30",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Logo placeholder */}
        <div className="w-12 h-12 rounded-md bg-secondary flex items-center justify-center shrink-0">
          {company.logo_url ? (
            <img 
              src={company.logo_url} 
              alt={`${company.name} logo`}
              className="w-full h-full object-contain rounded-md"
            />
          ) : (
            <Building2 className="h-6 w-6 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          {/* Name and type */}
          <div>
            <h3 className="font-medium text-foreground truncate">{company.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {company.company_type}
              </span>
              <span className="text-xs text-muted-foreground">
                {company.category}
              </span>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{company.employee_size}</span>
            </div>
            {company.headquarters_address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span className="truncate max-w-[150px]">{company.headquarters_address}</span>
              </div>
            )}
            {company.operating_countries && company.operating_countries.length > 0 && (
              <div className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                <span>{company.operating_countries.length} countries</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
