import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId);
    return response.data;
  }
);

const user = createSlice({
  name: "users",
  initialState: {
    loading: "idle",
    users: [],
  },
  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    usersReceived(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.users = action.payload;
      }
    },
  },
});

export const { usersLoading, usersReceived } = user.actions;

export default user.reducer;
