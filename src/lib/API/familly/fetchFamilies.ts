import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query'; // Ensure this matches your setup

import { FamilyMember } from '@/types/family';
import { api, ApiError } from '@/lib/api-client';

export const fetchFamilies = async (): Promise<FamilyMember[]> => {
    return  await api.get('/api/Families');
  };

export const getFamiliesQueryOptions = () => {
    return queryOptions<FamilyMember[] | undefined, ApiError>({
      queryKey: ["families"],
      queryFn: () => fetchFamilies(),
      networkMode: "offlineFirst",
    });
  };

export type UseFamiliesOptions = {
    queryConfig?: QueryConfig<typeof getFamiliesQueryOptions>;
  };

export const useFamilies = ({ queryConfig }: UseFamiliesOptions= {}) => {
    return useQuery({
      ...getFamiliesQueryOptions(),
      ...queryConfig,
    });
  };



  