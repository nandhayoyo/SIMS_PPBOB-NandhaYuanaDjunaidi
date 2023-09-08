import axios from "axios";
import { BASE_URL } from "../constants/variable";
import { parseCookies } from "nookies";

export const ProfileService = () => {
  const ProfileRequest = axios.create({
    baseURL: BASE_URL,
  });

  const cookies = parseCookies();

  const postLogin = async (email, password) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await ProfileRequest.post("/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  };

  const getProfile = async () => {
    const res = await ProfileRequest.get("/profile", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    return res.data;
  };

  const getBalance = async () => {
    const res = await ProfileRequest.get("/balance", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    return res.data;
  };

  const getService = async () => {
    const res = await ProfileRequest.get("/services", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    return res.data;
  };

  const getBanners = async () => {
    const res = await ProfileRequest.get("/banner", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    return res.data;
  };

  const getTransactionHistory = async (params) => {
    const res = await ProfileRequest.get("/transaction/history", {
      params: {
        offset: params.offset,
        limit: params.limit,
      },
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    return res.data;
  };

  const postTransaction = async (serviceCode) => {
    const formData = new FormData();
    formData.append("service_code", serviceCode);

    const res = await ProfileRequest.post("/transaction", formData, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  };

  const postTopup = async (topupAmount) => {
    const formData = new FormData();
    formData.append("top_up_amount", topupAmount);
    const res = await ProfileRequest.post("/topup", formData, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  };

  const putProfile = async (firtName, lastName) => {
    const formData = new FormData();
    formData.append("first_name", firtName);
    formData.append("last_name", lastName);

    const res = await ProfileRequest.put("/profile/update", formData, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  };

  const putProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await ProfileRequest.put("/profile/image", formData, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  };

  return {
    postLogin,
    getProfile,
    getBalance,
    getService,
    getBanners,
    getTransactionHistory,
    postTransaction,
    postTopup,
    putProfile,
    putProfileImage,
  };
};
