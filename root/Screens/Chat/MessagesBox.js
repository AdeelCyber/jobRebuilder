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

import Context from "../../Context/Context";
import { Entypo, AntDesign } from "@expo/vector-icons";
import MyText from "../../Components/Text";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { getMessages } from "../Profile/services/MessageServices";
import MessageBox from "./MessageBox";

const MessagesBox = ({ route }) => {
  const navigation = useNavigation();
  const { accessToken, socket } = useContext(CartProvider);
  const {
    theme: { colors },
  } = useContext(Context);
  const [getcondition, setcondition] = useState(true);
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  //const messages = useRef();
  const [getusers, setusers] = useState([]);

  const { id, userImg, userName } = route.params;

  const getMsg = async () => {
    const res = await getMessages(accessToken, id);
    // console.log(res.data.messages);
    setMessages(res.data.messages);
    // messages.current = res.data.messages;

    setcondition(false);
  };

  useEffect(() => {
    getMsg();
  }, [getcondition]);
  useEffect(() => {
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
      // console.log(users);
      setusers(users);
    });
  }, []);

  // const sendMessage = async (message) => {
  //   //console.log(getusers);
  //   socket.emit("private message", {
  //     to: id,
  //     content: message,
  //   });
  //   const res = await sendMessagess(accessToken, id, message);
  //   //console.log(res.data);
  // };

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
    <MessageBox
      messages={messages}
      setMessages={setMessages}
      id={id}
      userImg={userImg}
      userName={userName}
    />
  );
};

export default MessagesBox;

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
