import React, { useContext, useState, useEffect } from "react";
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
} from "react-native";
import { Container, Msgs } from "../../Components/MessageStyles";
import Context from "../../Context/Context";
import LittleNav from "../../Components/LittleNav";
import CustomHeader4 from "../../Components/CustomHeader4";
import { Messages } from "../../Components/Msg";
import MyText from "../../Components/Text";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import moment from "moment";
import { getChats } from "../Profile/services/MessageServices";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";

const CreateGroup = ({ navigation }) => {
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
    const res = await getChats(accessToken);
    // console.log(res.data.chats);

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
  };

  useEffect(() => {
    // startsocket(accessToken);

    // startsocket(accessToken);
    socket.connect();
    socket.on("connect", () => {
      //console.log("Connected");
    });
    // to get session
    socket.on("session", (session) => {
      // console.log(session);
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
      <CustomHeader4
        icon1={() => {
          return (
            <AntDesign
              name="search1"
              size={24}
              color="black"
              onPress={() => {
                setsearch(true);
              }}
            />
          );
        }}
        nav={navigation}
      />
      <View
        style={{ alignSelf: "flex-start", flexDirection: "row", margin: 20 }}
      >
        <View
          style={{
            height: 39,
            width: 39,
            borderRadius: 50,
            backgroundColor: colors.Bluish,
          }}
        >
          <FontAwesome
            name="group"
            size={16}
            color={colors.white}
            style={{ margin: 10 }}
            onPress={() => {
              navigation.navigate("CreatingGroup");
            }}
          />
        </View>
        <MyText
          style={{
            fontWeight: "500",
            fontSize: 14,
            marginLeft: 20,
            margin: 10,
          }}
        >
          Create New Group
        </MyText>
      </View>
      <View style={{ alignSelf: "flex-start" }}>
        <MyText
          style={{
            fontWeight: "700",
            fontSize: 16,
            marginLeft: 20,
            margin: 10,
          }}
        >
          Other Groups & Messages
        </MyText>
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
                  style={{ flexDirection: "column", justifyContent: "center" }}
                >
                  {/* <Msgs style={{ marginLeft: 20, marginBottom: 5 }}>2</Msgs> */}

                  <MyText
                    style={{
                      fontWeight: "500",
                      fontSize: 9,
                      color: "#23232380",
                      marginTop: 17,
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

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
