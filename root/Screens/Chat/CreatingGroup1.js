import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  TextInput,
  Image,
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

import Loader from "../../Components/Loader";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import Context from "../../Context/Context";
import LittleNav from "../../Components/LittleNav";
import { GroupChats } from "../../Components/GroupChats";
import MyText from "../../Components/Text";
import { FontAwesome } from "@expo/vector-icons";
import CustomHeader5 from "../../Components/CustomHeader5";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { imageUpload } from "../Profile/services/fileServices";

const CreatingGroup1 = ({ navigation, route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [grouptitle, setgrouptitle] = useState();
  const [image, setimage] = useState();
  const { accessToken } = useContext(CartProvider);
  const [getcondition, setcondition] = useState(true);
  const [logo, setlogo] = useState();
  const { members } = route.params != undefined ? route.params : {};
  const [media, setmedia] = useState();
  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [10, 10],
      quality: 1,
    });
    //console.log(result);

    if (!result.canceled) {
      setimage("Uploaded");
      setmedia(result.assets[0].uri);
    }
    if (!result.canceled) {
      setimage("Uploaded");
      setmedia(result.assets[0].uri);

      const img = await imageUpload(result.assets[0].uri);
      setlogo(JSON.parse(img.body));
    }
  };
  useEffect(() => {
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
        // console.log(res.data.chats);
        // setchat(res.data.chats);

        setcondition(false);
      })
      .catch((err) => {
        //console.log("error", err);
      });
  }, [getcondition]);

  const group = () => {
    //console.log(accessToken);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const r = ["63c2f060badbb4001f79a4bc", "63c430c5badbb4001f79a4be"];
    setcondition(true);

    axios
      .post(
        "https://stepdev.up.railway.app/chat/createChatGroup",
        {
          groupName: grouptitle,
          members: members,
          avatar: logo.filename,
        },
        config
      )
      .then((res) => {
        console.log(res);
        // setchat(res.data.chats);

        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Group Created",
            text2: ".",
          });
          navigation.navigate("Message");
        }
        setcondition(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    console.log(members);
  }, []);

  if (getcondition) {
    return (
      <Loader visible={getcondition} color="white" indicatorSize="large" />
    );
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader5 icon1={() => {}} />

      <View style={{ alignSelf: "flex-start" }}>
        <MyText
          style={{
            fontWeight: "700",
            fontSize: 16,
            marginLeft: 20,
            margin: 10,
          }}
        >
          Add Details
        </MyText>
      </View>

      <Container>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            value={grouptitle}
            onChangeText={(grouptitle) => setgrouptitle(grouptitle)}
            placeholder="Group Title"
            placeholderTextColor="#ACA9A9"
            autoCapitalize="none"
            clearButtonMode="always"
          />
        </View>
        <View
          style={[styles.SectionStyle, { width: 233, alignSelf: "flex-start" }]}
        >
          <View style={[styles.inputStyle, { flexDirection: "row" }]}>
            <FontAwesome
              name="camera"
              size={20}
              color={colors.Bluish}
              style={{ paddingTop: 18 }}
              onPress={() => {
                pickMedia();
              }}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Upload Profile Picture"
              onChangeText={(image) => setimage(image)}
              value={image}
            />
          </View>
        </View>
        <View style={{ alignSelf: "flex-start" }}>
          <MyText style={{ fontWeight: "700", fontSize: 16, margin: 10 }}>
            Participants
          </MyText>
        </View>
        <FlatList
          data={members}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          horizontal={true}
          style={{ alignSelf: "flex-start" }}
          renderItem={({ item }) => (
            <View style={{ marginRight: 5, marginLeft: 5 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 50 }}
                source={{
                  uri: "https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg",
                }}
              />
            </View>
          )}
        />
      </Container>
      <Pressable
        style={{
          backgroundColor: colors.Bluish,
          width: 360,
          height: 58,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
        onPress={() => {
          group();
        }}
      >
        <MyText
          style={{
            color: colors.white,
            fontSize: 16,
          }}
        >
          Create
        </MyText>
      </Pressable>
    </View>
  );
};

export default CreatingGroup1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 58,
    width: 344,
    marginTop: 14,
    marginBottom: 5,
  },
});
