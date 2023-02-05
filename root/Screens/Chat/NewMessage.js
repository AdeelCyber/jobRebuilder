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
import { Container, Msgs } from "../../Components/MessageStyles";
import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import CartProvider from "../../Context/CartProvider";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { getmembers } from "../Profile/services/startupServices";
const NewMessage = ({ navigation, route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const { accessToken } = useContext(CartProvider);
  const [getcondition, setcondition] = useState(true);
  const [getmember, setmembers] = useState();

  const membershere = async () => {
    const members = await getmembers(accessToken);
    console.log(members.data);
    setmembers(members.data.members);
    setcondition(false);
  };
  useEffect(() => {
    membershere();
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
      <View style={[styles.header, styles.shadow]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="search1" size={18} color="black" />
        </View>
        <View>
          <MyText style={{ fontWeight: "700", fontSize: 16 }}>Contacts</MyText>
        </View>

        <View>
          <FontAwesome name="pencil-square-o" size={24} color="black" />
        </View>
      </View>
      {getmember ? (
        <Container>
          <FlatList
            data={getmember}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderColor: "#9DD0FF66",
                  marginBottom: 10,
                }}
                onPress={() =>
                  navigation.navigate("MessagesBox", {
                    id: item._id,
                    userImg: item.avatar,
                    userName: item.name,
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{
                      height: 51,
                      width: 51,
                      borderRadius: 50,
                      alignItems: "center",
                    }}
                    source={{ uri: item.avatar }}
                  />
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 50,
                      marginLeft: 40,

                      backgroundColor: colors.red,
                      alignSelf: "flex-end",
                      position: "absolute",
                      bottom: 19,
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    margin: 10,
                    width: 210,
                    height: 50,
                    marginRight: 40,
                  }}
                >
                  <MyText style={{ fontWeight: "700", fontSize: 14 }}>
                    {item.name}
                  </MyText>
                </View>
              </TouchableOpacity>
            )}
          />
        </Container>
      ) : (
        <View>
          <Text> No chats here</Text>
        </View>
      )}
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
