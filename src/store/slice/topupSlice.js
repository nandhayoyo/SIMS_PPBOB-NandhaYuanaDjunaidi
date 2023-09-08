// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { ProfileService } from "../../services/Profile";

// const { postTopup } = ProfileService();
// const initialState = {
//   data: [],
//   status: "idle",
//   error: null,
// };

// export const fetchServices = createAsyncThunk(
//   "services/fetchServices",
//   async () => {
//     const response = await postTopup();
//     return response.data;
//   }
// );

// const serviceSlice = createSlice({
//   name: "service",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchServices.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = action.payload;
//       })
//       .addCase(fetchServices.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const getServices = (state) => state.service.data;

// export default serviceSlice.reducer;
