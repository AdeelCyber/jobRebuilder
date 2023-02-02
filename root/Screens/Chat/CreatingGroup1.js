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
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import Context from "../../Context/Context";
import LittleNav from "../../Components/LittleNav";
import { GroupChats } from "../../Components/GroupChats";
import MyText from "../../Components/Text";
import { FontAwesome } from "@expo/vector-icons";
import CustomHeader5 from "../../Components/CustomHeader5";
import { title } from "process";

const CreatingGroup1 = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const [grouptitle, setgrouptitle] = useState();
  const [image, setimage] = useState();
  const { accessToken } = useContext(CartProvider);
  const [getcondition, setcondition] = useState(true);
  const [members, setmembers] = useState();

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
        console.log("error", err);
      });
  }, [getcondition]);

  const group = () => {
    console.log(accessToken);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`,
      },
    };
    const r = ["63c2f060badbb4001f79a4bc", "63c430c5badbb4001f79a4be"];
    setcondition(true);

    axios
      .post(
        "https://stepdev.up.railway.app/chat/createChatGroup",
        {
          groupName: grouptitle,
          members: r,
          avatar: "jbbv",
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        // setchat(res.data.chats);

        setcondition(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
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
      <CustomHeader5 />

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
          data={GroupChats}
          keyExtractor={(item) => item.id}
          horizontal={true}
          style={{ alignSelf: "flex-start" }}
          renderItem={({ item }) => (
            <View style={{ marginRight: 5, marginLeft: 5 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 50 }}
                source={item.userImg}
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
