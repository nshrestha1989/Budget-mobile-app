import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { database } from '@/lib/API/appwrite/appwrite';
import { Account } from '../type';


const {
  VITE_DATABASE_ID,
  VITE_ACCOUNT_COLLECTION_ID
} =import.meta.env;
export const fetchAccount = async (accountId:string) => {
  const response = await database.getDocument(
    VITE_DATABASE_ID!,
    VITE_ACCOUNT_COLLECTION_ID!,
    accountId
    
  );


  const doc = response; // Assuming `response` itself is the document

  const account: Account = {
    accountId: doc.$id,
    users: doc.users,
    AccountType:doc.AccountType,
    InitialBalance:doc.InitialBalance,
    AccountName:doc.AccountName
  };

  return account;

}
export const getAccountsQueryOptions = (accountId:string) => {
  return queryOptions<Account | undefined>({
    queryKey: ['account',accountId],
    queryFn:()=> fetchAccount(accountId),
    enabled: !!accountId
  });
};

export type UseAccountsOptions = {
  accountId: string;
  queryConfig?: QueryConfig<typeof getAccountsQueryOptions>;
};

export const useAccount = ({ accountId, queryConfig }: UseAccountsOptions ) => {
  return useQuery({
    ...getAccountsQueryOptions(accountId),
    ...queryConfig,
  });
};
