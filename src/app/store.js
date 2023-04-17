import { configureStore } from '@reduxjs/toolkit';
import followersReducer from '../features/followers/followersSlice';

export const store = configureStore({
  reducer: {
    followers: followersReducer,
  },
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
