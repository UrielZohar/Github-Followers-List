import { configureStore } from '@reduxjs/toolkit';
import followersReducer from '../features/followers/followersSlice';

export const store = configureStore({
  reducer: {
    followers: followersReducer,
  },
});
