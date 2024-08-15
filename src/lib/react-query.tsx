import {
  UseMutationOptions,
  DefaultOptions,
  QueryClient,
} from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import localforage from "localforage";
import { compress, decompress } from 'lz-string'
export const queryConfig = {
  queries: {
    throwOnError: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity,
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

const asyncLocalForageStoragePersister = createAsyncStoragePersister({
  storage: localforage,
  serialize: (data) => JSON.stringify(data),
    deserialize: (data) => JSON.parse(data),
});

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncLocalForageStoragePersister,
        maxAge: Infinity,
        hydrateOptions: {},
        dehydrateOptions: {
          shouldDehydrateQuery: ({ options }) => {
            return options.networkMode === "offlineFirst";
          },
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
