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
import {
  getMessages,
  getMessagesGroup,
} from "../Profile/services/MessageServices";
import MessageBox from "./MessageBox";
import Loader from "../../Components/Loader";
import { useIsFocused } from "@react-navigation/native";

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
  const isFocused = useIsFocused();

  const { userdetails } = useContext(CartProvider);
  console.log( "USER DETAILS : ",userdetails)
  const { id, userImg, userName, chatType, members, online } =
    route.params != undefined ? route.params : {};

  const getMsg = async () => {
    if (chatType === "group") {
      const res = await getMessagesGroup(accessToken, id);
      // console.log(res.data.messages);
      setMessages(res.data.chat);
      // console.log(res.data.chat);
      // messages.current = res.data.messages;

      setcondition(false);
    } else {
      const res = await getMessages(accessToken, id);
      //  console.log(res.data.messages);
      setMessages(res.data.messages);
      //  console.log(res.data.messages);
      // messages.current = res.data.messages;

      setcondition(false);
    }
  };

  useEffect(() => {
    getMsg();
  }, [isFocused]);

  if (getcondition) {
    return (
      <Loader visible={getcondition} color="white" indicatorSize="large" />
    );
  }
  return (
    <MessageBox
      messages={messages}
      setMessages={setMessages}
      id={id}
      userImg={userImg}
      userName={userName}
      chatType={chatType}
      members={members}
      online={online}
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
