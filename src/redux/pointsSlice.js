import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Constants for API request types
const TYPE_CUSTOMER = 'customers';
const TYPE_HISTORY = 'history';
// Base URL for API endpoints
const BASE_URL = 'http://localhost:3001';

/**
 * Fetch data from API based on the specified type.
 *
 * @param {string} type - The type of data to fetch, either 'customers' or 'history'.
 * @returns {Promise<Array>} - Returns an array of fetched data.
 * @throws Will throw an error if the fetch request is unsuccessful.
 */
async function fetchApi(type) {
  try {
    const response = await fetch(`${BASE_URL}/${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type}`);
    }
    const data = await response.json();
    if (type === TYPE_CUSTOMER) return data;

    const sortedData = data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    return sortedData;
  } catch (error) {
    throw new Error(`An error occurred while fetching ${type}: ${error.message}`);
  }
}

/**
 * Asynchronous thunk action to fetch customer and history data.
 *
 * This action fetches both customer and history data from the API 
 * and sets them in the redux state.
 */
export const fetchData = createAsyncThunk('points/fetchData', async () => {
  const data = { customers: [], history: [] };
  data.customers = await fetchApi(TYPE_CUSTOMER);
  data.history = await fetchApi(TYPE_HISTORY);
  return data;
});

/**
 * Redux slice for handling points related data.
 *
 * This slice contains reducers for managing state related to customers and their purchase history.
 */
const pointsSlice = createSlice({
  name: 'points',
  initialState: {
    customers: [],
    history: [],
    loading: true,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.customers = action.payload.customers;
        state.history = action.payload.history;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Exporting the reducer function for the points slice.
export default pointsSlice.reducer;
