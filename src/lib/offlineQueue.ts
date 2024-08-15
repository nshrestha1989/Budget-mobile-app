// utils/offlineQueue.ts
const OFFLINE_QUEUE_KEY = 'offlineQueue';

export const getOfflineQueue = () => {
  const queue = localStorage.getItem(OFFLINE_QUEUE_KEY);
  return queue ? JSON.parse(queue) : [];
};

export const addToOfflineQueue = (item: any) => {
  const queue = getOfflineQueue();
  queue.push(item);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
};

export const clearOfflineQueue = () => {
  localStorage.removeItem(OFFLINE_QUEUE_KEY);
};
