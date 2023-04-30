import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import {
  callExternalApi,
  getUserInfo,
  getUserWallets,
  getUserTransactions,
} from "../api";

export const fetchSolBalance = createAsyncThunk(
  "sol/fetchSolBalance",
  async (address, type) => {
    const response = await callExternalApi(address, type);
    return response.data;
  }
);

export const fetchUser = createAsyncThunk(
  "user/detail",
  async (userId, dispatch) => {
    const response = await getUserInfo(userId);
    return response;
  }
);

export const fetchTransactionHistory = createAsyncThunk(
  "user/transactions",
  async (userId, dispatch) => {
    const response = await getUserTransactions(userId);
    return response;
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
    balance: undefined,
    transactionHistory: [],
  },
  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === "idle") {
        state.loading = "pending";
      }
      // if (state.loading === "pending") {
      //   state.loading = "idle";
      // }
    },
    userProfile(state, action) {
      if (state.loading === "pending") {
        state.user = action.payload;
        state.loading = "idle";
      }
    },
    stopLoading(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
    },
    clearAll(state, action) {
      if (state.loading === "pending") {
        state.user = null;
        state.balance = undefined;
        state.wallets = [];
        state.transactionHistory = [];
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserWallets.fulfilled, (state, action) => {
      if (isFulfilled(action)) {
        state.wallets = action.payload.data;
        state.loading = "idle";
      }
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (isFulfilled(action)) {
        if (action.payload.data.user_balance != null)
          state.balance = action.payload.data.user_balance;
        state.loading = "idle";
      }
    });
    builder.addCase(fetchTransactionHistory.fulfilled, (state, action) => {
      if (isFulfilled(action)) {
        state.transactionHistory = action.payload.data;
        state.loading = "idle";
      }
    });
  },
});

export const { usersLoading, userProfile, useWallet, stopLoading, clearAll } =
  user.actions;
export const initialState = {
  loading: "idle",
  user: null,
  wallets: [],
  balance: undefined,
  transactionHistory: [],
};
export default user.reducer;
