import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TIntialState {
  showEditCategory: boolean;
  categoryToEdit: null | string;
  showDeleteCategoryConfirmation: boolean;
  categoryToDelete: null | string;
  pendingDeleting: boolean;
}

const initialState: TIntialState = {
  showEditCategory: false,
  categoryToEdit: null,
  showDeleteCategoryConfirmation: false,
  categoryToDelete: null,
  pendingDeleting: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    toggleShowEditCategory: (state) => {
      state.showEditCategory = !state.showEditCategory;
    },
    setCategoryToEdit: (state, action: PayloadAction<string | null>) => {
      state.categoryToEdit = action.payload;
    },
    toggleDeleteCategoryConfirmation: (state) => {
      state.showDeleteCategoryConfirmation =
        !state.showDeleteCategoryConfirmation;
    },
    setCategoryToDelete: (state, action: PayloadAction<string | null>) => {
      state.categoryToDelete = action.payload;
    },
    togglePendingDeleting: (state) => {
      state.pendingDeleting = !state.pendingDeleting;
    },
  },
});

export const categoriesReducers = categoriesSlice.actions;

export default categoriesSlice.reducer;
