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
import MyText from "../../Components/Text";
import CartProvider from "../../Context/CartProvider";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { getmembers } from "../Profile/services/startupServices";
import CustomHeader4 from "../../Components/CustomHeader4";
const NewMessage = ({ navigation, route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const { accessToken } = useContext(CartProvider);
  const { members } = route.params != undefined ? route.params : {};

  useEffect(() => {
    console.log(members);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader4 Title="Group Details" icon1={() => {}} nav={navigation} />

      <View style={{ alignSelf: "flex-start" }}>
        <MyText
          style={{
            fontWeight: "700",
            fontSize: 16,
            marginLeft: 20,
            margin: 10,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          Group Members
        </MyText>
      </View>

      <Container>
        {members && (
          <FlatList
            data={members}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item, index }) => (
              <Card>
                <UserInfo>
                  <UserImgWrapper>
                    <UserInfoText>
                      <UserImg
                        source={{
                          uri: `https://stepev-dev.up.railway.app/media/getimage/${item.avatar}`,
                        }}
                      />
                    </UserInfoText>
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.name}</UserName>
                    </UserInfoText>
                  </TextSection>
                </UserInfo>
              </Card>
            )}
          />
        )}
      </Container>
    </View>
  );
};

export default NewMessage;

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
});
