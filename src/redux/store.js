import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from './pointsSlice';

/**
 * Configures and exports the store for the application.
 *
 * The store is configured using the @reduxjs/toolkit's configureStore method 
 * and the pointsReducer is added to manage the state of points-related data.
 */
export default configureStore({
  reducer: {
    points: pointsReducer,
  },
});
