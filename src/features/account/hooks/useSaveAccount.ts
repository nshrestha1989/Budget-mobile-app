import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { MutationConfig } from '@/lib/react-query';
import { Account } from '../type';
import { database, ID } from '@/lib/API/appwrite/appwrite';
import { AccountFormInput } from '../component/AccountForm';

const {
  VITE_DATABASE_ID,
  VITE_ACCOUNT_COLLECTION_ID
} = import.meta.env;

export const createAccount = async (account: AccountFormInput): Promise<any> => {
  const response = await database.createDocument(
    VITE_DATABASE_ID!,
    VITE_ACCOUNT_COLLECTION_ID!,
    ID.unique(),
    account
  );
  return response; 
};

type UseSaveAccountOptions = {
  mutationConfig?: MutationConfig<typeof createAccount>;
};

export const useSaveAccount = ({ mutationConfig }: UseSaveAccountOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.refetchQueries({
        queryKey: ["accounts"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createAccount,
  });
};
