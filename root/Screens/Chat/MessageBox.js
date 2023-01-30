import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Context from "../../Context/Context";
import { Entypo, AntDesign } from "@expo/vector-icons";
import MyText from "../../Components/Text";
import CustomHeader3 from "../../Components/CustomHeader3";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
const MessageBox = ({ route }) => {
  const navigation = useNavigation();
  const { accessToken } = useContext(CartProvider);
  const {
    theme: { colors },
  } = useContext(Context);

  const [getcondition, setcondition] = useState(true);

  const [messages, setMessages] = useState([]);
  const { id, userImg, userName } = route.params;
  const [convo, setconvo] = useState();
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`,
      },
    };

    axios
      .post(
        "https://stepdev.up.railway.app/chat/getMessages",
        {
          receiverid: id,
        },

        config
      )
      .then((res) => {
        console.log(res.data.messages);
        for (var i in convo) {
          console.log(convo[i].message.message);
        }
        setconvo(res.data.messages);
        for (var i in convo) {
          if (convo[i]?.display === "left") {
            setMessages([
              ...messages,
              {
                _id: convo[i].message._id,
                text: convo[i].message.message,
                createdAt: new Date(),
                user: {
                  _id: 2,
                },
              },
            ]);
          } else {
            setMessages([
              ...messages,
              {
                _id: convo[i].messages._id,
                text: convo[i].messages.message,
                createdAt: new Date(),
                user: {
                  _id: 1,
                },
              },
            ]);
          }
        }
        setcondition(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [getcondition]);

  const icon = () => (
      <Entypo name="dots-three-vertical" size={24} color="black" />
    ),
    Title = userName;

  useEffect(() => {}, [messages]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="camera"
            style={{ marginTop: 5, marginRight: 5 }}
            size={25}
            color="#23232380"
          />

          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color={colors.Bluish}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.Bluish,
          },
          left: {
            backgroundColor: "#FFF2F2",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
          left: {
            color: colors.text,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
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
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            backgroundColor: colors.white,
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
          styles.shadow,
        ]}
      >
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
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderAvatar={null}
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
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
});
