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
  const [members, setmembers] = useState([]);
  const [chat, setchat] = useState();
  const [selected, setselected] = useState(false);

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
        setchat(res.data.chats);

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
  // useEffect(() => {
  //   if (chat && chat.length > 0) {
  //     chat.map((data) => {
  //       if (data.chatid === members) {
  //         setselected(true);
  //       }
  //     });
  //   }
  // }, []);
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card>
                <UserInfo>
                  <UserImgWrapper>
                    <UserInfoText>
                      <UserImg source={{ uri: item.chatavatar }} />
                    </UserInfoText>
                  </UserImgWrapper>
                  <TextSection>
                    <UserInfoText>
                      <UserName>{item.chatname}</UserName>
                      {selected ? (
                        <Pressable
                          style={{
                            height: 21,
                            width: 21,
                            borderRadius: 50,
                            backgroundColor: "#13B887",
                          }}
                          onPress={() => {}}
                        >
                          <MyText
                            style={{
                              fontSize: 14,
                              color: colors.white,
                              alignSelf: "center",
                              margin: 1,
                            }}
                          >
                            -
                          </MyText>
                        </Pressable>
                      ) : (
                        <Pressable
                          style={{
                            height: 21,
                            width: 21,
                            borderRadius: 50,
                            backgroundColor: colors.Bluish,
                          }}
                          onPress={() => {
                            setmembers([...members, item.chatid]);
                            for (var i in members) {
                              console.log(members[i]);
                              //console.log(item.chatid);
                              if (members[i] === item.chatid) {
                                setselected(true);
                              }
                            }
                          }}
                        >
                          <MyText
                            style={{
                              fontSize: 14,
                              color: colors.white,
                              alignSelf: "center",
                              margin: 1,
                            }}
                          >
                            +
                          </MyText>
                        </Pressable>
                      )}
                    </UserInfoText>
                    <MessageText>{item.Role}</MessageText>
                  </TextSection>
                </UserInfo>
              </Card>
            )}
          />
        )}
      </Container>
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
});
