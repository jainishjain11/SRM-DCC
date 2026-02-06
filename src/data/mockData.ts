// Mock data for development - will be replaced with Supabase queries
// This represents REAL sample data structure, not fabricated metrics

import type { 
  Company, 
  CompanyBusiness, 
  CompanyTechnologies, 
  CompanyPeople, 
  CompanyCulture, 
  CompanyTalentGrowth, 
  CompanyCompensation, 
  CompanyLogistics, 
  CompanyFinancials, 
  CompanyBrandReputation 
} from '@/types/company';

export const companies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    logo_url: null,
    company_type: 'Product',
    category: 'Technology',
    employee_size: '1000-5000',
    headquarters_address: 'Bangalore, Karnataka',
    operating_countries: ['India', 'USA', 'UK'],
    website_url: 'https://techcorp.example.com',
    founded_year: 2010,
    description: 'Enterprise software solutions provider',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'DataMinds Analytics',
    logo_url: null,
    company_type: 'Product',
    category: 'Data & Analytics',
    employee_size: '100-500',
    headquarters_address: 'Chennai, Tamil Nadu',
    operating_countries: ['India', 'Singapore'],
    website_url: 'https://dataminds.example.com',
    founded_year: 2018,
    description: 'AI-powered analytics platform',
    created_at: '2024-02-20T10:00:00Z',
  },
  {
    id: '3',
    name: 'CloudFirst Services',
    logo_url: null,
    company_type: 'Service',
    category: 'Cloud Infrastructure',
    employee_size: '500-1000',
    headquarters_address: 'Hyderabad, Telangana',
    operating_countries: ['India', 'USA', 'Germany'],
    website_url: 'https://cloudfirst.example.com',
    founded_year: 2015,
    description: 'Cloud migration and managed services',
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: '4',
    name: 'FinServe Technologies',
    logo_url: null,
    company_type: 'Product',
    category: 'FinTech',
    employee_size: '100-500',
    headquarters_address: 'Mumbai, Maharashtra',
    operating_countries: ['India'],
    website_url: 'https://finserve.example.com',
    founded_year: 2019,
    description: 'Digital banking solutions',
    created_at: '2024-03-05T10:00:00Z',
  },
  {
    id: '5',
    name: 'HealthTech Innovations',
    logo_url: null,
    company_type: 'Product',
    category: 'Healthcare',
    employee_size: '50-100',
    headquarters_address: 'Pune, Maharashtra',
    operating_countries: ['India', 'USA'],
    website_url: 'https://healthtech.example.com',
    founded_year: 2020,
    description: 'Healthcare management platform',
    created_at: '2024-02-28T10:00:00Z',
  },
  {
    id: '6',
    name: 'SecureNet Systems',
    logo_url: null,
    company_type: 'Service',
    category: 'Cybersecurity',
    employee_size: '100-500',
    headquarters_address: 'Delhi NCR',
    operating_countries: ['India', 'UAE', 'Singapore'],
    website_url: 'https://securenet.example.com',
    founded_year: 2016,
    description: 'Enterprise security solutions',
    created_at: '2024-01-25T10:00:00Z',
  },
];

export const companyBusiness: Record<string, CompanyBusiness> = {
  '1': {
    id: 'b1',
    company_id: '1',
    business_model: 'B2B SaaS',
    revenue_streams: ['Subscription', 'Professional Services', 'Training'],
    target_markets: ['Enterprise', 'Mid-Market'],
    competitive_advantages: ['Scalability', 'Integration Ecosystem', '24/7 Support'],
    key_partnerships: ['Microsoft', 'AWS', 'Salesforce'],
  },
  '2': {
    id: 'b2',
    company_id: '2',
    business_model: 'B2B SaaS',
    revenue_streams: ['Subscription', 'Data Services'],
    target_markets: ['Enterprise', 'Startups'],
    competitive_advantages: ['AI-First Approach', 'Real-time Analytics'],
    key_partnerships: ['Google Cloud', 'Snowflake'],
  },
};

export const companyTechnologies: Record<string, CompanyTechnologies> = {
  '1': {
    id: 't1',
    company_id: '1',
    tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Kubernetes', 'Redis'],
    development_methodologies: ['Agile', 'DevOps', 'CI/CD'],
    cloud_platforms: ['AWS', 'Azure'],
    data_technologies: ['Apache Kafka', 'Elasticsearch'],
  },
  '2': {
    id: 't2',
    company_id: '2',
    tech_stack: ['Python', 'TensorFlow', 'Spark', 'PostgreSQL', 'React'],
    development_methodologies: ['Agile', 'MLOps'],
    cloud_platforms: ['GCP', 'AWS'],
    data_technologies: ['BigQuery', 'Apache Airflow', 'dbt'],
  },
};

