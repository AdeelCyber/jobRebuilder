import axios from "../../../http/axiosSet";
import CartProvider from "../../../Context/CartProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userLogin = async (email, password) => {
  try {
    const resp = axios.post("/auth/login", {
      email,
      password,
    });
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const createaccount = async (
  email,
  password,
  phoneNumber,
  name,
  role
) => {
  console.log(role);
  try {
    const resp = axios.post("/auth/signup", {
      email,
      password,
      phoneNumber,
      name,
      role,
      authType: "local",
    });
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const creategoogle = async (token, role) => {
  console.log(role);
  try {
    const resp = axios.post("/auth/google/mobile", {
      tokenId: token,
      role: role,
    });
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const createfacebook = async (data, role) => {
  try {
    const resp = axios.post("/auth/facebook/mobile", {
      id: data.id,
      role: role,
      email: data.email,
      name: data.first_name + data.last_name,
    });
    return resp;
  } catch (error) {
    return error.response;
  }
};
