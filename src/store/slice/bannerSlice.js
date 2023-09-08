// bannerSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileService } from "../../services/Profile";

const { getBanners } = ProfileService(); // Mengambil fungsi getBanners dari ProfileService

const initialState = {
  banners: [],
  status: "idle",
  error: null,
};

export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async () => {
    const response = await getBanners(); 
    return response.data;
  }
);

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectBanners = (state) => state.banners.banners;

export default bannersSlice.reducer;
