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
  id,
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
        clientId: id,
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

export const oneTimeOrderOfferStatus = async (accessToken, orderid, status) => {
  console.log(status);
  console.log(orderid);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.put(
      "/orders/oneTime/offerStatus",
      {
        orderId: orderid,
        OfferStatus: status,
      },
      config
    );
    console.log(resp);
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const equityOrder = async (
  accessToken,
  id,
  jobTitle,
  description,
  equity,
  pdf
) => {
  console.log(equity);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/orders/create/equity",
      {
        clientId: id,
        jobTitle: jobTitle,
        description: description,
        equity: equity,
        partnershipAgreement: pdf,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};

export const equityOrderOfferStatus = async (
  accessToken,
  startupid,
  position,
  equityid,
  status
) => {
  console.log(status);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    if (status === "Accepted") {
      const resp = axios.put(
        "/orders/equity/offerStatus",
        {
          startupId: startupid,
          position: position,
          orderId: equityid,
          offerStatus: status,
        },
        config
      );
      return resp;
    } else {
      const resp = axios.put(
        "/orders/equity/offerStatus",
        {
          orderId: equityid,
          offerStatus: status,
        },
        config
      );
      return resp;
    }
  } catch (error) {
    return error.response;
  }
};
export const equityOrderOfferStatusRej = async (
  accessToken,
  equityid,
  status
) => {
  console.log(status);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.put(
      "/orders/equity/offerStatus",
      {
        orderId: equityid,
        offerStatus: status,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
export const getChats = async (accessToken) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.get(
      "/chat/getChats",

      config
    );

    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const groupcreation = async (accessToken, grouptitle, members, logo) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${accessToken}`,
    },
  };
  try {
    const resp = axios.post(
      "/chat/createChatGroup",
      {
        groupName: grouptitle,
        members: members,
        avatar: logo,
      },
      config
    );
    return resp;
  } catch (error) {
    return error.response;
  }
};
