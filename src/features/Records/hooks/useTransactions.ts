import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import useFetchCollection, { database } from '@/lib/API/appwrite/appwrite';
import { Record } from '../types';
import { Query } from 'appwrite';


const {
  VITE_DATABASE_ID,
  VITE_TRANSACTION_COLLECTION_ID
} =import.meta.env;
export const fetchDocuments = async (): Promise<Record[]|undefined> => {


  let response= await useFetchCollection(
    VITE_DATABASE_ID!,
    VITE_TRANSACTION_COLLECTION_ID!,
    undefined, // Fetch all documents, no specific documentId
    "transactionDate", // Order by createdAt field
    "DESC", // Descending order
    "status=active", // Filter for active documents
    10, // Limit to 10 documents
    0 // No offset (start from the beginning)
  ) ;
//  let response = await database.listDocuments(
//   VITE_DATABASE_ID!,
//   VITE_TRANSACTION_COLLECTION_ID!,
//   [
//     Query.orderDesc('transactionDate'),
// ]
// );
console.log(response)
const documents = Array.isArray(response) ? response : response.documents;

  const record: Record[] = documents.map((doc: { $id: any; categories: any; transactionDate: any; description: any; amount: any; isIncome: any; accounts: any; }) => ({
    transactionId:doc.$id,
    categories: doc.categories, 
    transactionDate: doc.transactionDate, 
    description:doc.description,
    amount :doc.amount,
    isIncome:doc.isIncome ,
    accounts:doc.accounts

  }));

  return record;
};


export const getCategoriesQueryOptions = () => {
  return queryOptions<Record[] | undefined>({
    queryKey: ['transactions'],
    queryFn:()=> fetchDocuments(),
    // networkMode: "offlineFirst"
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
