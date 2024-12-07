import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TIntialState {
  showAddUser: boolean;
}

const initialState: TIntialState = {
  showAddUser: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    toggleShowAddUser: (state) => {
      state.showAddUser = !state.showAddUser;
    },
  },
});

export const usersReducers = usersSlice.actions;

export default usersSlice.reducer;
