import { supabase } from '@/lib/supabase';
import type {
  Company,
  CompanyBusiness,
  CompanyBrandReputation,
  CompanyCompensation,
  CompanyCulture,
  CompanyFinancials,
  CompanyLogistics,
  CompanyPeople,
  CompanyTalentGrowth,
  CompanyTechnologies,
  CompanyTypeDistribution,
  CategoryDistribution,
  EmployeeSizeDistribution,
} from '@/types/company';

// ==================== COMPANIES ====================

export const fetchCompanies = async (): Promise<Company[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*');

  if (error) {
    console.error('Error fetching companies:', error);
    return [];
  }

  return data || [];
};

export const fetchCompanyById = async (companyId: number): Promise<Company | null> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching company ${companyId}:`, error);
    return null;
  }

  return data;
};

export const fetchCompaniesByCategory = async (category: string): Promise<Company[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error(`Error fetching companies by category ${category}:`, error);
    return [];
  }

  return data || [];
};

export const fetchCompaniesByType = async (companyType: string): Promise<Company[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('company_type', companyType);

  if (error) {
    console.error(`Error fetching companies by type ${companyType}:`, error);
    return [];
  }

  return data || [];
};

// ==================== COMPANY BUSINESS ====================

export const fetchCompanyBusiness = async (companyId: number): Promise<CompanyBusiness | null> => {
  const { data, error } = await supabase
    .from('company_business')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching business for company ${companyId}:`, error);
    return null;
  }

  return data;
};

// ==================== COMPANY BRAND REPUTATION ====================

export const fetchCompanyBrandReputation = async (companyId: number): Promise<CompanyBrandReputation | null> => {
  const { data, error } = await supabase
    .from('company_brand_reputation')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching brand reputation for company ${companyId}:`, error);
    return null;
  }

  return data;
};

// ==================== COMPANY COMPENSATION ====================

export const fetchCompanyCompensation = async (companyId: number): Promise<CompanyCompensation | null> => {
  const { data, error } = await supabase
    .from('company_compensation')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching compensation for company ${companyId}:`, error);
    return null;
  }

  return data;
};

// ==================== COMPANY CULTURE ====================

export const fetchCompanyCulture = async (companyId: number): Promise<CompanyCulture | null> => {
  const { data, error } = await supabase
    .from('company_culture')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching culture for company ${companyId}:`, error);
    return null;
  }

  return data;
};

// ==================== COMPANY FINANCIALS ====================

export const fetchCompanyFinancials = async (companyId: number): Promise<CompanyFinancials | null> => {
  const { data, error } = await supabase
    .from('company_financials')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching financials for company ${companyId}:`, error);
    return null;
  }

  return data;
};

// ==================== COMPANY LOGISTICS ====================

export const fetchCompanyLogistics = async (companyId: number): Promise<CompanyLogistics | null> => {
  const { data, error } = await supabase
    .from('company_logistics')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching logistics for company ${companyId}:`, error);
    return null;
  }

  return data;
};

// ==================== COMPANY PEOPLE ====================

export const fetchCompanyPeople = async (companyId: number): Promise<CompanyPeople | null> => {
  const { data, error } = await supabase
    .from('company_people')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching people for company ${companyId}:`, error);
    return null;
  }

  return data;
};

// ==================== COMPANY TALENT GROWTH ====================

export const fetchCompanyTalentGrowth = async (companyId: number): Promise<CompanyTalentGrowth | null> => {
  const { data, error } = await supabase
    .from('company_talent_growth')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching talent growth for company ${companyId}:`, error);
    return null;
  }

  return data;
};

// ==================== COMPANY TECHNOLOGIES ====================

export const fetchCompanyTechnologies = async (companyId: number): Promise<CompanyTechnologies | null> => {
  const { data, error } = await supabase
    .from('company_technologies')
    .select('*')
    .eq('company_id', companyId)
    .single();

  if (error) {
    console.error(`Error fetching technologies for company ${companyId}:`, error);
    return null;
  }

  return data;
};

// ==================== FETCH ALL RELATED DATA ====================

export const fetchCompanyWithAllRelations = async (companyId: number) => {
  const [
    company,
    business,
    brand,
    compensation,
    culture,
    financials,
    logistics,
    people,
    talent,
    technologies,
  ] = await Promise.all([
    fetchCompanyById(companyId),
    fetchCompanyBusiness(companyId),
    fetchCompanyBrandReputation(companyId),
    fetchCompanyCompensation(companyId),
    fetchCompanyCulture(companyId),
    fetchCompanyFinancials(companyId),
    fetchCompanyLogistics(companyId),
    fetchCompanyPeople(companyId),
    fetchCompanyTalentGrowth(companyId),
    fetchCompanyTechnologies(companyId),
  ]);

  return {
    company,
    business,
    brand,
    compensation,
    culture,
    financials,
    logistics,
    people,
    talent,
    technologies,
  };
};

// ==================== ANALYTICS / AGGREGATIONS ====================

export const fetchCompanyTypeDistribution = async (): Promise<CompanyTypeDistribution[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('company_type')
    .not('company_type', 'is', null);

  if (error) {
    console.error('Error fetching company type distribution:', error);
    return [];
  }

  const distribution: Record<string, number> = {};
  (data || []).forEach(item => {
    if (item.company_type) {
      distribution[item.company_type] = (distribution[item.company_type] || 0) + 1;
    }
  });

  return Object.entries(distribution).map(([company_type, count]) => ({
    company_type,
    count,
  }));
};

export const fetchCategoryDistribution = async (): Promise<CategoryDistribution[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('category')
    .not('category', 'is', null);

  if (error) {
    console.error('Error fetching category distribution:', error);
    return [];
  }

  const distribution: Record<string, number> = {};
  (data || []).forEach(item => {
    if (item.category) {
      distribution[item.category] = (distribution[item.category] || 0) + 1;
    }
  });

  return Object.entries(distribution).map(([category, count]) => ({
    category,
    count,
  }));
};

export const fetchEmployeeSizeDistribution = async (): Promise<EmployeeSizeDistribution[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('employee_size')
    .not('employee_size', 'is', null);

  if (error) {
    console.error('Error fetching employee size distribution:', error);
    return [];
  }

  const distribution: Record<string, number> = {};
  (data || []).forEach(item => {
    if (item.employee_size) {
      distribution[item.employee_size] = (distribution[item.employee_size] || 0) + 1;
    }
  });

  return Object.entries(distribution).map(([employee_size, count]) => ({
    employee_size,
    count,
  }));
};

// ==================== REAL-TIME SUBSCRIPTIONS ====================

export const subscribeToCompanies = (callback: (companies: Company[]) => void) => {
  const subscription = supabase
    .channel('companies')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'companies' }, () => {
      fetchCompanies().then(callback);
    })
    .subscribe();

  return subscription;
};

export const subscribeToCompany = (companyId: number, callback: (company: Company | null) => void) => {
  const subscription = supabase
    .channel(`company-${companyId}`)
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'companies', filter: `company_id=eq.${companyId}` },
      (payload) => {
        callback(payload.new as Company);
      }
    )
    .subscribe();

  return subscription;
};
