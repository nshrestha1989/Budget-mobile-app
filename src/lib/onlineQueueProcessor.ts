// utils/onlineQueueProcessor.ts

import { createFamily } from "./API/familly/useSaveFamily";
import { clearOfflineQueue, getOfflineQueue } from "./offlineQueue";


export const processOfflineQueue = async () => {
  const queue = getOfflineQueue();
  for (const item of queue) {
    try {
      await createFamily(item.familyName);
    } catch (error) {
      // Handle error (e.g., retry later)
    }
  }
  clearOfflineQueue(); // Clear queue after processing
};
