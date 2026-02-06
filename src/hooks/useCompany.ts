import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCompanies,
  fetchCompanyById,
  fetchCompanyBusiness,
  fetchCompanyBrandReputation,
  fetchCompanyCompensation,
  fetchCompanyCulture,
  fetchCompanyFinancials,
  fetchCompanyLogistics,
  fetchCompanyPeople,
  fetchCompanyTalentGrowth,
  fetchCompanyTechnologies,
  fetchCompanyTypeDistribution,
  fetchCategoryDistribution,
  fetchEmployeeSizeDistribution,
  fetchCompanyWithAllRelations,
  subscribeToCompanies,
  subscribeToCompany,
} from '@/services/companyService';
import type { Company } from '@/types/company';

// ==================== COMPANIES HOOK ====================

export const useCompanies = () => {
  const query = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for real-time updates
  });

  return {
    companies: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

// ==================== SINGLE COMPANY HOOK ====================

export const useCompany = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => (companyId ? fetchCompanyById(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  });

  return {
    company: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
};

// ==================== COMPANY WITH ALL RELATIONS HOOK ====================

export const useCompanyWithRelations = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-full', companyId],
    queryFn: () => (companyId ? fetchCompanyWithAllRelations(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  });

  return {
    data: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
};

// ==================== COMPANY BUSINESS HOOK ====================

export const useCompanyBusiness = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-business', companyId],
    queryFn: () => (companyId ? fetchCompanyBusiness(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    business: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== COMPANY BRAND REPUTATION HOOK ====================

export const useCompanyBrandReputation = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-brand', companyId],
    queryFn: () => (companyId ? fetchCompanyBrandReputation(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    brand: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== COMPANY COMPENSATION HOOK ====================

export const useCompanyCompensation = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-compensation', companyId],
    queryFn: () => (companyId ? fetchCompanyCompensation(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    compensation: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== COMPANY CULTURE HOOK ====================

export const useCompanyCulture = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-culture', companyId],
    queryFn: () => (companyId ? fetchCompanyCulture(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    culture: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== COMPANY FINANCIALS HOOK ====================

export const useCompanyFinancials = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-financials', companyId],
    queryFn: () => (companyId ? fetchCompanyFinancials(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    financials: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== COMPANY LOGISTICS HOOK ====================

export const useCompanyLogistics = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-logistics', companyId],
    queryFn: () => (companyId ? fetchCompanyLogistics(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    logistics: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== COMPANY PEOPLE HOOK ====================

export const useCompanyPeople = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-people', companyId],
    queryFn: () => (companyId ? fetchCompanyPeople(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    people: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== COMPANY TALENT GROWTH HOOK ====================

export const useCompanyTalentGrowth = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-talent', companyId],
    queryFn: () => (companyId ? fetchCompanyTalentGrowth(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    talent: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== COMPANY TECHNOLOGIES HOOK ====================

export const useCompanyTechnologies = (companyId: number | null | undefined) => {
  const query = useQuery({
    queryKey: ['company-technologies', companyId],
    queryFn: () => (companyId ? fetchCompanyTechnologies(companyId) : Promise.resolve(null)),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    technologies: query.data || null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== ANALYTICS HOOKS ====================

export const useCompanyTypeDistribution = () => {
  const query = useQuery({
    queryKey: ['company-type-distribution'],
    queryFn: fetchCompanyTypeDistribution,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    distribution: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
};

export const useCategoryDistribution = () => {
  const query = useQuery({
    queryKey: ['category-distribution'],
    queryFn: fetchCategoryDistribution,
    staleTime: 10 * 60 * 1000,
  });

  return {
    distribution: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
};

export const useEmployeeSizeDistribution = () => {
  const query = useQuery({
    queryKey: ['employee-size-distribution'],
    queryFn: fetchEmployeeSizeDistribution,
    staleTime: 10 * 60 * 1000,
  });

  return {
    distribution: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
  };
};

// ==================== REAL-TIME SUBSCRIPTION HOOK ====================

export const useCompaniesRealtime = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    
    // Initial fetch
    fetchCompanies()
      .then(data => {
        setCompanies(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });

    // Subscribe to real-time updates
    const subscription = subscribeToCompanies((updatedCompanies) => {
      setCompanies(updatedCompanies);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { companies, isLoading, error };
};

export const useCompanyRealtime = (companyId: number | null | undefined) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(!!companyId);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!companyId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Initial fetch
    fetchCompanyById(companyId)
      .then(data => {
        setCompany(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });

    // Subscribe to real-time updates
    const subscription = subscribeToCompany(companyId, (updatedCompany) => {
      setCompany(updatedCompany);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [companyId]);

  return { company, isLoading, error };
};
