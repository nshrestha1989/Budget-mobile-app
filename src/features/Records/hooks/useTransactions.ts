import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { database } from '@/lib/API/appwrite/appwrite';
import { Transaction } from '../types';


const {
  VITE_DATABASE_ID,
  VITE_TRANSACTION_COLLECTION_ID
} =import.meta.env;
export const fetchCategories = async (): Promise<Transaction[]> => {
  const response = await database.listDocuments(
    VITE_DATABASE_ID!,
    VITE_TRANSACTION_COLLECTION_ID!
  );

  const families: Transaction[] = response.documents.map((doc) => ({
    transactionId:doc.$id,
    categoryId: doc.categoryId, 
    transactionDate: doc.transactionDate, 
    description:doc.description,
    amount :doc.amount,
    isIncome:doc.isIncome 

  }));

  return families;
};


export const getCategoriesQueryOptions = () => {
  return queryOptions<Transaction[] | undefined>({
    queryKey: ['transactions'],
    queryFn:()=> fetchCategories(),
    networkMode: "offlineFirst"
  });
};

export type UseCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useTrasaction = ({ queryConfig }: UseCategoriesOptions = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(),
    ...queryConfig,
  });
};
