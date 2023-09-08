import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileService } from "../../services/Profile";

const { getBalance } = ProfileService();
const initialState = {
  data: {
    balance: null,
  },
  status: "idle",
  error: null,
};

export const fetchBalance = createAsyncThunk("user/fetchBalance", async () => {
  const res = await getBalance();
  return res;
});

const saldoSlice = createSlice({
  name: "saldo",
  initialState,
  reducers: {
    // updateBalance(state, action) {
      
    // },
  },
  extraReducers: {
    [fetchBalance.pending]: (state) => {
      state.status = "loading";
    },
    [fetchBalance.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      
    },
    [fetchBalance.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const getSaldo = (state) => state.saldo.data;

export default saldoSlice.reducer;
