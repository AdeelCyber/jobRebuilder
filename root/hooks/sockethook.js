import React, { useContext, useState, useEffect, useCallback } from "react";
import CartProvider from "../Context/CartProvider";
import axios from "axios";

export default initializeSocket = () => {
  const { accessToken, socket } = useContext(CartProvider);
  const [getallChats, setallchats] = useState([]);
  const [getgroups, setgroups] = useState();
  const [getusers, setusers] = useState([]);

  useEffect(() => {
    // startsocket(accessToken);
    socket.connect();
    socket.on("connect", () => {
      // console.log("Connected");
    });
    // to get session
    socket.on("session", (session) => {
      //  console.log(session);
    });
    // to get all users
    socket.on("users", (users) => {
      console.log(users);
      setusers(users);
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`,
      },
    };

    axios
      .get(
        "https://stepdev.up.railway.app/chat/getChats",

        config
      )
      .then((res) => {
        console.log(res.data);
        setallchats(res.data.chats);
      })
      .catch((err) => {
        console.log("error", err);
      });

    axios
      .get(
        "https://stepdev.up.railway.app/chat/getAllGroups",

        config
      )
      .then((res) => {
        console.log(res.data);
        setgroups(res.data.groups);
        res.data.groups.map((group) => {
          socket.emit("join-group", group._id);
        });
        // setcondition(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return getallChats;
};
