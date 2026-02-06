import {
  useCompanyTypeDistribution,
  useCategoryDistribution,
} from '@/hooks/useCompany';
import { ComingSoonBlock } from '@/components/ui/ComingSoonBlock';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

const CHART_COLORS = [
  'hsl(217, 91%, 50%)',   // Primary blue
  'hsl(142, 71%, 45%)',   // Success green
  'hsl(38, 92%, 50%)',    // Warning amber
  'hsl(262, 83%, 58%)',   // Purple
  'hsl(0, 84%, 60%)',     // Red
  'hsl(195, 75%, 45%)',   // Cyan
];

export default function Analytics() {
  const { distribution: typeDistribution, isLoading: typeLoading } = useCompanyTypeDistribution();
  const { distribution: categoryDistribution, isLoading: categoryLoading } = useCategoryDistribution();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1>Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Aggregated visibility into platform data
        </p>
      </div>

      {/* Enabled charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Type Distribution */}
        <div className="enterprise-card p-6">
          <h3 className="font-medium mb-4">Company Distribution by Type</h3>
          {typeLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : typeDistribution.length > 0 ? (
            <>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeDistribution}
                      dataKey="count"
                      nameKey="company_type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ company_type, count }) => `${company_type}: ${count}`}
                    >
                      {typeDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Total: {typeDistribution.reduce((sum, item) => sum + item.count, 0)} companies
              </p>
            </>
          ) : (
            <p className="text-muted-foreground text-center py-8">No data available</p>
          )}
        </div>

        {/* Category Distribution */}
        <div className="enterprise-card p-6">
          <h3 className="font-medium mb-4">Companies by Category</h3>
          {categoryLoading ? (
            <Skeleton className="h-64 rounded-lg" />
          ) : categoryDistribution.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(217, 91%, 50%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No data available</p>
          )}
        </div>
      </div>

      {/* Coming soon */}
      <section>
        <h2 className="text-base font-medium mb-4">Upcoming Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ComingSoonBlock
            title="Skill Trend Shifts"
            description="Track how technology demands are evolving over time."
            requiredData="Historical skill requirement data & time-series tracking"
          />
          <ComingSoonBlock
            title="Outcome Correlations"
            description="Analyze relationships between skills, companies, and placement outcomes."
            requiredData="Placement outcome data & student tracking"
          />
          <ComingSoonBlock
            title="Innovation Impact"
            description="Measure the influence of innovation initiatives on career outcomes."
            requiredData="Innovation framework integration & outcome metrics"
          />
        </div>
      </section>
    </div>
  );
}
