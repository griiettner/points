import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/pointsSlice';

/**
 * useApi - Custom hook for fetching data via redux.
 * 
 * This hook initiates data fetching when the component using it is mounted.
 * It returns the current loading state for the fetched data.
 *
 * @returns {Object} - An object with the current loading state.
 *
 * @example
 * const { loading } = useApi();
 * if (loading) {
 *    return <LoadingComponent />;
 * }
 */
export function useApi() {
  const dispatch = useDispatch();
  
  // Extracting the loading state from the redux store
  const { loading } = useSelector((state) => state.points);

  // Dispatching fetchData action when the component is mounted
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return { loading };
};
