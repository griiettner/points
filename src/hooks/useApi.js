import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/pointsSlice';

export function useApi() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.points);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return { loading };
};
