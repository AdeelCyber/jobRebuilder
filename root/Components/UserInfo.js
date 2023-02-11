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
  ActivityIndicator,
} from "react-native";

import Context from "../Context/Context";
import MyText from "./Text";

import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import StarRating from "react-native-star-rating-widget";
import axios from "axios";

import CartProvider from "../Context/CartProvider";
const UserInfo = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const [getRating, setRating] = useState(5);
  const [userinfo, setuserinfo] = useState();
  const [getcondition, setcondition] = useState(true);
  const [userreviews, setuserreviews] = useState([]);
  var rate = [];
  const [avg, setavg] = useState();
  const { accessToken } = useContext(CartProvider);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`,
      },
    };

    axios
      .get(
        "https://stepdev.up.railway.app/freelancer/profile",

        config
      )
      .then((res) => {
        //   console.log(res.data.data.ratingAndReviews);
        setuserreviews(res.data.data.ratingAndReviews);
        setuserinfo(res.data.data);
        setcondition(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [getcondition]);

  useEffect(() => {
    if (userreviews) {
      console.log(userreviews.length);
      for (var i in userreviews) {
        var review = userreviews[i].rating;
      }
      rate.push(review / userreviews.length);
      setavg(rate.toString());

      console.log(avg);
    }
  }, [userreviews]);

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
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, marginTop: 20 },
      ]}
    >
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          paddingBottom: 40,
          borderBottomWidth: 1,
          borderColor: "#23232380",
          width: 346,
          height: 140,
          marginTop: 17,
        }}
      >
        <Image
          style={{ height: 78, width: 78, borderRadius: 50, margin: 10 }}
          source={{ uri: userinfo?.userInfo.avatar }}
        />
        <View style={{ flexDirection: "column" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <MyText
              style={{ fontSize: 20, fontWeight: "700", marginRight: 17 }}
            >
              {userinfo?.userInfo.name}
            </MyText>
            <View
              style={{
                marginLeft: 16,
                height: 16,
                width: 16,
                borderRadius: 50,
                padding: 1,
                backgroundColor: colors.Bluish,
                alignSelf: "flex-end",
              }}
            >
              <MaterialCommunityIcons
                name="pencil"
                size={14}
                color={colors.white}
                onPress={() => {
                  navigation.navigate("EditProfile", {
                    userinfo: userinfo,
                  });
                }}
              />
            </View>
            <MaterialCommunityIcons
              name="content-copy"
              size={25}
              style={{ marginLeft: 3, alignSelf: "flex-end" }}
              color={colors.Bluish}
            />
          </View>
          <MyText
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "#23232380",
              marginLeft: 10,
              marginBottom: 6,
            }}
          >
            {userinfo?.about.jobTitle}
          </MyText>
          <View style={{ flexDirection: "row" }}>
            <MyText
              style={{
                fontSize: 12,
                fontWeight: "700",
                marginLeft: 10,
                marginBottom: 6,
              }}
            >
              ${userinfo?.services.hourlyRate}/
            </MyText>
            <MyText
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: "#23232380",
                marginRight: 16,
              }}
            >
              Hr
            </MyText>
            <Entypo name="location-pin" size={13} color="grey" />
            <MyText
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#23232380",
                marginLeft: 3,
                marginBottom: 6,
              }}
            >
              {userinfo?.about.city}, {userinfo?.about.country}
            </MyText>
          </View>
          <MyText
            style={{
              fontSize: 12,
              fontWeight: "400",
              marginLeft: 10,
              color: "#23232380",
              marginBottom: 6,
            }}
          >
            Availability : {userinfo?.about.responseTime} Hrs/week
          </MyText>
          <View style={{ flexDirection: "row" }}>
            <StarRating
              rating={avg}
              //onChange={setRating}
              starSize={16}
              style={{ padding: 0, margin: 4, width: 10 }}
            />

            <MyText
              style={{
                fontSize: 14,
                fontWeight: "700",
                marginLeft: 60,
                margin: 4,
              }}
            >
              {avg}
            </MyText>
            <MyText
              style={{
                fontSize: 12,
                fontWeight: "400",
                marginLeft: 10,
                margin: 7,
                color: "#23232380",
              }}
            >
              ({userreviews.length} Reviews)
            </MyText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserInfo;
