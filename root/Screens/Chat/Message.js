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
import { Container, Msgs } from "../../Components/MessageStyles";
import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import { io } from "socket.io-client";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { getmembers } from "../Profile/services/startupServices";
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
        console.log(res.data.chats);
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
      <View style={[styles.header, styles.shadow]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="search1" size={18} color="black" />
        </View>
        <View>
          <MyText style={{ fontWeight: "700", fontSize: 16 }}>Messages</MyText>
        </View>

        <View>
          <FontAwesome
            name="pencil-square-o"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("NewMessage");
            }}
          />
        </View>
      </View>
      {chat ? (
        <Container>
          <FlatList
            data={chat}
            extraData={chat}
            refreshing={getcondition}
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
                    chatType: item.chatType,
                    members: item.members,
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
                    {/* {item.lastMessage?.sender.name
                      ? item.lastMessage?.sender.name +
                        ": " +
                        item.lastMessage?.message.message
                    : */}
                    {item.lastMessage?.message.message}
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
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",

    backgroundColor: "white",

    padding: 6,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 10,
    marginBottom: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
});
