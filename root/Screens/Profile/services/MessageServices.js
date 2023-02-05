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

export const getMessagesGroup = async (accessToken, id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/chat/getGroupMessage",
      {
        groupid: id,
      },
      config
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessagess = async (accessToken, id, message, type) => {
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
        messageType: type,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const oneTimeOrder = async (
  accessToken,
  jobTitle,
  description,
  price,
  day
) => {
  console.log(price);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/orders/create/oneTime",
      {
        startupId: "63d82eef251166001f1dceb4",
        jobTitle: jobTitle,
        attachments: ["jbj.png"],
        description: description,
        totalPrice: price,
        deliveryTime: day,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const sendMessagessInGroup = async (accessToken, id, message, type) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/chat/sendGroupMessage",
      {
        groupid: id,
        msgcontent: message,
        messageType: type,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
