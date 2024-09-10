import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { MutationConfig } from '@/lib/react-query';

import { database, ID } from '@/lib/API/appwrite/appwrite';
import { TransactionFormInput } from '../component/RecordForm';

const {
  VITE_DATABASE_ID,
  VITE_TRANSACTION_COLLECTION_ID
} = import.meta.env;

export const createTranscation = async ({
   transcation,
  id
}: {
  transcation: TransactionFormInput;
  id?: string;
}): Promise<any> => {
  if (id) {
 
    const response = await database.updateDocument(
      VITE_DATABASE_ID!,
      VITE_TRANSACTION_COLLECTION_ID!,
      id,
      transcation
    );
    return response;
  }
  const response = await database.createDocument(
    VITE_DATABASE_ID!,
    VITE_TRANSACTION_COLLECTION_ID!,
    ID.unique(),
    transcation
  );
  return response; 
};

type UseSaveTransactionOptions = {
  mutationConfig?: MutationConfig<typeof createTranscation>;
};

export const useSaveTransaction = ({ mutationConfig }: UseSaveTransactionOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.refetchQueries({
        queryKey: ["transaction"],
      });
      queryClient.refetchQueries({
        queryKey: ["transactions"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createTranscation,
  });
};

export const deleteTranscation = async (id: string): Promise<any> => {
  const response = await database.deleteDocument(
    VITE_DATABASE_ID!,
    VITE_TRANSACTION_COLLECTION_ID!,
    id
  );
  return response; 
};

type UseDeleteTranscationOptions = {
  mutationConfig?: MutationConfig<typeof deleteTranscation>;
};
export const useDeleteTranscation = ({
  mutationConfig,
}: UseDeleteTranscationOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.refetchQueries({
        queryKey: ["transaction"],
      });
      queryClient.refetchQueries({
        queryKey: ["transactions"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteTranscation,
  });
};