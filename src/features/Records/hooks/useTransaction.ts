import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { database } from '@/lib/API/appwrite/appwrite';
import { Record } from '../types';


const {
  VITE_DATABASE_ID,
  VITE_TRANSACTION_COLLECTION_ID
} =import.meta.env;
export const fetchTransaction = async (accountId:string) => {
  const response = await database.getDocument(
    VITE_DATABASE_ID!,
    VITE_TRANSACTION_COLLECTION_ID!,
    accountId
    
  );


  const doc = response; 


  const record: Record = {
    transactionId:doc.$id,
    categoryId: doc.categoryId, 
    transactionDate: doc.transactionDate, 
    description:doc.description,
    amount :doc.amount,
    isIncome:doc.isIncome 

  };

  return record;

}
export const getTransactionQueryOptions = (transactionId:string) => {
  return queryOptions<Record | undefined>({
    queryKey: ['transaction',transactionId],
    queryFn:()=> fetchTransaction(transactionId),
    enabled: !!transactionId
  });
};

export type UseAccountsOptions = {
  transactionId: string;
  queryConfig?: QueryConfig<typeof getTransactionQueryOptions>;
};

export const useTrasaction = ({ transactionId, queryConfig }: UseAccountsOptions ) => {
  return useQuery({
    ...getTransactionQueryOptions(transactionId),
    ...queryConfig,
  });
};
