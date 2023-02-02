import axios from "../../../http/axiosSet";

export const getMessages = async (accessToken, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/chat/getMessages",
      {
        receiverid: id,
      },
      config
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessagess = async (accessToken, id, message) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/chat/sendMessage",
      {
        receiverid: id,
        msgcontent: message,
        messageType: "text",
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
