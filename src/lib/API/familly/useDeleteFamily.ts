import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api-client';
import { FamilyMember } from '../../../types/family';
import { MutationConfig } from '../../../lib/react-query';

// Function to delete a family
export const deleteFamily = async (id: number): Promise<number> => {
  await api.delete(`/api/families/${id}`);
  return id; // Return the id of the deleted family
};

type UseDeleteFamilyOptions = {
  mutationConfig?: MutationConfig<typeof deleteFamily>;
};

// Custom hook for deleting a family with offline-first logic
export const useDeleteFamily = ({
  mutationConfig,
}: UseDeleteFamilyOptions) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFamily,
    onMutate: async (id: number) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['families'] });

      // Snapshot the previous value
      const previousFamilies = queryClient.getQueryData<FamilyMember[]>(['families']);

      // Optimistically update to the new value
      queryClient.setQueryData(['families'], (old: FamilyMember[] | undefined) => 
        old?.filter(family => family.familyId !== id) || []
      );

      // Return a context with the previous value
      return { previousFamilies };
    },
    onError: (error, id: number, context: any) => {
      // Rollback on error
      queryClient.setQueryData(['families'], context.previousFamilies);
      onError?.(error, id, context);
    },
    onSuccess: (id: number, variables: number, context: any) => {
      // Optionally refetch relevant queries
      queryClient.refetchQueries({ queryKey: ['families'] });

      // Call any additional onSuccess callback from mutationConfig
      onSuccess?.(id, variables, context);
    },
    ...restConfig,
  });
};
