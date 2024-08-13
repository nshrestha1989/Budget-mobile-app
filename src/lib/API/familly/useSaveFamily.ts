import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { FamilyMember } from '@/types/family';
import { api } from '@/lib/api-client';

// Function to create a family
export const createFamily = async (familyName: string): Promise<FamilyMember> => {
  const response = await api.post<FamilyMember>('/api/Families', { familyName });
  return response; 
};

type UseSaveFamilyOptions = {
  mutationConfig?: MutationConfig<typeof createFamily>;
};

// Custom hook for saving a family with offline-first logic
export const useSaveFamily = ({ mutationConfig }: UseSaveFamilyOptions = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createFamily,
    onMutate: async (variables: Parameters<typeof createFamily>[0]) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['families'] });

      // Snapshot the previous value
      const previousFamilies = queryClient.getQueryData<FamilyMember[]>(['families']);

      // Optimistically update to the new value
      queryClient.setQueryData(['families'], (old: FamilyMember[] | undefined) => {
        if (!old) return [];
        return [...old, { familyName: variables } as FamilyMember];
      });

      // Return a context with the previous value
      return { previousFamilies };
    },
    onError: (error, variables, context: any) => {
      // Rollback on error
      queryClient.setQueryData(['families'], context.previousFamilies);
    },
    onSuccess: (data: FamilyMember, variables: Parameters<typeof createFamily>[0], context: any) => {
      // Update the cache with the new data
      queryClient.setQueryData(['families'], (old: FamilyMember[] | undefined) => {
        if (!old) return [data];
        return [...old, data];
      });

      // Optionally refetch relevant queries
      queryClient.refetchQueries({ queryKey: ['families'] });

      // Call any additional onSuccess callback from mutationConfig
      mutationConfig?.onSuccess?.(data, variables, context);
    },
    ...mutationConfig,
  });
};
