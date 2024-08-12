import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api-client';
import { FamilyMember, NewFamilyInput } from '../../../types/family';
import { MutationConfig } from '../../../lib/react-query';

export const deleteFamily = async (id: number): Promise<number> => {
    const response = await api.delete(`/api/families/${id}`); 
    return response; 
  };
  

type UseDeleteFamilyOptions = {
  mutationConfig?: MutationConfig<typeof deleteFamily>;
};


export const useDeleteFamily = ({
    mutationConfig,
  }: UseDeleteFamilyOptions) => {
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
      mutationFn: deleteFamily,
    });
  };
  