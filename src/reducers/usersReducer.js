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
  name: "user",
  initialState: {
    loading: "idle",
    user: null,
  },
  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    userProfile(state, action) {
      // if (state.loading === "pending") {
      // state.loading = "idle";
      state.user = action.payload;
      // }
    },
  },
});

export const { usersLoading, userProfile } = user.actions;

export default user.reducer;
