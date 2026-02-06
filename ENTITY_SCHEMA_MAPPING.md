# Entity-Schema Mapping Guide

This document maps each application entity to the Supabase database schema to ensure real-time data integrity.

## Company Overview

### Entity: Company (Main Table)
**Supabase Table**: `public.companies`
**Primary Key**: `company_id` (integer)

#### Field Mappings

| Application Field | SQL Column | Type | Nullable | Purpose |
|-------------------|-----------|------|----------|---------|
| company_id | company_id | integer | NO | Unique identifier |
| name | name | text | YES | Company legal name |
| short_name | short_name | text | YES | Company abbreviated name |
| logo_url | logo_url | text | YES | Company logo URL |
| company_type | company_type | text | YES | "Product" or "Service" |
| category | category | text | YES | Industry classification |
| incorporation_year | incorporation_year | text | YES | Founding/incorporation year |
| overview_text | overview_text | text | YES | Company description |
| nature_of_company | nature_of_company | text | YES | Industry nature |
| headquarters_address | headquarters_address | text | YES | Primary office location |
| operating_countries | operating_countries | text (JSON) | YES | Countries of operation |
| office_count | office_count | text | YES | Number of offices |
| office_locations | office_locations | text (JSON) | YES | List of office addresses |
| employee_size | employee_size | text | YES | Employee count range |
| vision_statement | vision_statement | text | YES | Company vision |
| mission_statement | mission_statement | text | YES | Company mission |
| core_values | core_values | text (JSON) | YES | Company values |
| history_timeline | history_timeline | text | YES | Company history |
| recent_news | recent_news | text | YES | Latest news |
| website_url | website_url | text | YES | Company website |
| linkedin_url | linkedin_url | text | YES | LinkedIn profile |
| twitter_handle | twitter_handle | text | YES | Twitter handle |
| facebook_url | facebook_url | text | YES | Facebook page |
| instagram_url | instagram_url | text | YES | Instagram profile |
| primary_contact_email | primary_contact_email | text | YES | Main contact email |
| primary_phone_number | primary_phone_number | text | YES | Main contact phone |
| regulatory_status | regulatory_status | text | YES | Legal/regulatory status |
| legal_issues | legal_issues | text | YES | Known legal issues |
| esg_ratings | esg_ratings | text | YES | ESG rating |
| supply_chain_dependencies | supply_chain_dependencies | text | YES | Supply chain info |
| geopolitical_risks | geopolitical_risks | text | YES | Geopolitical concerns |
| macro_risks | macro_risks | text | YES | Macroeconomic risks |
| carbon_footprint | carbon_footprint | text | YES | Carbon emissions data |
| ethical_sourcing | ethical_sourcing | text | YES | Ethical practices |
| marketing_video_url | marketing_video_url | text | YES | Marketing video link |
| customer_testimonials | customer_testimonials | text | YES | Client testimonials |

---

## Business Information

### Entity: CompanyBusiness (Business Strategy Tab)
**Supabase Table**: `public.company_business`
**Foreign Key**: `company_id` → `companies.company_id`

#### Field Mappings

| Application Field | SQL Column | Type | Purpose |
|-------------------|-----------|------|---------|
| company_id | company_id | integer | Reference to company |
| pain_points_addressed | pain_points_addressed | text | Problems solved |
| focus_sectors | focus_sectors | text (JSON) | Target industries |
| offerings_description | offerings_description | text | What they offer |
| top_customers | top_customers | text (JSON) | Major clients |
| core_value_proposition | core_value_proposition | text | Key value offer |
| unique_differentiators | unique_differentiators | text (JSON) | Competitive edges |
| competitive_advantages | competitive_advantages | text (JSON) | Market advantages |
| weaknesses_gaps | weaknesses_gaps | text | Known weaknesses |
| key_challenges_needs | key_challenges_needs | text | Current challenges |
| key_competitors | key_competitors | text (JSON) | Main competitors |
| market_share_percentage | market_share_percentage | text | Market share % |
| sales_motion | sales_motion | text | Sales approach |
| customer_concentration_risk | customer_concentration_risk | text | Revenue risk |
| exit_strategy_history | exit_strategy_history | text | Exit plans |
| benchmark_vs_peers | benchmark_vs_peers | text | Peer comparison |
| future_projections | future_projections | text | Growth forecast |
| strategic_priorities | strategic_priorities | text | Strategic focus |
| industry_associations | industry_associations | text (JSON) | Association memberships |
| case_studies | case_studies | text | Success stories |
| go_to_market_strategy | go_to_market_strategy | text | GTM approach |
| innovation_roadmap | innovation_roadmap | text | Innovation plans |
| product_pipeline | product_pipeline | text | Upcoming products |
| tam | tam | text | Total addressable market |
| sam | sam | text | Serviceable market |
| som | som | text | Serviceable obtainable market |

