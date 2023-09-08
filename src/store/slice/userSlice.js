import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileService } from "../../services/Profile";

const { getProfile, putProfile, putProfileImage } = ProfileService();
const initialState = {
  data: { email: "", first_name: "", last_name: "", profile_image: "" },
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await getProfile();
  return res;
});

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  const res = await putProfile(data.first_name, data.last_name);

  return res;
});

export const updateUserImage = createAsyncThunk(
  "user/updateUserImage",
  async (file) => {
    const res = await putProfileImage(file);
    return res;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateUser.pending]: (state) => {
      state.status = "loading";
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateUserImage.pending]: (state) => {
      state.status = "loading";
    },
    [updateUserImage.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    [updateUserImage.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const getUser = (state) => state.user.data;

export default userSlice.reducer;
