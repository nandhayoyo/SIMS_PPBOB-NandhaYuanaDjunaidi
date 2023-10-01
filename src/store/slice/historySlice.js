import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProfileService } from "../../services/Profile";
import nookies from "nookies";
import { LIMIT_HISTORY, OFFSET_HISTORY } from "../../constants/variable";

const { getTransactionHistory } = ProfileService();
const initialState = {
  data: {
    offset: OFFSET_HISTORY,
    limit: LIMIT_HISTORY,
    records: [],
  },
  message: "",
  status: "idle",
};

export const fetchHistory = createAsyncThunk(
  "transaction/history",
  async (params) => {
    const res = await getTransactionHistory(params);
    return res;
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    incrementOffset: (state) => {
      state.data.offset += state.data.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },

  // extraReducers: {
  //   [fetchHistory.pending]: (state) => {
  //     state.status = "loading";
  //   },
  //   [fetchHistory.fulfilled]: (state, action) => {
  //     state.status = "succeeded";
  //     state.data = action.payload;
  //   },
  //   [fetchHistory.rejected]: (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  //   },
  // },
});

export const { incrementOffset } = historySlice.actions;
export const getHistory = (state) => state.history.data;

export default historySlice.reducer;
