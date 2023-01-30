import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
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
import Context from "../../Context/Context";
import LittleNav from "../../Components/LittleNav";
import { GroupChats } from "../../Components/GroupChats";
import MyText from "../../Components/Text";
import { FontAwesome } from "@expo/vector-icons";
import CustomHeader5 from "../../Components/CustomHeader5";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import moment from "moment";
const CreatingGroup = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
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
        console.log(res.data.chats);
        // setchat(res.data.chats);

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
          Add Members
        </MyText>
      </View>

      <Container>
        <FlatList
          data={GroupChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card>
              <UserInfo>
                <UserImgWrapper>
                  <UserInfoText>
                    <UserImg source={item.userImg} />
                  </UserInfoText>
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <Pressable
                      style={{
                        height: 21,
                        width: 21,
                        borderRadius: 50,
                        backgroundColor: colors.Bluish,
                      }}
                      onPress={() => {
                        navigation.navigate("CreatingGroup1");
                      }}
                    >
                      <MyText
                        style={{
                          fontSize: 14,
                          color: colors.white,
                          alignSelf: "center",
                        }}
                      >
                        +
                      </MyText>
                    </Pressable>
                  </UserInfoText>
                  <MessageText>{item.Role}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    </View>
  );
};

export default CreatingGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
