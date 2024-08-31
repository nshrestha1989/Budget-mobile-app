import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { database } from '@/lib/API/appwrite/appwrite';
import { FamilyMember } from '../types';

const {
  VITE_DATABASE_ID,
  VITE_FAMILIES_COLLECTION_ID
} =import.meta.env;
export const fetchFamilies = async (): Promise<FamilyMember[]> => {
  const response = await database.listDocuments(
    VITE_DATABASE_ID!,
    VITE_FAMILIES_COLLECTION_ID!
  );

  // Map the documents to match FamilyMember type
  const families: FamilyMember[] = response.documents.map((doc) => ({
    familyId: doc.$id, // assuming FamilyMember has a 'name' field
    familyName: doc.familyName,   // and an 'age' field for example
  }));

  return families;
};


export const getFamiliesQueryOptions = () => {
  return queryOptions<FamilyMember[] | undefined>({
    queryKey: ['families'],
    queryFn:()=> fetchFamilies(),
    networkMode: "offlineFirst"
  });
};

export type UseFamiliesOptions = {
  queryConfig?: QueryConfig<typeof getFamiliesQueryOptions>;
};

export const useFamilies = ({ queryConfig }: UseFamiliesOptions = {}) => {
  return useQuery({
    ...getFamiliesQueryOptions(),
    ...queryConfig,
  });
};
