/* eslint-disable no-param-reassign */
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import Axios from 'axios';

const contactsAdapter = createEntityAdapter();

const apiUrl = 'api/typos';
const getTypos = createAsyncThunk(
  'typos/get',
  async (setting, { getState, rejectWithValue }) => {
    console.log('setting', setting);

    const { pageSort, pageSize, currentPage } = setting;
    const requestUrl = `${apiUrl}${
      pageSort ? `?page=${currentPage}&size=${pageSize}&sort=${pageSort}` : ''
    }`;

    try {
      const response = await Axios.get(requestUrl);
      console.log('response', response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const initialState = contactsAdapter.getInitialState({
  pageSize: 5,
  pageSort: 'asc',
  currentPage: 0,
});
const typosSlice = createSlice({
  name: 'typos',
  initialState,
  reducers: {
    setPageSize(state, { payload }) {
      return { ...state, pageSize: payload };
    },
    setPageSort(state, { payload }) {
      return { ...state, pageSort: payload };
    },
    setCurrentPage(state, { payload }) {
      return { ...state, currentPage: payload };
    },
  },
  extraReducers: {
    [getTypos.fulfilled](state, { payload }) {
      console.log('payload', payload);
      contactsAdapter.setAll(state, payload);
    },
  },
});

export const { actions: actionsTypos } = typosSlice;
export const asyncActionsTypos = {
  getTypos,
};

export default typosSlice.reducer;

const { selectAll, selectById } = contactsAdapter.getSelectors(
  ({ typos }) => typos
);
const selectPageSize = (state) => state.typos.pageSize;
const selectPageSort = (state) => state.typos.pageSort;
const selectCurrrentPage = (state) => state.typos.currentPage;

// const filteredContacts = createSelector(
//   selectAll,
//   selectSearchText,
//   (typos, searchText) =>
//     typos.filter(({ name }) =>
//       name.toLowerCase().includes(searchText.toLowerCase())
//     )
// );

export const selectorTypos = {
  selectAll,
  selectPageSize,
  selectPageSort,
  selectCurrrentPage,
};
