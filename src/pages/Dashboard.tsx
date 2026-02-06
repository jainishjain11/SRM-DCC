import { Building2, Layers, Clock, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import { ComingSoonBlock } from '@/components/ui/ComingSoonBlock';
import { CompanyCard } from '@/components/companies/CompanyCard';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useCompanies,
  useCompanyTypeDistribution,
  useCategoryDistribution,
} from '@/hooks/useCompany';

export default function Dashboard() {
  const { companies, isLoading } = useCompanies();
  const { distribution: typeDistribution } = useCompanyTypeDistribution();
  const { distribution: categoryDistribution } = useCategoryDistribution();

  const recentCompanies = companies.slice(0, 4);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground mt-1">System overview and key metrics</p>
      </div>

      {/* Enabled metrics */}
      <section>
        <h2 className="text-base font-medium mb-4">Platform Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Companies"
            value={isLoading ? '-' : companies.length}
            subtitle="In database"
            icon={<Building2 className="h-5 w-5" />}
          />
          <MetricCard
            title="Company Types"
            value={isLoading ? '-' : typeDistribution.length}
            subtitle={typeDistribution.map(t => t.company_type).join(', ')}
            icon={<Layers className="h-5 w-5" />}
          />
          <MetricCard
            title="Categories"
            value={isLoading ? '-' : categoryDistribution.length}
            subtitle="Industry sectors"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            title="Recently Added"
            value={isLoading ? '-' : recentCompanies.length}
            subtitle="Latest companies"
            icon={<Clock className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* Distribution by type */}
      {!isLoading && typeDistribution.length > 0 && (
        <section>
          <h2 className="text-base font-medium mb-4">Companies by Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {typeDistribution.map((item) => (
              <div key={item.company_type} className="metric-block">
                <p className="text-sm text-muted-foreground">{item.company_type}</p>
                <p className="text-3xl font-semibold mt-1">{item.count}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((item.count / companies.length) * 100).toFixed(0)}% of total
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recently added companies */}
      {isLoading ? (
        <section>
          <h2 className="text-base font-medium mb-4">Recently Added Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </section>
      ) : (
        <section>
          <h2 className="text-base font-medium mb-4">Recently Added Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentCompanies.map((company) => (
              <CompanyCard key={company.company_id} company={company} />
            ))}
          </div>
        </section>
      )}

      {/* Coming soon blocks */}
      <section>
        <h2 className="text-base font-medium mb-4">Upcoming Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComingSoonBlock
            title="Employability Snapshot"
            description="Personalized career readiness assessment based on your skills and target companies."
            requiredData="Student profile & skill assessment datasets"
          />
          <ComingSoonBlock
            title="Skill Readiness"
            description="Gap analysis between your current skills and industry requirements."
            requiredData="Skill mapping & role requirement tables"
          />
          <ComingSoonBlock
            title="Personalized Focus Areas"
            description="AI-driven recommendations for skill development priorities."
            requiredData="Student progress tracking & industry trend data"
          />
        </div>
      </section>
    </div>
  );
}
