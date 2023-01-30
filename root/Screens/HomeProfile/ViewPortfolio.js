import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  FlatList,
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import CustomHeader11 from "../../Components/CustomHeader11";
import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Swiper from "react-native-swiper";
import CartProvider from "../../Context/CartProvider";

const ViewPortfolio = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const { accessToken } = useContext(CartProvider);

  const { portfolio } = route.params;
  const deleteportfolio = () => {
    console.log(portfolio._id);
    console.log(accessToken);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`,
      },
    };

    axios
      .delete(
        "https://stepdev.up.railway.app/freelancer/profile/portfolio/delete",
        {
          portfolioId: portfolio._id,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container]}>
        <CustomHeader11 />
        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          <MyText style={[styles.header, { marginLeft: 30, marginRight: 5 }]}>
            Portfolio Details
          </MyText>
          <View
            style={{
              marginTop: 33,
              height: 16,
              width: 16,
              borderRadius: 50,
              padding: 1,
              backgroundColor: colors.Bluish,
            }}
          >
            <MaterialCommunityIcons
              name="pencil"
              size={14}
              color={colors.white}
              onPress={() => {
                navigation.navigate("EditPortfolio", { portfolio: portfolio });
              }}
            />
          </View>
          <AntDesign
            name="delete"
            size={22}
            color={colors.red}
            style={{ marginTop: 30, marginLeft: 110 }}
            onPress={() => {
              deleteportfolio();
            }}
          />
          <MyText
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginTop: 32,
              marginLeft: 10,
            }}
          >
            120
          </MyText>
          <AntDesign
            name="heart"
            size={22}
            color={colors.red}
            style={{ marginTop: 30, marginLeft: 10 }}
          />
        </View>
        <MyText style={[styles.header, { margin: 30 }]}>Title</MyText>
        <MyText style={styles.textstyle}>{portfolio.title}</MyText>

        <MyText style={[styles.header, { margin: 30 }]}>Description</MyText>

        <MyText style={styles.textstyle}>{portfolio.description}</MyText>

        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          <MyText style={[styles.header, { marginLeft: 30, marginRight: 5 }]}>
            Attachments
          </MyText>
          <View
            style={{
              marginTop: 33,
              height: 16,
              width: 16,
              borderRadius: 50,
              padding: 1,
              backgroundColor: colors.Bluish,
            }}
          >
            <MaterialCommunityIcons
              name="pencil"
              size={14}
              color={colors.white}
            />
          </View>
        </View>
        <View
          style={{
            height: 278,
            width: 350,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 1,
            elevation: 7,
            margin: 3,
            shadowColor: colors.Bluish,
          }}
        >
          <View style={styles.swiper}>
            <Swiper showButtons={true} autoplay={true} autoplayTimeout={4}>
              {route.params?.portfolio.attachments.map((i) => (
                <Image
                  source={{ uri: i }}
                  resizeMode="contain"
                  style={{ height: 278, width: 350, borderRadius: 10 }}
                  key={i._id}
                />
              ))}
            </Swiper>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnstyle: {
    height: 35,
    width: 107,
    borderRadius: 5,
    backgroundColor: "#232323",
    margin: 5,
  },
  btntext: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
    margin: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "700",
    color: "#232323",
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: 10,
  },

  textstyle: {
    fontSize: 14,
    fontWeight: "400",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginRight: 30,
  },
  banner: {
    width: 290,
    height: 290,
    resizeMode: "contain",
    marginLeft: 30,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  swiper: {
    width: "100%",
    height: 290,
    backgroundColor: "#fff",
    position: "relative",
  },
});

export default ViewPortfolio;
