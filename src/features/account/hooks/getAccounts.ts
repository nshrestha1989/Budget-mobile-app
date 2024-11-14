import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MutationConfig, QueryConfig } from '@/lib/react-query';
import useFetchCollection, { database } from '@/lib/API/appwrite/appwrite';
import { Account } from '../type';



const {
  VITE_DATABASE_ID,
  VITE_ACCOUNT_COLLECTION_ID
} =import.meta.env;
export const fetchAccounts = async () => {
  const response =   await useFetchCollection(
    VITE_DATABASE_ID!,
    VITE_ACCOUNT_COLLECTION_ID!,
    
  );

  const documents = Array.isArray(response) ? response : response.documents;

  const accounts: Account[] = documents.map((doc:any) => ({
    $id: doc.$id, 
    users: doc.users,
    AccountType:doc.AccountType,
    InitialBalance:doc.InitialBalance,
    AccountName:doc.AccountName
  }));

  return accounts;
};


export const getAccountsQueryOptions = () => {
  return queryOptions<Account[] | undefined>({
    queryKey: ['accounts'],
    queryFn:()=> fetchAccounts(),
    // networkMode: "offlineFirst"

  });
};

export type UseAccountsOptions = {
  queryConfig?: QueryConfig<typeof getAccountsQueryOptions>;
};

export const useAccounts = ({ queryConfig }: UseAccountsOptions = {}) => {
  return useQuery({
    ...getAccountsQueryOptions(),
    ...queryConfig,
  });
};



