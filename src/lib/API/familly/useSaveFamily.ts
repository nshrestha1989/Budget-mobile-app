import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/react-query'; // Ensure this matches your setup
import { FamilyMember, NewFamilyInput } from '@/types/family';
import { api } from '@/lib/api-client';


export const createFamily = async (familyName: string): Promise<FamilyMember> => {
    const response = await api.post<FamilyMember>('/api/Families', { familyName }); 
    return response; 
  };
  

type UseSaveFamilyOptions = {
  mutationConfig?: MutationConfig<typeof createFamily>;
};


export const useSaveFamily = ({
    mutationConfig,
  }: UseSaveFamilyOptions) => {
    const { onSuccess, ...restConfig } = mutationConfig || {};
    const queryClient = useQueryClient();
    return useMutation({
      onSuccess: (...args) => {
        queryClient.refetchQueries({
          queryKey: ["families"],
        });
        onSuccess?.(...args);
      },
      ...restConfig,
      mutationFn: createFamily,
    });
  };
  