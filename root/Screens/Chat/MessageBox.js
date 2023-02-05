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
import {
  sendMessagess,
  sendMessagessInGroup,
} from "../Profile/services/MessageServices";
import { set } from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { fileUpload, imageUpload } from "../Profile/services/fileServices";
import * as DocumentPicker from "expo-document-picker";
import PDFReader from "rn-pdf-reader-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessageBox = ({
  route,
  messages,
  setMessages,
  id,
  userImg,
  chatType,
  userName,
  members,
}) => {
  const navigation = useNavigation();
  const { accessToken, socket } = useContext(CartProvider);
  const {
    theme: { colors },
  } = useContext(Context);
  const [type, settype] = useState();
  const [getmedia, setmedia] = useState(false);

  const [message, setMessage] = useState("");
  const [msg, setmsg] = useState(messages);
  const [mediatype, setmediatype] = useState();
  const [imgcontent, setimgcontent] = useState();
  const [doc, setdoc] = useState();
  const [docinfo, setdocinfo] = useState();

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
    });
    //console.log(result);

    if (!result.canceled) {
      setmedia(result.assets[0].uri);
      setmediatype(result.assets[0].type);
      const img = await imageUpload(result.assets[0].uri);
      setimgcontent(JSON.parse(img.body));
      if (chatType === "group") {
        var obj = {};
        (obj["createdAt"] = Date.now()),
          (obj["image"] = getmedia),
          (obj["message"] = imgcontent.filename),
          (obj["user"] = {
            _id: "me",
          });

        setmsg([...msg, obj]);
        sendMessage(imgcontent.filename, mediatype);
      } else {
        var obj = {};
        (obj["createdAt"] = Date.now()),
          (obj["image"] = getmedia),
          (obj["text"] = imgcontent.filename),
          (obj["user"] = {
            _id: "me",
          });

        setmsg([...msg, obj]);
        sendMessage(imgcontent.filename, mediatype);
      }

      // console.log(file.uri)
      //console.log(data);
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    setdoc(result.uri);
    const pdf = await fileUpload(result.uri);
    setdocinfo(JSON.parse(pdf.body));

    var obj = {};
    (obj["createdAt"] = Date.now()),
      (obj["file"] = "file"),
      (obj["text"] = docinfo.filename),
      (obj["user"] = {
        _id: "me",
      });

    setmsg([...msg, obj]);
    sendMessage(docinfo.filename, "file");
  };

  const sendMessage = async (message, type) => {
    console.log(type);
    console.log(message);
    console.log(id);

    if (chatType === "group") {
      const res = await sendMessagessInGroup(accessToken, id, message, type);
      console.log(res);
      if (res.status == 201) {
        socket.emit("private message", {
          to: id,
          content: {
            msgcontent: message,
            messageType: type,
          },
        });
      }
    } else {
      const res = await sendMessagess(accessToken, id, message, type);
      console.log(res.status);
      if (res.status == 200) {
        socket.emit("private message", {
          to: id,
          content: {
            msgcontent: message,
            messageType: type,
          },
        });
      }
    }
    //console.log(res.data);
  };
  useEffect(() => {
    console.log(chatType);
  }, []);

  // const retrieveData = async () => {
  //   try {
  //     const order1 = await AsyncStorage.getItem("@order");
  //     const order2 = JSON.parse(order1);

  //     if (order2 !== null) {
  //       console.log("order", order2);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
            style={{ height: 46, width: 46, margin: 6, borderRadius: 50 }}
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
          {chatType === "group" ? (
            <FlatList
              data={members}
              keyExtractor={(item) => item.id}
              horizontal={true}
              style={{ alignSelf: "flex-start" }}
              renderItem={({ item }) => (
                <View style={{ marginTop: 5 }}>
                  <Image
                    style={{ width: 24, height: 24, borderRadius: 50 }}
                    source={{
                      uri: item.avatar,
                    }}
                  />
                </View>
              )}
            />
          ) : (
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
          )}
        </View>

        <View>{icon()}</View>
      </View>
      {chatType === "group" ? (
        <FlatList
          data={msg}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
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
                    {item?.message.message}
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
                  {moment(item.message.createdAt).format("h:mm a")}
                </Text>
                {item.message.messageType === "image" && (
                  <View>
                    <Image
                      source={{
                        uri: `https://stepdev.up.railway.app/media/getimage/${item.message.message}`,
                      }}
                      style={{
                        height: 150,
                        width: 150,
                        alignSelf: "flex-end",
                        marginRight: 20,
                        margin: 7,
                        borderRadius: 10,
                        backgroundColor: colors.Bluish,
                      }}
                    />
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
                      {moment(item.message.createdAt).format("h:mm a")}
                    </Text>
                  </View>
                )}

                {item.file && (
                  <View>
                    <View
                      style={{
                        height: 70,
                        width: 90,
                        alignSelf: "flex-end",
                        marginRight: 20,

                        backgroundColor: colors.Bluish,
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        source={require("../../../assets/img/pdf.png")}
                        style={{
                          height: 50,
                          width: 50,
                          alignSelf: "flex-end",
                          margin: 7,
                        }}
                      />
                      <PDFReader
                        source={{
                          uri: `https://stepdev.up.railway.app/media/getFile/${item.message.file}`,
                        }}
                      />
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
                      {moment(item.message.createdAt).format("h:mm a")}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      ) : (
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
                  {item.image && (
                    <View>
                      <Image
                        source={{
                          uri: `https://stepdev.up.railway.app/media/getimage/${item.image}`,
                        }}
                        style={{
                          height: 150,
                          width: 150,
                          marginLeft: 20,
                          margin: 7,
                          borderRadius: 10,
                          backgroundColor: "#FFF2F2",
                        }}
                      />
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
                  )}
                  {item.file && (
                    <View>
                      <View
                        style={{
                          height: 70,
                          width: 90,
                          marginLeft: 20,

                          backgroundColor: "#FFF2F2",
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={require("../../../assets/img/pdf.png")}
                          style={{
                            height: 50,
                            width: 50,
                            margin: 7,
                          }}
                        />
                        <PDFReader
                          source={{
                            uri: `https://stepdev.up.railway.app/media/getFile/${item.file}`,
                          }}
                        />
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
                  )}
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
                  {item.image && (
                    <View>
                      <Image
                        source={{
                          uri: `https://stepdev.up.railway.app/media/getimage/${item.image}`,
                        }}
                        style={{
                          height: 150,
                          width: 150,
                          alignSelf: "flex-end",
                          marginRight: 20,
                          margin: 7,
                          borderRadius: 10,
                          backgroundColor: colors.Bluish,
                        }}
                      />
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

                  {item.file && (
                    <View>
                      <View
                        style={{
                          height: 70,
                          width: 90,
                          alignSelf: "flex-end",
                          marginRight: 20,

                          backgroundColor: colors.Bluish,
                          borderRadius: 10,
                        }}
                      >
                        <Image
                          source={require("../../../assets/img/pdf.png")}
                          style={{
                            height: 50,
                            width: 50,
                            alignSelf: "flex-end",
                            margin: 7,
                          }}
                        />
                        <PDFReader
                          source={{
                            uri: `https://stepdev.up.railway.app/media/getFile/${item.file}`,
                          }}
                        />
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
            </View>
          )}
        />
      )}
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
            onPress={() => {
              pickMedia();
            }}
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
              if (chatType === "group") {
                console.log(msg);
                settype("text");
                var obj = {};
                (obj["message.createdAt"] = Date.now()),
                  (obj["message"] = message),
                  (obj["user"] = {
                    _id: "me",
                  });
                setmsg([...msg, obj]);
                sendMessage(message, type);
              } else {
                console.log(msg);
                settype("text");
                var obj = {};
                (obj["createdAt"] = Date.now()),
                  (obj["text"] = message),
                  (obj["user"] = {
                    _id: "me",
                  });
                setmsg([...msg, obj]);
                sendMessage(message, type);
              }
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
            onPress={() => {
              pickDocument();
            }}
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

        {chatType === "group" ? (
          <View></View>
        ) : (
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
        )}
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
