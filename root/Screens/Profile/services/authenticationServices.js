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
    });
    return resp;
  } catch (error) {
    return error.response;
  }
};
