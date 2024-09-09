// src/hooks/useDeleteFamily.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { FamilyMember } from '../types';
import { database,ID } from '@/lib/API/appwrite/appwrite';

const {
  VITE_DATABASE_ID,
  VITE_FAMILIES_COLLECTION_ID
} =import.meta.env;

export const deleteFamily = async (id: string): Promise<any> => {
  const response = await database.deleteDocument(
    VITE_DATABASE_ID!,
    VITE_FAMILIES_COLLECTION_ID!,
    id
  );
  return response; 
};

type UseDeleteFamilyOptions = {
  mutationConfig?: MutationConfig<typeof deleteFamily>;
};

export const useDeleteFamily = ({ mutationConfig }: UseDeleteFamilyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFamily,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['families'] });

      const previousFamilies = queryClient.getQueryData<FamilyMember[]>(['families']);

      queryClient.setQueryData(['families'], (old: FamilyMember[] ) =>
        old ? old.filter(family => family.familyId !== id) : []
      );

      // Track offline actions
      const offlineActions = queryClient.getQueryData<{ id: string; action: 'create' | 'delete' }[]>(['offlineActions']) || [];
      queryClient.setQueryData(['offlineActions'], [...offlineActions, { id: id.toString(), action: 'delete' }]);

      return { previousFamilies, id };
    },
    onError: (error, id: string, context: any) => {
      queryClient.setQueryData(['families'], context.previousFamilies);
    },
    onSuccess: async (id: string, variables: string, context: any) => {
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
