import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TIntialState {
  showEditCategory: boolean;
  categoryToEdit: null | string;
}

const initialState:TIntialState = {
  showEditCategory: false,
  categoryToEdit: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    toggleShowEditCategory: (state) => {
      console.log('toggled')
      state.showEditCategory = !state.showEditCategory;
    },
    setCategoryToEdit: (state, action: PayloadAction<string>) => {
      state.categoryToEdit = action.payload;
    },
  },
});

export const categoriesReducers = categoriesSlice.actions;

export default categoriesSlice.reducer;
