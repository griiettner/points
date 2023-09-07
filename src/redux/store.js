import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from './pointsSlice';

export default configureStore({
  reducer: {
    points: pointsReducer,
  },
});