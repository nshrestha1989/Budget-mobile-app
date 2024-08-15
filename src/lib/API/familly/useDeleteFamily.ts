// src/hooks/useDeleteFamily.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { FamilyMember } from '@/types/family';
import { api } from '@/lib/api-client';

export const deleteFamily = async (id: number): Promise<number> => {
  await api.delete(`/api/Families/${id}`);
  return id;
};

type UseDeleteFamilyOptions = {
  mutationConfig?: MutationConfig<typeof deleteFamily>;
};

export const useDeleteFamily = ({ mutationConfig }: UseDeleteFamilyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFamily,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['families'] });

      const previousFamilies = queryClient.getQueryData<FamilyMember[]>(['families']);

      queryClient.setQueryData(['families'], (old: FamilyMember[] | undefined) =>
        old ? old.filter(family => family.familyId !== id) : []
      );

      // Track offline actions
      const offlineActions = queryClient.getQueryData<{ id: string; action: 'create' | 'delete' }[]>(['offlineActions']) || [];
      queryClient.setQueryData(['offlineActions'], [...offlineActions, { id: id.toString(), action: 'delete' }]);

      return { previousFamilies, id };
    },
    onError: (error, id: number, context: any) => {
      queryClient.setQueryData(['families'], context.previousFamilies);
    },
    onSuccess: async (id: number, variables: number, context: any) => {
      // Clear offline actions related to this family
      const offlineActions = queryClient.getQueryData<{ id: string; action: 'create' | 'delete' }[]>(['offlineActions']) || [];
      const updatedActions = offlineActions.filter(action => !(action.id === id.toString() && action.action === 'create'));
      queryClient.setQueryData(['offlineActions'], updatedActions);

      queryClient.refetchQueries({ queryKey: ['families'] });

      mutationConfig?.onSuccess?.(id, variables, context);
    },
    ...mutationConfig,
  });
};
