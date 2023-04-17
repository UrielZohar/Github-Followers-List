import { configureStore } from '@reduxjs/toolkit';
import followersReducer from '../features/followers/followersSlice';
import { followerslistenerMiddleware } from '../features/followers/followersMiddleware';

export const store = configureStore({
  reducer: {
    followers: followersReducer,
  },
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(followerslistenerMiddleware.middleware),
});
