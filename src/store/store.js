import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import loginReducer from "./slice/loginSlice";
import saldoReducer from "./slice/saldoSlice";
import serviceReducer from "./slice/serviceSlice";
import bannersReducer from "./slice/bannerSlice";
import historyReducer from "./slice/historySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    saldo: saldoReducer,
    service: serviceReducer,
    banners: bannersReducer,
    history: historyReducer,
  },
});

export default store;