---

## Brand & Reputation

### Entity: CompanyBrandReputation (Brand Tab)
**Supabase Table**: `public.company_brand_reputation`
**Foreign Key**: `company_id` → `companies.company_id`

#### Field Mappings

| Application Field | SQL Column | Type | Purpose |
|-------------------|-----------|------|---------|
| company_id | company_id | integer | Reference to company |
| website_quality | website_quality | text | Website rating |
| website_rating | website_rating | text | Quality score |
| website_traffic_rank | website_traffic_rank | text | Traffic ranking |
| social_media_followers | social_media_followers | text | Social followers count |
| glassdoor_rating | glassdoor_rating | text | Glassdoor score |
| indeed_rating | indeed_rating | text | Indeed rating |
| google_rating | google_rating | text | Google rating |
| awards_recognitions | awards_recognitions | text (JSON) | Awards won |
| brand_sentiment_score | brand_sentiment_score | text | Sentiment analysis |
| event_participation | event_participation | text | Event involvement |

---

## Compensation

### Entity: CompanyCompensation (Compensation Tab)
**Supabase Table**: `public.company_compensation`
**Foreign Key**: `company_id` → `companies.company_id`

#### Field Mappings

| Application Field | SQL Column | Type | Purpose |
|-------------------|-----------|------|---------|
| company_id | company_id | integer | Reference to company |
| leave_policy | leave_policy | text | Vacation/leave policy |
| health_support | health_support | text | Health benefits |
| fixed_vs_variable_pay | fixed_vs_variable_pay | text | Pay structure |
| bonus_predictability | bonus_predictability | text | Bonus consistency |
| esops_incentives | esops_incentives | text | Employee stock options |
| family_health_insurance | family_health_insurance | text | Family coverage |
| relocation_support | relocation_support | text | Relocation assistance |
| lifestyle_benefits | lifestyle_benefits | text (JSON) | Perks and benefits |

---

## Culture

### Entity: CompanyCulture (Culture Tab)
**Supabase Table**: `public.company_culture`
**Foreign Key**: `company_id` → `companies.company_id`

#### Field Mappings

| Application Field | SQL Column | Type | Purpose |
|-------------------|-----------|------|---------|
| company_id | company_id | integer | Reference to company |
| hiring_velocity | hiring_velocity | text | Hiring pace |
| employee_turnover | employee_turnover | text | Turnover rate |
| avg_retention_tenure | avg_retention_tenure | text | Average tenure |
| diversity_metrics | diversity_metrics | text (JSON) | Diversity data |
| work_culture_summary | work_culture_summary | text | Culture description |
| manager_quality | manager_quality | text | Management rating |
| psychological_safety | psychological_safety | text | Psychological safety score |
| feedback_culture | feedback_culture | text | Feedback frequency |
| diversity_inclusion_score | diversity_inclusion_score | text | D&I score |
| ethical_standards | ethical_standards | text | Ethics rating |
| burnout_risk | burnout_risk | text | Burnout level |
| layoff_history | layoff_history | text | Layoff information |
| mission_clarity | mission_clarity | text | Mission understanding |
| sustainability_csr | sustainability_csr | text | CSR initiatives |
| crisis_behavior | crisis_behavior | text | Crisis response |

---

## Financials

### Entity: CompanyFinancials (Financials Tab)
**Supabase Table**: `public.company_financials`
**Foreign Key**: `company_id` → `companies.company_id`

#### Field Mappings

