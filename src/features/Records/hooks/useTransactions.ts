import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { database } from '@/lib/API/appwrite/appwrite';
import { Record } from '../types';


const {
  VITE_DATABASE_ID,
  VITE_TRANSACTION_COLLECTION_ID
} =import.meta.env;
export const fetchCategories = async (): Promise<Record[]> => {
  const response = await database.listDocuments(
    VITE_DATABASE_ID!,
    VITE_TRANSACTION_COLLECTION_ID!
  );

  const families: Record[] = response.documents.map((doc) => ({
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
  return queryOptions<Record[] | undefined>({
    queryKey: ['transactions'],
    queryFn:()=> fetchCategories(),
    networkMode: "offlineFirst"
  });
};

export type UseCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useTrasactions = ({ queryConfig }: UseCategoriesOptions = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(),
    ...queryConfig,
  });
};
