import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Globe, MapPin, Users, Calendar, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useCompany,
  useCompanyBusiness,
  useCompanyBrandReputation,
  useCompanyCompensation,
  useCompanyCulture,
  useCompanyFinancials,
  useCompanyLogistics,
  useCompanyPeople,
  useCompanyTalentGrowth,
  useCompanyTechnologies,
} from '@/hooks/useCompany';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'business', label: 'Business & Strategy' },
  { id: 'technology', label: 'Technology' },
  { id: 'people', label: 'People & Leadership' },
  { id: 'culture', label: 'Culture' },
  { id: 'talent', label: 'Talent & Growth' },
  { id: 'compensation', label: 'Compensation & Logistics' },
  { id: 'financials', label: 'Financials & Brand' },
];

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  const companyId = id ? parseInt(id, 10) : null;

  const { company, isLoading: companyLoading, error: companyError } = useCompany(companyId);
  const { business } = useCompanyBusiness(companyId);
  const { brand } = useCompanyBrandReputation(companyId);
  const { compensation } = useCompanyCompensation(companyId);
  const { culture } = useCompanyCulture(companyId);
  const { financials } = useCompanyFinancials(companyId);
  const { logistics } = useCompanyLogistics(companyId);
  const { people } = useCompanyPeople(companyId);
  const { talent } = useCompanyTalentGrowth(companyId);
  const { technologies } = useCompanyTechnologies(companyId);

  if (companyError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load company details</p>
        <Link to="/companies" className="text-primary hover:underline mt-2 inline-block">
          Back to companies
        </Link>
      </div>
    );
  }

  if (companyLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-96 rounded-lg" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Company not found</p>
        <Link to="/companies" className="text-primary hover:underline mt-2 inline-block">
          Back to companies
        </Link>
      </div>
    );
  }

  const renderDataItem = (label: string, value: React.ReactNode) => {
    if (!value) return null;
    return (
      <div className="py-3 border-b border-border last:border-0">
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-sm text-foreground">{value}</dd>
      </div>
    );
  };

  const parseJsonString = (value: string | null | undefined): string[] => {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [String(parsed)];
    } catch {
      return value ? [value] : [];
    }
  };

  const renderArrayAsTags = (items: string | string[] | null | undefined) => {
    let itemsArray: string[] = [];
    
    if (typeof items === 'string') {
      itemsArray = parseJsonString(items);
    } else if (Array.isArray(items)) {
      itemsArray = items;
    }

    if (itemsArray.length === 0) return <span className="text-muted-foreground">Not available</span>;
    return (
      <div className="flex flex-wrap gap-2 mt-1">
        {itemsArray.map((item, i) => (
          <span key={i} className="px-2 py-1 text-xs bg-secondary rounded-md">
            {item}
          </span>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Company Information</h3>
              <dl>
                {renderDataItem('Overview', company.overview_text)}
                {renderDataItem('Incorporation Year', company.incorporation_year)}
                {renderDataItem('Company Type', company.company_type)}
                {renderDataItem('Category', company.category)}
                {renderDataItem('Employee Size', company.employee_size)}
                {renderDataItem('Headquarters', company.headquarters_address)}
                {renderDataItem('Nature of Company', company.nature_of_company)}
              </dl>
            </div>
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Global Presence</h3>
              <dl>
                {renderDataItem('Operating Countries', renderArrayAsTags(company.operating_countries))}
                {renderDataItem('Office Locations', renderArrayAsTags(company.office_locations))}
                {renderDataItem('Office Count', company.office_count)}
                {renderDataItem('Website', company.website_url ? (
                  <a href={company.website_url} target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:underline inline-flex items-center gap-1">
                    {company.website_url} <ExternalLink className="h-3 w-3" />
                  </a>
                ) : null)}
              </dl>
            </div>
          </div>
        );

      case 'business':
        if (!business) return <EmptyTabState />;
        return (
          <div className="space-y-6">
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Business Overview</h3>
              <dl>
                {renderDataItem('Core Value Proposition', business.core_value_proposition)}
                {renderDataItem('Pain Points Addressed', business.pain_points_addressed)}
                {renderDataItem('Offerings Description', business.offerings_description)}
                {renderDataItem('Unique Differentiators', renderArrayAsTags(business.unique_differentiators))}
              </dl>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="enterprise-card p-6">
                <h3 className="font-medium mb-4">Market & Strategy</h3>
                <dl>
                  {renderDataItem('Focus Sectors', renderArrayAsTags(business.focus_sectors))}
                  {renderDataItem('Top Customers', renderArrayAsTags(business.top_customers))}
                  {renderDataItem('Market Share %', business.market_share_percentage)}
                  {renderDataItem('Sales Motion', business.sales_motion)}
                </dl>
              </div>
              <div className="enterprise-card p-6">
                <h3 className="font-medium mb-4">Competitive Landscape</h3>
                <dl>
                  {renderDataItem('Key Competitors', renderArrayAsTags(business.key_competitors))}
                  {renderDataItem('Competitive Advantages', renderArrayAsTags(business.competitive_advantages))}
                  {renderDataItem('Weaknesses/Gaps', business.weaknesses_gaps)}
                  {renderDataItem('Benchmark vs Peers', business.benchmark_vs_peers)}
                </dl>
              </div>
            </div>
          </div>
        );

      case 'technology':
        if (!technologies) return <EmptyTabState />;
        return (
          <div className="space-y-6">
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Technology Stack</h3>
              <dl>
                {renderDataItem('Tech Stack', renderArrayAsTags(technologies.tech_stack))}
                {renderDataItem('Technology Partners', renderArrayAsTags(technologies.technology_partners))}
                {renderDataItem('Partnership Ecosystem', renderArrayAsTags(technologies.partnership_ecosystem))}
              </dl>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="enterprise-card p-6">
                <h3 className="font-medium mb-4">Innovation & Investment</h3>
                <dl>
                  {renderDataItem('R&D Investment', technologies.r_and_d_investment)}
                  {renderDataItem('AI/ML Adoption Level', technologies.ai_ml_adoption_level)}
                  {renderDataItem('Tech Adoption Rating', technologies.tech_adoption_rating)}
                </dl>
              </div>
              <div className="enterprise-card p-6">
                <h3 className="font-medium mb-4">Security & IP</h3>
                <dl>
                  {renderDataItem('Cybersecurity Posture', technologies.cybersecurity_posture)}
                  {renderDataItem('Intellectual Property', technologies.intellectual_property)}
                </dl>
              </div>
            </div>
          </div>
        );

      case 'people':
        if (!people) return <EmptyTabState />;
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Leadership</h3>
              <dl>
                {renderDataItem('CEO Name', people.ceo_name)}
                {people.ceo_linkedin_url && renderDataItem('CEO LinkedIn', (
                  <a href={people.ceo_linkedin_url} target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:underline inline-flex items-center gap-1">
                    LinkedIn Profile <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
                {renderDataItem('Key Leaders', renderArrayAsTags(people.key_leaders))}
                {renderDataItem('Board Members', renderArrayAsTags(people.board_members))}
              </dl>
            </div>
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Contact Information</h3>
              <dl>
                {renderDataItem('Contact Person', people.contact_person_name)}
                {renderDataItem('Contact Title', people.contact_person_title)}
                {renderDataItem('Contact Email', people.contact_person_email)}
                {renderDataItem('Contact Phone', people.contact_person_phone)}
                {renderDataItem('Access to Decision Makers', people.decision_maker_access)}
                {renderDataItem('Warm Intro Pathways', people.warm_intro_pathways)}
              </dl>
            </div>
          </div>
        );

      case 'culture':
        if (!culture) return <EmptyTabState />;
        return (
          <div className="space-y-6">
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Culture Overview</h3>
              <dl>
                {renderDataItem('Work Culture Summary', culture.work_culture_summary)}
                {renderDataItem('Mission Clarity', culture.mission_clarity)}
                {renderDataItem('Core Values', renderArrayAsTags(culture.core_values))}
              </dl>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="enterprise-card p-6">
                <h3 className="font-medium mb-4">People & Engagement</h3>
                <dl>
                  {renderDataItem('Hiring Velocity', culture.hiring_velocity)}
                  {renderDataItem('Employee Turnover', culture.employee_turnover)}
                  {renderDataItem('Avg Retention Tenure', culture.avg_retention_tenure)}
                  {renderDataItem('Manager Quality', culture.manager_quality)}
                  {renderDataItem('Psychological Safety', culture.psychological_safety)}
                  {renderDataItem('Feedback Culture', culture.feedback_culture)}
                </dl>
              </div>
              <div className="enterprise-card p-6">
                <h3 className="font-medium mb-4">Well-being & Values</h3>
                <dl>
                  {renderDataItem('Diversity Score', culture.diversity_inclusion_score)}
                  {renderDataItem('Diversity Metrics', renderArrayAsTags(culture.diversity_metrics))}
                  {renderDataItem('Ethical Standards', culture.ethical_standards)}
                  {renderDataItem('Burnout Risk', culture.burnout_risk)}
                  {renderDataItem('Layoff History', culture.layoff_history)}
                  {renderDataItem('Sustainability/CSR', culture.sustainability_csr)}
                </dl>
              </div>
            </div>
          </div>
        );

      case 'talent':
        if (!talent) return <EmptyTabState />;
        return (
          <div className="space-y-6">
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Learning & Development</h3>
              <dl>
                {renderDataItem('Training Spend', talent.training_spend)}
                {renderDataItem('Onboarding Quality', talent.onboarding_quality)}
                {renderDataItem('Learning Culture', talent.learning_culture)}
                {renderDataItem('Mentorship Availability', talent.mentorship_availability)}
                {renderDataItem('Internal Mobility', talent.internal_mobility)}
                {renderDataItem('Tools Access', talent.tools_access)}
              </dl>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="enterprise-card p-6">
                <h3 className="font-medium mb-4">Career Growth</h3>
                <dl>
                  {renderDataItem('Promotion Clarity', talent.promotion_clarity)}
                  {renderDataItem('Role Clarity', talent.role_clarity)}
                  {renderDataItem('Early Ownership', talent.early_ownership)}
                  {renderDataItem('Exposure Quality', talent.exposure_quality)}
                  {renderDataItem('Cross-functional Exposure', talent.cross_functional_exposure)}
                  {renderDataItem('Skill Relevance', talent.skill_relevance)}
                </dl>
              </div>
              <div className="enterprise-card p-6">
                <h3 className="font-medium mb-4">Work Impact & Brand Value</h3>
                <dl>
                  {renderDataItem('Work Impact', talent.work_impact)}
                  {renderDataItem('Brand Value', talent.brand_value)}
                  {renderDataItem('Client Quality', talent.client_quality)}
                  {renderDataItem('Exit Opportunities', talent.exit_opportunities)}
                  {renderDataItem('External Recognition', talent.external_recognition)}
                  {renderDataItem('Network Strength', talent.network_strength)}
                </dl>
              </div>
            </div>
          </div>
        );

      case 'compensation':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Compensation & Benefits</h3>
              {compensation ? (
                <dl>
                  {renderDataItem('Fixed vs Variable Pay', compensation.fixed_vs_variable_pay)}
                  {renderDataItem('Bonus Predictability', compensation.bonus_predictability)}
                  {renderDataItem('ESOPs/Incentives', compensation.esops_incentives)}
                  {renderDataItem('Leave Policy', compensation.leave_policy)}
                  {renderDataItem('Health Support', compensation.health_support)}
                  {renderDataItem('Family Health Insurance', compensation.family_health_insurance)}
                  {renderDataItem('Relocation Support', compensation.relocation_support)}
                  {renderDataItem('Lifestyle Benefits', compensation.lifestyle_benefits)}
                </dl>
              ) : (
                <p className="text-muted-foreground text-sm">Not available</p>
              )}
            </div>
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Logistics & Work Environment</h3>
              {logistics ? (
                <dl>
                  {renderDataItem('Remote Policy', logistics.remote_policy_details)}
                  {renderDataItem('Typical Hours', logistics.typical_hours)}
                  {renderDataItem('Overtime Expectations', logistics.overtime_expectations)}
                  {renderDataItem('Weekend Work', logistics.weekend_work)}
                  {renderDataItem('Flexibility Level', logistics.flexibility_level)}
                  {renderDataItem('Location Centrality', logistics.location_centrality)}
                  {renderDataItem('Public Transport Access', logistics.public_transport_access)}
                  {renderDataItem('Cab Policy', logistics.cab_policy)}
                  {renderDataItem('Airport Commute Time', logistics.airport_commute_time)}
                  {renderDataItem('Office Zone Type', logistics.office_zone_type)}
                  {renderDataItem('Area Safety', logistics.area_safety)}
                </dl>
              ) : (
                <p className="text-muted-foreground text-sm">Not available</p>
              )}
            </div>
          </div>
        );

      case 'financials':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Financial Overview</h3>
              {financials ? (
                <dl>
                  {renderDataItem('Annual Revenue', financials.annual_revenue)}
                  {renderDataItem('Annual Profit', financials.annual_profit)}
                  {renderDataItem('Revenue Mix', financials.revenue_mix)}
                  {renderDataItem('Valuation', financials.valuation)}
                  {renderDataItem('YoY Growth Rate', financials.yoy_growth_rate)}
                  {renderDataItem('Profitability Status', financials.profitability_status)}
                </dl>
              ) : (
                <p className="text-muted-foreground text-sm">Not available</p>
              )}
            </div>
            <div className="enterprise-card p-6">
              <h3 className="font-medium mb-4">Funding & Growth Metrics</h3>
              {financials ? (
                <dl>
                  {renderDataItem('Total Capital Raised', financials.total_capital_raised)}
                  {renderDataItem('Key Investors', renderArrayAsTags(financials.key_investors))}
                  {renderDataItem('Recent Funding Rounds', renderArrayAsTags(financials.recent_funding_rounds))}
                  {renderDataItem('Customer Acquisition Cost', financials.customer_acquisition_cost)}
                  {renderDataItem('Customer Lifetime Value', financials.customer_lifetime_value)}
                  {renderDataItem('CAC LTV Ratio', financials.cac_ltv_ratio)}
                  {renderDataItem('Churn Rate', financials.churn_rate)}
                  {renderDataItem('Net Promoter Score', financials.net_promoter_score)}
                  {renderDataItem('Burn Rate', financials.burn_rate)}
                  {renderDataItem('Runway (months)', financials.runway_months)}
                </dl>
              ) : (
                <p className="text-muted-foreground text-sm">Not available</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back link */}
      <Link 
        to="/companies" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to companies
      </Link>

      {/* Company header */}
      <div className="enterprise-card p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            {company.logo_url ? (
              <img 
                src={company.logo_url} 
                alt={`${company.name} logo`}
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <Building2 className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{company.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{company.short_name}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium text-xs">
                {company.company_type}
              </span>
              <span>{company.category}</span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {company.employee_size}
              </span>
              {company.headquarters_address && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {company.headquarters_address}
                </span>
              )}
              {company.incorporation_year && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Incorporated {company.incorporation_year}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="tab-nav overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn("tab-item whitespace-nowrap", activeTab === tab.id && "active")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{renderTabContent()}</div>
    </div>
  );
}

function EmptyTabState() {
  return (
    <div className="enterprise-card p-6 text-center">
      <p className="text-muted-foreground">No data available for this section</p>
    </div>
  );
}