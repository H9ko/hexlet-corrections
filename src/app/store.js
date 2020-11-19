import { configureStore } from '@reduxjs/toolkit';
import typosReducer from '../features/typos/typosSlice';

export default configureStore({
  reducer: {
    typos: typosReducer,
  },
});
