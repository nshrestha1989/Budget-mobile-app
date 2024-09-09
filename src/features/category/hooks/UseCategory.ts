import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { database } from '@/lib/API/appwrite/appwrite';
import { Category } from '../types';

const {
  VITE_DATABASE_ID,
  VITE_CATEGORIES_COLLECTION_ID
} =import.meta.env;
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await database.listDocuments(
    VITE_DATABASE_ID!,
    VITE_CATEGORIES_COLLECTION_ID!
  );

  const families: Category[] = response.documents.map((doc) => ({
    categoryId: doc.$id, 
    categoryname: doc.categoryname,  
  }));

  return families;
};


export const getCategoriesQueryOptions = () => {
  return queryOptions<Category[] | undefined>({
    queryKey: ['cateogories'],
    queryFn:()=> fetchCategories(),
    networkMode: "offlineFirst"
  });
};

export type UseCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useCategories = ({ queryConfig }: UseCategoriesOptions = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(),
    ...queryConfig,
  });
};
