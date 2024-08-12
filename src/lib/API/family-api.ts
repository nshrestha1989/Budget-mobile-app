
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MutationConfig, QueryConfig } from '@/lib/react-query';
import { api } from '../api-client';

export interface Family {
  familyId: number;
  familyName: string;
}

type UseSaveFamilyOptions = {
  mutationConfig?: MutationConfig<typeof createFamily>;
};


export const fetchFamilies = async (): Promise<Family[]> => {
  const response = await api.get<Family[]>('/api/Families');
  return response;
};

export const createFamily = async (familyName: string): Promise<{ status: string }> => {
  const response = await api.post<{ status: string }>('/api/Families', { familyName });
  return response;
};

export const getFamiliesQueryOptions = () => {
  return queryOptions<Family[], Error>({
    queryKey: ['families'],
    queryFn: fetchFamilies,
  });
};

export const useSaveFamily = ({ mutationConfig }: UseSaveFamilyOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();
  
  return useMutation({
    onSuccess: (...args) => {
      queryClient.refetchQueries({ queryKey: ['families'] });
     onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createFamily,
  });
};

type UseFamiliesOptions = {
  queryConfig?: QueryConfig<typeof getFamiliesQueryOptions>;
};

export const useFamilies = ({ queryConfig }: UseFamiliesOptions = {}) => {
  return useQuery({
    ...getFamiliesQueryOptions(),
    ...queryConfig,
  });
};