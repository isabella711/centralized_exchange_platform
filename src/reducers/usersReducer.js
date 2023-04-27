import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import { callExternalApi, getUserWallets } from "../api";

export const fetchSolBalance = createAsyncThunk(
  "sol/fetchSolBalance",
  async (address, type) => {
    const response = await callExternalApi(address, type);
    return response.data;
  }
);

export const fetchUserWallets = createAsyncThunk(
  "user/wallets",
  async (userId, dispatch) => {
    const response = await getUserWallets(userId);
    return response;
  }
);

const user = createSlice({
  name: "user",
  initialState: {
    loading: "idle",
    user: null,
    wallets: [],
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
    // useWallet(state, action) {
    //   state.wallets = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserWallets.fulfilled, (state, action) => {
      if (isFulfilled(action)) {
        state.wallets = action.payload.data;
      }
    });
  },
});

export const { usersLoading, userProfile, useWallet } = user.actions;

export default user.reducer;
