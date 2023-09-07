import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const TYPE_CUSTOMER = 'customers';
const TYPE_HISTORY = 'history';
const BASE_URL = 'http://localhost:3001';

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

export const fetchData = createAsyncThunk('points/fetchData', async () => {
  const data = { customers: [], history: [] };
  data.customers = await fetchApi(TYPE_CUSTOMER);
  data.history = await fetchApi(TYPE_HISTORY);
  return data;
});

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

export default pointsSlice.reducer;
