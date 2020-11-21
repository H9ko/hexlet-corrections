/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import Axios from 'axios';

const contactsAdapter = createEntityAdapter();

const apiUrl = 'http://localhost:8080/api/typos';
const getTypos = createAsyncThunk(
  'typos/get',
  async (setting, { rejectWithValue }) => {
    const { pageIndex, pageSize, sortBy } = setting;
    console.log('sortBy1111111111', sortBy);
    const { id, desc } = sortBy || {};


    const requestUrl = `${apiUrl}${`?page=${pageIndex}&size=${pageSize}`}${
      id ? `&sort=${id},${desc ? 'asc' : 'desc'}` : ''
    }`;


    try {
      const response = await Axios.get(requestUrl);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const initialState = contactsAdapter.getInitialState({
  totalPages: 0,
});
const typosSlice = createSlice({
  name: 'typos',
  initialState,
  reducers: {
    // setPageSize(state, { payload }) {
    //   return { ...state, pageSize: payload };
    // },
    // setPageSort(state, { payload }) {
    //   return { ...state, pageSort: payload };
    // },
    // setCurrentPage(state, { payload }) {
    //   return { ...state, currentPage: payload };
    // },
  },
  extraReducers: {
    [getTypos.fulfilled](state, { payload }) {
      console.log('payload', payload);
      const { content, totalPages } = payload;
      state.totalPages = totalPages;
      contactsAdapter.setAll(state, content);
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
const selectTotalPages = (state) => state.typos.totalPages;

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
  selectTotalPages,
};