| Application Field | SQL Column | Type | Purpose |
|-------------------|-----------|------|---------|
| company_id | company_id | integer | Reference to company |
| annual_revenue | annual_revenue | text | Yearly revenue |
| annual_profit | annual_profit | text | Yearly profit |
| revenue_mix | revenue_mix | text | Revenue breakdown |
| valuation | valuation | text | Company valuation |
| yoy_growth_rate | yoy_growth_rate | text | Year-over-year growth |
| profitability_status | profitability_status | text | Profitable or not |
| key_investors | key_investors | text (JSON) | Major investors |
| recent_funding_rounds | recent_funding_rounds | text (JSON) | Funding history |
| total_capital_raised | total_capital_raised | text | Total funding |
| customer_acquisition_cost | customer_acquisition_cost | text | CAC |
| customer_lifetime_value | customer_lifetime_value | text | LTV |
| cac_ltv_ratio | cac_ltv_ratio | text | CAC:LTV ratio |
| churn_rate | churn_rate | text | Customer churn |
| net_promoter_score | net_promoter_score | text | NPS score |
| burn_rate | burn_rate | text | Monthly burn |
| runway_months | runway_months | text | Months of runway |
| burn_multiplier | burn_multiplier | text | Burn ratio |

---

## Logistics

### Entity: CompanyLogistics (Logistics Tab)
**Supabase Table**: `public.company_logistics`
**Foreign Key**: `company_id` → `companies.company_id`

#### Field Mappings

| Application Field | SQL Column | Type | Purpose |
|-------------------|-----------|------|---------|
| company_id | company_id | integer | Reference to company |
| remote_policy_details | remote_policy_details | text | Remote work policy |
| typical_hours | typical_hours | text | Working hours |
| overtime_expectations | overtime_expectations | text | OT expectations |
| weekend_work | weekend_work | text | Weekend work |
| flexibility_level | flexibility_level | text | Work flexibility |
| location_centrality | location_centrality | text | Office location rating |
| public_transport_access | public_transport_access | text | Public transit access |
| cab_policy | cab_policy | text | Transportation allowance |
| airport_commute_time | airport_commute_time | text | Commute time |
| office_zone_type | office_zone_type | text | Office location type |
| area_safety | area_safety | text | Safety rating |
| safety_policies | safety_policies | text | Safety protocols |
| infrastructure_safety | infrastructure_safety | text | Building safety |
| emergency_preparedness | emergency_preparedness | text | Emergency plans |

---

## People & Leadership

### Entity: CompanyPeople (People Tab)
**Supabase Table**: `public.company_people`
**Foreign Key**: `company_id` → `companies.company_id`

#### Field Mappings

| Application Field | SQL Column | Type | Purpose |
|-------------------|-----------|------|---------|
| company_id | company_id | integer | Reference to company |
| ceo_name | ceo_name | text | CEO name |
| ceo_linkedin_url | ceo_linkedin_url | text | CEO LinkedIn |
| key_leaders | key_leaders | text (JSON) | Leadership team |
| warm_intro_pathways | warm_intro_pathways | text | Connection options |
| decision_maker_access | decision_maker_access | text | Access to decision makers |
| contact_person_name | contact_person_name | text | Main contact |
| contact_person_title | contact_person_title | text | Contact title |
| contact_person_email | contact_person_email | text | Contact email |
| contact_person_phone | contact_person_phone | text | Contact phone |
| board_members | board_members | text (JSON) | Board information |

---

## Talent & Growth

### Entity: CompanyTalentGrowth (Talent Tab)
**Supabase Table**: `public.company_talent_growth`
**Foreign Key**: `company_id` → `companies.company_id`

#### Field Mappings

| Application Field | SQL Column | Type | Purpose |
|-------------------|-----------|------|---------|
| company_id | company_id | integer | Reference to company |
| training_spend | training_spend | text | Training budget |
| onboarding_quality | onboarding_quality | text | Onboarding rating |
| learning_culture | learning_culture | text | Learning emphasis |
| exposure_quality | exposure_quality | text | Work exposure rating |
| mentorship_availability | mentorship_availability | text | Mentorship programs |
| internal_mobility | internal_mobility | text | Promotion from within |
| promotion_clarity | promotion_clarity | text | Promotion criteria |
| tools_access | tools_access | text | Development tools |
| role_clarity | role_clarity | text | Role definition clarity |
| early_ownership | early_ownership | text | Ownership opportunities |
| work_impact | work_impact | text | Impact measurement |
| execution_thinking_balance | execution_thinking_balance | text | Execution vs. strategy |
| automation_level | automation_level | text | Work automation |
| cross_functional_exposure | cross_functional_exposure | text | Cross-team collaboration |
| company_maturity | company_maturity | text | Company stage |
| brand_value | brand_value | text | Employer brand value |
| client_quality | client_quality | text | Client/customer quality |
| exit_opportunities | exit_opportunities | text | Career path options |
| skill_relevance | skill_relevance | text | Skill relevance |
| external_recognition | external_recognition | text | Industry recognition |
| network_strength | network_strength | text | Networking opportunities |
| global_exposure | global_exposure | text | International experience |

