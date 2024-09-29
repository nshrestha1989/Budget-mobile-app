import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { database } from '@/lib/API/appwrite/appwrite';
import { Record } from '../types';
import { Query } from 'appwrite';
import { useAccountStore } from '@/features/account/hooks/accountStore';


const {
  VITE_DATABASE_ID,
  VITE_TRANSACTION_COLLECTION_ID
} =import.meta.env;
export const fetchCategories = async (): Promise<Record[]|undefined> => {
  const selectedAccountIds = useAccountStore.getState().selectedAccountIds; // Get the selected account IDs from Zustand
 let response;
  if (selectedAccountIds.length === 0) {
    // If no account is selected, fetch all records (no query applied)
    response = await database.listDocuments(
      VITE_DATABASE_ID!,
      VITE_TRANSACTION_COLLECTION_ID!
    );
  } else if (selectedAccountIds.length === 1) {
    // If only one account is selected, query for that account
    response = await database.listDocuments(
      VITE_DATABASE_ID!,
      VITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("accounts", [selectedAccountIds[0]])]
    );
  }else {
    // If multiple accounts are selected, query for all selected accounts
    response = await database.listDocuments(
      VITE_DATABASE_ID!,
      VITE_TRANSACTION_COLLECTION_ID!,
      [Query.equal("accounts", selectedAccountIds)]
    );
  }
  const families: Record[] = response.documents.map((doc) => ({
    transactionId:doc.$id,
    categories: doc.categories, 
    transactionDate: doc.transactionDate, 
    description:doc.description,
    amount :doc.amount,
    isIncome:doc.isIncome ,
    accounts:doc.accounts

  }));


  return families;
};


export const getCategoriesQueryOptions = () => {
  return queryOptions<Record[] | undefined>({
    queryKey: ['transactions'],
    queryFn:()=> fetchCategories(),
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
