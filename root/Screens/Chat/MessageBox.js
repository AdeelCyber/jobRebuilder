import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Context from "../../Context/Context";
import { Entypo, AntDesign } from "@expo/vector-icons";
import MyText from "../../Components/Text";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import moment from "moment";
import { sendMessagess } from "../Profile/services/MessageServices";
import { set } from "react-native-reanimated";
const MessageBox = ({
  route,
  messages,
  setMessages,
  id,
  userImg,
  userName,
}) => {
  const navigation = useNavigation();
  const { accessToken, socket } = useContext(CartProvider);
  const {
    theme: { colors },
  } = useContext(Context);

  const [message, setMessage] = useState("");
  const [msg, setmsg] = useState(messages);
  const sendMessage = async (message) => {
    //console.log(getusers);

    const res = await sendMessagess(accessToken, id, message);
    console.log(res.status);
    if (res.status == 200) {
      socket.emit("private message", {
        to: id,
        content: {
          msgcontent: message,
          messageType: "text",
        },
      });
    }
    //console.log(res.data);
  };
  const icon = () => (
      <Entypo name="dots-three-vertical" size={24} color="black" />
    ),
    Title = userName;

  // useEffect(() => {
  //   console.log(messages);
  socket.on("private message", (data) => {
    const { content, from } = data;
    // console.log(content);
    //console.log(from);

    let obj = {
      createdAt: Date.now(),
      text: content.msgcontent,
      user: {
        _id: "other",
      },
    };
    console.log(msg.length);
    console.log(msg);

    //console.log(obj);
    setmsg([...msg, obj]);
    console.log(
      "--------------------------------------------------------------------------------"
    );
    console.log(msg);

    //let tempmsg = [...messages.current];
    //console.log(tempmsg);
    // tempmsg.push(obj);
    // messages.current = tempmsg;
    // console.log(messages.current);
  });
  // }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, styles.shadow]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </View>
        {/* Text View in */}
        <View>
          <Image
            source={{ uri: userImg }}
            style={{ height: 46, width: 46, margin: 6 }}
          />
        </View>
        <View style={{ marginRight: 80 }}>
          <MyText
            style={{
              fontWeight: "700",
              fontSize: 14,
              marginRight: 49,
              color: colors.text,
            }}
          >
            {Title}
          </MyText>
          <MyText
            style={{
              fontWeight: "700",
              fontSize: 12,
              marginRight: 49,
              color: "#ACA9A9",
            }}
          >
            Online
          </MyText>
        </View>

        <View>{icon()}</View>
      </View>

      <FlatList
        data={msg}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            {item.user._id == "other" ? (
              <View>
                <View
                  style={{
                    height: 43,
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    backgroundColor: "#ecf0f1",
                    padding: 8,
                    marginTop: 10,
                    marginLeft: 18,
                    borderRadius: 10,
                    backgroundColor: "#FFF2F2",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "400",
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
                <Text
                  style={{
                    marginLeft: 20,
                    margin: 7,
                    fontSize: 8,
                    fontWeight: "400",
                    color: "#23232380",
                  }}
                >
                  {moment(item.createdAt).format("h:mm a")}
                </Text>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    height: 43,
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    backgroundColor: "#ecf0f1",
                    padding: 8,
                    marginTop: 10,
                    marginRight: 18,
                    borderRadius: 10,
                    backgroundColor: colors.Bluish,
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 11,
                      fontWeight: "400",
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
                <Text
                  style={{
                    marginRight: 20,
                    margin: 7,
                    fontSize: 8,
                    alignSelf: "flex-end",
                    fontWeight: "400",
                    color: "#23232380",
                  }}
                >
                  {moment(item.createdAt).format("h:mm a")}
                </Text>
              </View>
            )}
          </View>
        )}
      />

      <View style={{ height: 50, borderWidth: 0.3, borderColor: "#23232380" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            elevation: 5,
          }}
        >
          <MaterialCommunityIcons
            name="camera"
            style={{ margin: 14, marginRight: 5 }}
            size={25}
            color="#23232380"
          />
          <TextInput
            style={{ marginRight: 170, fontSize: 11, fontWeight: "400" }}
            placeholder="Type Message here"
            placeholderTextColor="#23232380"
            onChangeText={(message) => setMessage(message)}
            value={message}
          />
          <MaterialCommunityIcons
            name="send-circle"
            style={{ margin: 10, marginRight: 5 }}
            size={32}
            color={colors.Bluish}
            onPress={() => {
              var obj = {};
              (obj["createdAt"] = Date.now()),
                (obj["text"] = message),
                (obj["user"] = {
                  _id: "me",
                });

              setmsg([...msg, obj]);
              sendMessage(message);
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1.5,
          shadowRadius: 2,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Entypo
            name="attachment"
            style={{ marginTop: 10, marginLeft: 20 }}
            size={15}
            color="#23232380"
          />
          <MyText
            style={{
              color: "#23232380",
              fontSize: 11,
              margin: 10,
            }}
          >
            Attach Files
          </MyText>
        </View>

        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name="pluscircleo"
            style={{ marginTop: 10, marginLeft: 20 }}
            size={15}
            color="#23232380"
            onPress={() => {
              navigation.navigate("CustomOffer");
            }}
          />
          <MyText
            style={{
              color: "#23232380",
              fontSize: 11,
              margin: 10,
            }}
          >
            Create Order
          </MyText>
        </View>
      </View>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.5,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 10,
  },
});