---

## Technologies

### Entity: CompanyTechnologies (Technology Tab)
**Supabase Table**: `public.company_technologies`
**Foreign Key**: `company_id` → `companies.company_id`

#### Field Mappings

| Application Field | SQL Column | Type | Purpose |
|-------------------|-----------|------|---------|
| company_id | company_id | integer | Reference to company |
| technology_partners | technology_partners | text (JSON) | Tech partnerships |
| intellectual_property | intellectual_property | text | IP portfolio |
| r_and_d_investment | r_and_d_investment | text | R&D spending |
| ai_ml_adoption_level | ai_ml_adoption_level | text | AI/ML maturity |
| tech_stack | tech_stack | text (JSON) | Technologies used |
| cybersecurity_posture | cybersecurity_posture | text | Security rating |
| partnership_ecosystem | partnership_ecosystem | text (JSON) | Strategic partners |
| tech_adoption_rating | tech_adoption_rating | text | Tech innovation rating |

---

## Data Type Conventions

### Text (JSON) Fields
These fields store JSON-encoded arrays or objects as text:
- `operating_countries`: `["India", "USA", "UK"]`
- `core_values`: `["Innovation", "Integrity", "Collaboration"]`
- `top_customers`: `["Acme Corp", "TechCo", "Global Ltd"]`
- `awards_recognitions`: `["Best Place to Work 2024", "Innovation Award"]`

**Parsing in Application:**
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

### Relationships
All related tables use `company_id` as a foreign key to maintain referential integrity:
```
companies (company_id) 
    ↓
company_business (company_id)
company_brand_reputation (company_id)
company_compensation (company_id)
company_culture (company_id)
company_financials (company_id)
company_logistics (company_id)
company_people (company_id)
company_talent_growth (company_id)
company_technologies (company_id)
```

---

## Data Integrity Checks

### Foreign Key Validation
Ensure every related table entry has a valid `company_id` that exists in the `companies` table.

### JSON Field Validation
Verify JSON-encoded fields:
1. Valid JSON syntax
2. Array format (not object)
3. String elements (not nested objects)

### Null Handling
All fields except PRIMARY KEYs can be null. The application safely handles null values:
- Displays "Not available" for missing data
- Doesn't break on null comparisons
- Skips rendering null fields

### Data Consistency
- Company types should match schema expectations
- Categories should be standardized
- URLs should be properly formatted
- Email addresses should be valid
- Phone numbers should be properly formatted

---

## Query Patterns

### Fetching Single Company with All Relations
```typescript
const company = await fetchCompanyById(1);
const business = await fetchCompanyBusiness(1);
const culture = await fetchCompanyCulture(1);
// ... fetch all related tables
```

**Better Approach:**
```typescript
const allData = await fetchCompanyWithAllRelations(1);
// Returns object with all related data
```

### Filtering Companies
```typescript
// By type
const products = await fetchCompaniesByType('Product');

// By category
const techCompanies = await fetchCompaniesByCategory('Technology');
```

### Analytics
```typescript
// Get distributions
const typeDistribution = await fetchCompanyTypeDistribution();
const categoryDistribution = await fetchCategoryDistribution();

// Use in charts
<PieChart data={typeDistribution} />
<BarChart data={categoryDistribution} />
```

---

## Testing Checklist

- [ ] All company records display correctly
- [ ] Related data loads for each company
- [ ] JSON-encoded arrays parse and display as tags
- [ ] Null fields don't cause rendering errors
- [ ] Filters work correctly (type, category, size)
- [ ] Analytics distributions calculate correctly
- [ ] Real-time updates work (check with live database changes)
- [ ] Loading states display during data fetch
- [ ] Error states handle gracefully
- [ ] Navigation between company detail pages works
- [ ] All 8 tabs display relevant data
- [ ] Contact information is visible and clickable