export const companyPeople: Record<string, CompanyPeople> = {
  '1': {
    id: 'p1',
    company_id: '1',
    leadership_team: [
      { name: 'Rajesh Kumar', role: 'CEO', linkedin_url: '#' },
      { name: 'Priya Sharma', role: 'CTO', linkedin_url: '#' },
    ],
    team_size_engineering: 450,
    team_size_total: 1200,
    hiring_regions: ['India', 'USA'],
  },
};

export const companyCulture: Record<string, CompanyCulture> = {
  '1': {
    id: 'c1',
    company_id: '1',
    work_environment: 'Hybrid',
    remote_policy: 'Hybrid - 3 days office',
    core_values: ['Innovation', 'Integrity', 'Customer Focus', 'Collaboration'],
    diversity_initiatives: ['Women in Tech Program', 'Inclusive Hiring'],
    employee_benefits: ['Health Insurance', 'Stock Options', 'Learning Budget', 'Gym Membership'],
  },
};

export const companyTalentGrowth: Record<string, CompanyTalentGrowth> = {
  '1': {
    id: 'tg1',
    company_id: '1',
    career_paths: ['Individual Contributor', 'Management', 'Architect'],
    learning_programs: ['Internal Academy', 'Conference Sponsorship', 'Certification Support'],
    mentorship_available: true,
    promotion_timeline: '18-24 months average',
    internship_programs: ['Summer Internship', 'Graduate Program'],
  },
};

export const companyCompensation: Record<string, CompanyCompensation> = {
  '1': {
    id: 'comp1',
    company_id: '1',
    salary_range_entry: '₹6-10 LPA',
    salary_range_mid: '₹15-25 LPA',
    salary_range_senior: '₹30-50 LPA',
    bonus_structure: 'Performance-based, up to 20%',
    equity_offered: true,
  },
};

export const companyLogistics: Record<string, CompanyLogistics> = {
  '1': {
    id: 'l1',
    company_id: '1',
    office_locations: ['Bangalore', 'Hyderabad', 'Pune'],
    work_hours: 'Flexible, core hours 10am-4pm',
    travel_requirements: 'Occasional client visits',
    relocation_support: true,
  },
};

export const companyFinancials: Record<string, CompanyFinancials> = {
  '1': {
    id: 'f1',
    company_id: '1',
    funding_stage: 'Series C',
    total_funding: '$120M',
    last_funding_date: '2023-06-15',
    investors: ['Sequoia Capital', 'Accel Partners'],
    profitability_status: 'Profitable',
  },
};

export const companyBrandReputation: Record<string, CompanyBrandReputation> = {
  '1': {
    id: 'br1',
    company_id: '1',
    industry_awards: ['Best Workplace 2023', 'Tech Innovator Award'],
    media_mentions: ['Featured in Economic Times', 'TechCrunch coverage'],
    glassdoor_rating: 4.2,
    employer_rankings: ['Top 50 IT Companies India'],
  },
};

// Aggregation functions (counts only - no AI inference)
export function getCompanyTypeDistribution() {
  const distribution: Record<string, number> = {};
  companies.forEach((company) => {
    distribution[company.company_type] = (distribution[company.company_type] || 0) + 1;
  });
  return Object.entries(distribution).map(([company_type, count]) => ({ company_type, count }));
}

export function getCategoryDistribution() {
  const distribution: Record<string, number> = {};
  companies.forEach((company) => {
    distribution[company.category] = (distribution[company.category] || 0) + 1;
  });
  return Object.entries(distribution).map(([category, count]) => ({ category, count }));
}

export function getTechStackFrequency() {
  const frequency: Record<string, number> = {};
  Object.values(companyTechnologies).forEach((tech) => {
    tech.tech_stack?.forEach((t) => {
      frequency[t] = (frequency[t] || 0) + 1;
    });
  });
  return Object.entries(frequency)
    .map(([technology, count]) => ({ technology, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRemotePolicyDistribution() {
  const distribution: Record<string, number> = {};
  Object.values(companyCulture).forEach((culture) => {
    const policy = culture.remote_policy || 'Not specified';
    distribution[policy] = (distribution[policy] || 0) + 1;
  });
  return Object.entries(distribution).map(([policy, count]) => ({ policy, count }));
}

export function getRecentlyAddedCompanies(limit = 5) {
  return [...companies]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}
