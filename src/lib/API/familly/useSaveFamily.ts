// src/hooks/useSaveFamily.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { MutationConfig } from '@/lib/react-query';
import { FamilyMember } from '@/types/family';
import { api } from '@/lib/api-client';

export const createFamily = async (familyName: string): Promise<FamilyMember> => {
  const response = await api.post<FamilyMember>('/api/Families', { familyName });
  return response; // Ensure to return only the data part
};

type UseSaveFamilyOptions = {
  mutationConfig?: MutationConfig<typeof createFamily>;
};

export const useSaveFamily = ({ mutationConfig }: UseSaveFamilyOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFamily,
    onMutate: async (familyName: string) => {
      await queryClient.cancelQueries({ queryKey: ['families'] });

      const previousFamilies = queryClient.getQueryData<FamilyMember[]>(['families']);

      const temporaryId = uuidv4();
      const newFamily = { familyId: temporaryId, familyName };

      queryClient.setQueryData(['families'], (old: FamilyMember[] | undefined) => {
        if (!old) return [];
        return [...old, newFamily];
      });

      // Track offline actions
      const offlineActions = queryClient.getQueryData<{ id: string; action: 'create' | 'delete' }[]>(['offlineActions']) || [];
      queryClient.setQueryData(['offlineActions'], [...offlineActions, { id: temporaryId, action: 'create' }]);

      return { previousFamilies, temporaryId };
    },
    onError: (error, familyName, context: any) => {
      queryClient.setQueryData(['families'], context.previousFamilies);
    },
    onSuccess: async (data: FamilyMember, familyName: string, context: any) => {
      queryClient.setQueryData(['families'], (old: FamilyMember[] | undefined) => {
        if (!old) return [data];
        return old.map(family => family.familyId === context.temporaryId ? data : family);
      });

      queryClient.refetchQueries({ queryKey: ['families'] });

      // Clear offline actions related to this family
      const offlineActions = queryClient.getQueryData<{ id: string; action: 'create' | 'delete' }[]>(['offlineActions']) || [];
      const updatedActions = offlineActions.filter(action => !(action.id === context.temporaryId && action.action === 'delete'));
      queryClient.setQueryData(['offlineActions'], updatedActions);

      mutationConfig?.onSuccess?.(data, familyName, context);
    },
    ...mutationConfig,
  });
};
