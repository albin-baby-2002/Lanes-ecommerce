import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TIntialState {
  showAddUser: boolean;
  showEditUser: boolean;
  userToEdit: string | null;
  userToDelete: string | null;
  showDeleteConfirmation: boolean;
  pendingDeleting:boolean
}

const initialState: TIntialState = {
  showAddUser: false,
  showEditUser: false,
  userToEdit: null,
  userToDelete: null,
  showDeleteConfirmation: false,
  pendingDeleting:false
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    toggleShowAddUser: (state) => {
      state.showAddUser = !state.showAddUser;
    },

    setUserToEdit: (state, action: PayloadAction<string | null>) => {
      state.userToEdit = action.payload;
    },

    toggleShowEditUser: (state) => {
      state.showEditUser = !state.showEditUser;
    },

    setUserToDelete: (state, action: PayloadAction<string | null>) => {
      state.userToDelete = action.payload;
    },

    toggleShowDeleteConfirmation: (state) => {
      state.showDeleteConfirmation = !state.showDeleteConfirmation;
    },

    togglePendingDeleting: (state) => {
      state.pendingDeleting = !state.pendingDeleting;
    },
  },
});

export const usersReducers = usersSlice.actions;

export default usersSlice.reducer;
