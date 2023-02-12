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
  RefreshControl,
  TextInput,
  Pressable,
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
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getChats } from "../Profile/services/MessageServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Message = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const { accessToken, socket, setsocket } = useContext(CartProvider);

  const [getcondition, setcondition] = useState(true);
  const [chat, setchat] = useState();
  const [chat2, setchat2] = useState();

  const [getusers, setusers] = useState([]);
  const [getcolor, setcolor] = useState("red");
  const [search, setsearch] = useState(false);
  const [searching, setsearching] = useState();

  const onRefresh = async () => {
    try {
      const res = await getChats(accessToken);
      //console.log(res.data.chats);

      setchat(res.data.chats);
      setchat2(res.data.chats);
      res.data.chats.forEach((element) => {
        if (element.chatType === "group") {
          socket.emit("join-room", element.chatid);
        }
      });
      res.data.chats.forEach((e) =>
        getusers.forEach((e2) => {
          if (e.chatid === e2.userID) {
            setcolor("green");
          }
        })
      );

      setcondition(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // startsocket(accessToken);

    // startsocket(accessToken);
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected");
    });
    // to get session
    socket.on("session", (session) => {
      //  console.log(session);
    });
    // to get all users
    socket.on("users", (users) => {
      //console.log(users);
      setusers(users);
    });
    onRefresh();
  }, []);
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = chat2.filter((item) => {
        const itemData = item.chatname
          ? item.chatname.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setchat(newData);
    } else {
      setchat(chat2);
    }
  };
  const getReadStatus = async () => {
    let isRead = null;
    try {
      isRead = await AsyncStorage.getItem("@read");
    } catch (e) {
      console.log(e);
    }

    return isRead;
  };

  const setReadToFalse = async () => {
    try {
      await AsyncStorage.setItem("@read", JSON.stringify(false));
    } catch (e) {
      console.log(e);
    }
  };

  const [unRead, setUnRead] = useState(() => getReadStatus || false);

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
          <AntDesign
            name="search1"
            size={18}
            color="black"
            onPress={() => {
              setsearch(true);
            }}
          />
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
              navigation.navigate("CreateGroup");
            }}
          />
        </View>
      </View>
      {search && (
        <View style={styles.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ height: 30, width: 220, fontSize: 18 }}
            placeholder="Search..."
            onChangeText={(searching) => searchFilterFunction(searching)}
            value={searching}
          />
          <Icon
            name="cancel"
            size={20}
            onPress={() => {
              setsearch(false);
            }}
          />
        </View>
      )}
      {chat ? (
        <Container>
          <FlatList
            data={chat}
            extraData={chat}
            refreshing={getcondition}
            refreshControl={
              <RefreshControl refreshing={getcondition} onRefresh={onRefresh} />
            }
            keyExtractor={(item, index) => {
              return index.toString();
            }}
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
                    online: getcolor === "green" ? "online" : "offline",
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
                    source={{
                      uri: `https://stepdev.up.railway.app/media/getimage/${item.chatavatar}`,
                    }}
                  />
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 100,
                      marginLeft: 40,

                      backgroundColor: getcolor,
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
                    {item.lastMessage?.message.attachments ||
                    item.lastMessage?.message.equity
                      ? "Offer Message"
                      : item.lastMessage?.message.message}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Pressable
                    onPress={async () => {
                      await setReadToFalse();
                      setUnRead(false);
                    }}
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
                  </Pressable>
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
  inputContainer: {
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
