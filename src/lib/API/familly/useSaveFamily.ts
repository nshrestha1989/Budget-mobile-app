import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { FamilyMember } from '@/types/family';
import { api } from '@/lib/api-client';
import { clearOfflineQueue } from '@/lib/offlineQueue';

// Function to create a family
export const createFamily = async (familyName: string): Promise<FamilyMember> => {
  const response = await api.post<FamilyMember>('/api/Families', { familyName });
  return response; // Ensure to return only the data part
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
      await queryClient.cancelQueries({ queryKey: ['families'] });

      const previousFamilies = queryClient.getQueryData<FamilyMember[]>(['families']);

      queryClient.setQueryData(['families'], (old: FamilyMember[] | undefined) => {
        if (!old) return [];
        return [...old, { familyName: variables } as FamilyMember];
      });

      return { previousFamilies };
    },
    onError: (error, variables, context: any) => {
      queryClient.setQueryData(['families'], context.previousFamilies);
    },
    onSuccess: async (data: FamilyMember, variables: Parameters<typeof createFamily>[0], context: any) => {
      queryClient.setQueryData(['families'], (old: FamilyMember[] | undefined) => {
        if (!old) return [data];
        return old.map(family => family.familyName === variables ? data : family);
      });

      queryClient.refetchQueries({ queryKey: ['families'] });

      clearOfflineQueue(); // Clear queue after successful creation

      mutationConfig?.onSuccess?.(data, variables, context);
    },
    ...mutationConfig,
  });
};
