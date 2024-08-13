import { useQuery, useQueryClient, onlineManager } from '@tanstack/react-query';
import localforage from 'localforage';
import { createFamily } from '@/lib/API/familly/useSaveFamily';
import { FamilyMember } from '@/types/family';

export const useNetworkSync = () => {
  const queryClient = useQueryClient();

  // Define the query function
  const syncOfflineRequests = async () => {
    if (!onlineManager.isOnline()) return; // Do nothing if offline

    const offlineRequests: FamilyMember[] = (await localforage.getItem('offlineRequests')) || [];

    // Sync offline requests with server
    for (const request of offlineRequests) {
      try {
        await createFamily(request.familyName);
        // Optionally remove or mark the request as completed
      } catch (error) {
        console.error('Error syncing offline request:', error);
        // Optionally handle retry logic here
      }
    }

    // Clear offline data after successful sync
    await localforage.removeItem('offlineRequests');
  };

  // Use the useQuery hook with correct parameters
  useQuery({
    queryKey: ['syncOfflineRequests'], // Query Key
    queryFn: syncOfflineRequests,       // Query Function
    enabled: onlineManager.isOnline(),   // Only run when online
    refetchOnWindowFocus: false,         // Avoid refetching on window focus
    retry: false,                        // Prevent automatic retries
  });
};
