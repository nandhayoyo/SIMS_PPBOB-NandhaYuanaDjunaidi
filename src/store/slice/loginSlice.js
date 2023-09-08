import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileService } from "../../services/Profile";
import nookies from "nookies";

const { postLogin: _postLogin } = ProfileService();
const initialState = {
  data: {
    status: null,
    message: "",
    data: { token: "" },
  },
  status: "idle",
  error: null,
};

export const userLogin = createAsyncThunk("user/login", async (data) => {
  const res = await _postLogin(data.email, data.password);
  const token = await res.data.token;
  nookies.set(undefined, "token", token, { path: "/" });

  return res;
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    statusReset(state, action) {
      state.status = "idle";
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.status = "loading";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const postLogin = (state) => state.login.data;

export const { statusReset } = loginSlice.actions;

export default loginSlice.reducer;
