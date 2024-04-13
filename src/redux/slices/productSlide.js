
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
};

export const productSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    resetSearch: (state) => {
      state.search = ''; 
    },
  },
});

export const { searchProduct, resetSearch } = productSlide.actions;

export default productSlide.reducer;
