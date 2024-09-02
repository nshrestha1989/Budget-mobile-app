import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { database } from '@/lib/API/appwrite/appwrite';
import { Account } from '../type';


const {
  VITE_DATABASE_ID,
  VITE_ACCOUNT_COLLECTION_ID
} =import.meta.env;
export const fetchAccounts = async () => {
  const response = await database.listDocuments(
    VITE_DATABASE_ID!,
    VITE_ACCOUNT_COLLECTION_ID!,
    
  );


  const accounts: Account[] = response.documents.map((doc:any) => ({
    accountId: doc.$id, 
    users: doc.users,
    accountType:doc.accountType,
    initialBalance:doc.initialBalance,
    accountName:doc.accountName
  }));

  return accounts;
};


export const getAccountsQueryOptions = () => {
  return queryOptions<Account[] | undefined>({
    queryKey: ['accounts'],
    queryFn:()=> fetchAccounts(),
    networkMode: "offlineFirst"
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
