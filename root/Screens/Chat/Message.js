import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
  Msgs,
  Circle,
} from "../../Components/MessageStyles";
import Context from "../../Context/Context";
import LittleNav from "../../Components/LittleNav";
import CustomHeader3 from "../../Components/CustomHeader3";
import { Messages } from "../../Components/Msg";
import MyText from "../../Components/Text";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import { io } from "socket.io-client";

import moment from "moment";
const Message = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const { accessToken, socket, setsocket } = useContext(CartProvider);

  const [getcondition, setcondition] = useState(true);
  const [chat, setchat] = useState();
  const startsocket = useCallback(
    (accessToken) => {
      setsocket(
        io("https://stepdev.up.railway.app", {
          autoConnect: false,
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      );
    },
    [socket]
  );

  useEffect(() => {
    startsocket(accessToken);
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
        //console.log(res.data);
        setchat(res.data.chats);

        setcondition(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [getcondition]);

  if (getcondition) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 30,
        }}
      >
        <ActivityIndicator animating={true} color={colors.Bluish} />

        <MyText>Loading..</MyText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader3 />
      {chat ? (
        <Container>
          <FlatList
            data={chat}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderColor: "#9DD0FF66",
                  marginBottom: 10,
                }}
                onPress={() =>
                  navigation.navigate("MessagesBox", {
                    id: item.chatid,
                    userImg: item.chatavatar,
                    userName: item.chatname,
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{
                      height: 51,
                      width: 51,
                      borderRadius: 50,
                      alignItems: "center",
                    }}
                    source={{ uri: item.chatavatar }}
                  />
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 50,
                      marginLeft: 40,

                      backgroundColor: colors.red,
                      alignSelf: "flex-end",
                      position: "absolute",
                      bottom: 19,
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    margin: 10,
                    width: 210,
                    height: 50,
                    marginRight: 40,
                  }}
                >
                  <MyText style={{ fontWeight: "700", fontSize: 14 }}>
                    {item.chatname}
                  </MyText>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 13,
                      color: "#23232380",
                    }}
                    numberOfLines={2}
                  >
                    {item.lastMessage?.sender.name
                      ? item.lastMessage?.sender.name +
                        ": " +
                        item.lastMessage?.message.message
                      : item.lastMessage?.message.message}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "column", justifyContent: "center" }}
                >
                  <Msgs style={{ marginLeft: 20, marginBottom: 5 }}>2</Msgs>

                  <MyText
                    style={{
                      fontWeight: "500",
                      fontSize: 9,
                      color: "#23232380",
                    }}
                  >
                    {moment(item.date).format("h:mm a")}
                  </MyText>
                </View>
              </TouchableOpacity>
            )}
          />
        </Container>
      ) : (
        <View>
          <Text> No chats here</Text>
        </View>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
