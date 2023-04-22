import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callExternalApi } from "../api";

export const fetchSolBalance = createAsyncThunk(
  "sol/fetchSolBalance",
  async (address, type) => {
    const response = await callExternalApi(address, type);
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
