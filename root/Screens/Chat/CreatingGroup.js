import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
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
import CustomHeader4 from "../../Components/CustomHeader4";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import moment from "moment";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getChats } from "../Profile/services/MessageServices";
import { check } from "yargs";

const CreatingGroup = ({ navigation }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const { accessToken } = useContext(CartProvider);
  const [getcondition, setcondition] = useState(true);
  const [members, setmembers] = useState([]);
  const [memberstodis, setmemberstodis] = useState([]);

  const [chat, setchat] = useState();
  const [selected, setselected] = useState(false);
  const [chat2, setchat2] = useState();
  const [search, setsearch] = useState(false);
  const [searching, setsearching] = useState();

  const onRefresh = async () => {
    const res = await getChats(accessToken);
    //console.log(res.data.chats);

    setchat(res.data.chats);
    setchat2(res.data.chats);

    setcondition(false);
  };

  useEffect(() => {
    onRefresh();
  }, [members, memberstodis]);
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
  const check = (item) => {};

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
        Title="Creating Group"
        icon1={() => {}}
        icon2={() => {
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
          Add Members
        </MyText>
      </View>

      <Container>
        {chat && (
          <FlatList
            data={chat && chat.filter((item) => item.chatType.match("simple"))}
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
                          uri: `https://stepdev.up.railway.app/media/getimage/${item.chatavatar}`,
                        }}
                      />
                    </UserInfoText>
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.chatname}</UserName>

                      <Pressable
                        style={{
                          height: 25,
                          width: 25,
                          borderRadius: 50,
                          backgroundColor: colors.Bluish,
                        }}
                        onPress={() => {
                          console.log(item);
                          setmemberstodis([...memberstodis, item]);
                          setmembers([...members, item.chatid]);
                        }}
                      >
                        <MyText
                          style={{
                            fontSize: 16,
                            color: colors.white,
                            alignSelf: "center",
                            margin: 1,
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
        )}
      </Container>
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
          Members
        </MyText>
      </View>
      {memberstodis && (
        <FlatList
          data={memberstodis}
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
                        uri: `https://stepdev.up.railway.app/media/getimage/${item.chatavatar}`,
                      }}
                    />
                  </UserInfoText>
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.chatname}</UserName>

                    <Pressable
                      style={{
                        height: 25,
                        width: 25,
                        borderRadius: 50,
                        backgroundColor: colors.Bluish,
                      }}
                      onPress={() => {}}
                    >
                      <MyText
                        style={{
                          fontSize: 16,
                          color: colors.white,
                          alignSelf: "center",
                          margin: 1,
                        }}
                      >
                        -
                      </MyText>
                    </Pressable>
                  </UserInfoText>
                  <MessageText>{item.Role}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      )}

      <Pressable
        style={{
          backgroundColor: colors.Bluish,
          width: 350,
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 30,
        }}
        onPress={() => {
          navigation.navigate("CreatingGroup1", { members: members });
        }}
      >
        <MyText
          style={{
            color: colors.white,
            fontSize: 14,
          }}
        >
          Create Group
        </MyText>
      </Pressable>
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
  inputContainer: {
    height: 50,
    marginTop: 7,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
