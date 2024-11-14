import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import useFetchCollection, { database } from '@/lib/API/appwrite/appwrite';
import { Category } from '../types';

const {
  VITE_DATABASE_ID,
  VITE_CATEGORIES_COLLECTION_ID
} =import.meta.env;
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await useFetchCollection(
    VITE_DATABASE_ID!,
    VITE_CATEGORIES_COLLECTION_ID!
  );
  const documents = Array.isArray(response) ? response : response.documents;
  const categories: Category[] = documents.map((doc: { $id: any; categoryname: any; }) => ({
    $id: doc.$id, 
    categoryname: doc.categoryname,  
  }));

  return categories;
};


export const getCategoriesQueryOptions = () => {
  return queryOptions<Category[] | undefined>({
    queryKey: ['cateogories'],
    queryFn:()=> fetchCategories(),
    // networkMode: "offlineFirst"
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
