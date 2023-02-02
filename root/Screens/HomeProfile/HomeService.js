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
  ActivityIndicator,
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import CustomHeader8 from "../../Components/CustomHeader8";
import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Foundation from "@expo/vector-icons/Foundation";
import StarRating from "react-native-star-rating-widget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import UserInfo from "../../Components/UserInfo";
import CartProvider from "../../Context/CartProvider";
import { getProfile } from "../Profile/services/ProfileServices";
import moment from "moment";
const HomeService = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const [getRating, setRating] = useState(5);

  const [skills, setskills] = useState([
    { id: 1, skill: "UI/UX Design" },
    { id: 2, skill: "Logo Design" },
    { id: 3, skill: "Video Editing" },
    { id: 4, skill: "Animations" },
    { id: 5, skill: "Post Designs" },
  ]);
  const [service, setService] = useState(true);
  const [portfolio, setportfolio] = useState(false);
  const [reviews, setreviews] = useState(false);
  const [about, setAbout] = useState(false);
  const [userinfo, setuserinfo] = useState();
  const [getcondition, setcondition] = useState(true);

  const [userreviews, setuserreviews] = useState([]);

  const { accessToken } = useContext(CartProvider);
  const getUser = async () => {
    const res = await getProfile(accessToken);
    console.log(res.data.data);
    setuserinfo(res.data.data);
    setcondition(false);
  };
  useEffect(() => {
    getUser();
  }, [getcondition]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`,
      },
    };

    axios
      .get(
        "https://stepdev.up.railway.app/freelancer/all",

        config
      )
      .then((res) => {
        //console.log(res.data.data);
        setuserreviews(res.data.data);
        //setuserinfo(res.data.data);
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
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={[styles.container]}>
        <CustomHeader8 />
        <UserInfo />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 30,
              alignItems: "center",
            }}
          >
            {service ? (
              <TouchableOpacity style={styles.btnstyle} onPress={() => {}}>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="desk"
                    size={16}
                    style={{ marginTop: 10, marginLeft: 15 }}
                    color={colors.white}
                  />
                  <MyText style={styles.btntext}>Services</MyText>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.btnstyle,
                  { backgroundColor: colors.white, borderWidth: 1 },
                ]}
                onPress={() => {
                  setService(true);
                  setportfolio(false);
                  setreviews(false);
                  setAbout(false);
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="desk"
                    size={16}
                    style={{ marginTop: 10, marginLeft: 15 }}
                    color={colors.black}
                  />
                  <MyText style={[styles.btntext, { color: colors.black }]}>
                    Services
                  </MyText>
                </View>
              </TouchableOpacity>
            )}

            {portfolio ? (
              <TouchableOpacity style={styles.btnstyle} onPress={() => {}}>
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="medical-bag"
                    size={16}
                    style={{ marginTop: 10, marginLeft: 15 }}
                    color={colors.white}
                  />
                  <MyText style={styles.btntext}>Portfolio</MyText>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.btnstyle,
                  { backgroundColor: colors.white, borderWidth: 1 },
                ]}
                onPress={() => {
                  setService(false);
                  setportfolio(true);
                  setreviews(false);
                  setAbout(false);
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="medical-bag"
                    size={16}
                    style={{ marginTop: 10, marginLeft: 15 }}
                    color={colors.black}
                  />
                  <MyText style={[styles.btntext, { color: colors.black }]}>
                    Portfolio
                  </MyText>
                </View>
              </TouchableOpacity>
            )}

            {reviews ? (
              <TouchableOpacity style={styles.btnstyle}>
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    name="staro"
                    size={16}
                    style={{ marginTop: 10, marginLeft: 15 }}
                    color={colors.white}
                  />
                  <MyText style={styles.btntext}>Reviews</MyText>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.btnstyle,
                  { backgroundColor: colors.white, borderWidth: 1 },
                ]}
                onPress={() => {
                  setService(false);
                  setportfolio(false);
                  setreviews(true);
                  setAbout(false);
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    name="staro"
                    size={16}
                    style={{ marginTop: 10, marginLeft: 15 }}
                    color={colors.black}
                  />
                  <MyText style={[styles.btntext, { color: colors.black }]}>
                    Reviews
                  </MyText>
                </View>
              </TouchableOpacity>
            )}
            {about ? (
              <TouchableOpacity style={styles.btnstyle}>
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    name="user"
                    size={16}
                    style={{ marginTop: 10, marginLeft: 15 }}
                    color={colors.white}
                  />
                  <MyText style={styles.btntext}>About</MyText>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.btnstyle,
                  { backgroundColor: colors.white, borderWidth: 1 },
                ]}
                onPress={() => {
                  setService(false);
                  setportfolio(false);
                  setreviews(false);
                  setAbout(true);
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    name="user"
                    size={16}
                    style={{ marginTop: 10, marginLeft: 15 }}
                    color={colors.black}
                  />
                  <MyText style={[styles.btntext, { color: colors.black }]}>
                    About
                  </MyText>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {service && (
          <View>
            <MyText style={styles.header}>Description</MyText>
            <View
              style={[
                styles.box,
                {
                  shadowColor: colors.Bluish,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <MyText
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    marginTop: 30,
                    marginLeft: 30,
                  }}
                >
                  UI/UX Designer
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
                <View
                  style={{
                    marginTop: 33,
                    marginLeft: 100,
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
                      navigation.navigate("EditService");
                    }}
                  />
                </View>
                <MyText
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    marginTop: 33,
                    marginRight: 30,
                  }}
                >
                  {userinfo?.services.hourlyRate}$
                </MyText>
              </View>
              {userinfo && (
                <MyText
                  style={{
                    fontSize: 11,
                    fontWeight: "400",
                    color: "#23232380",
                    margin: 30,
                    textAlign: "justify",
                  }}
                >
                  {userinfo?.services.description}
                </MyText>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignSelf: "flex-start",
              }}
            >
              <MyText style={[styles.header, { marginRight: 10 }]}>
                Skills
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
              style={[
                styles.box,
                {
                  height: 100,
                  shadowColor: colors.Bluish,
                  padding: 10,
                  marginBottom: 30,
                },
              ]}
            >
              <FlatList
                data={userinfo?.services.skills}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                  <View
                    style={{
                      marginTop: 15,
                      marginLeft: 10,
                      height: 22,
                      width: 90,
                      backgroundColor: colors.Bluish,
                      borderRadius: 5,
                    }}
                  >
                    <MyText
                      style={{
                        color: colors.white,
                        fontSize: 11,
                        fontWeight: "400",
                        alignSelf: "center",
                        margin: 3,
                      }}
                    >
                      {item}
                    </MyText>
                  </View>
                )}
              />
            </View>
          </View>
        )}
        {portfolio && (
          <View style={{ alignSelf: "flex-start", margin: 30 }}>
            <View
              style={{
                width: "100%",
              }}
            >
              <FlatList
                data={userinfo.portfolio}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ flexWrap: "wrap" }}
                renderItem={({ item }) => (
                  <View>
                    <Pressable
                      onPress={() => {
                        navigation.navigate("ViewPortfolio", {
                          portfolio: item,
                        });
                      }}
                    >
                      <Image
                        style={{
                          height: 140,
                          width: 160,
                          borderRadius: 5,
                          marginBottom: 10,
                          marginRight: 5,
                        }}
                        source={{ uri: item.attachments[0] }}
                      />
                    </Pressable>
                  </View>
                )}
              />
            </View>
            <Pressable
              style={{
                height: 139,
                width: 160,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                backgroundColor: colors.Bluish,
              }}
              onPress={() => {
                navigation.navigate("Portfolio");
              }}
            >
              <View
                style={{
                  height: 74,
                  width: 74,
                  borderRadius: 50,
                  justifyContent: "center",
                  backgroundColor: "#D9D9D95E",
                }}
              >
                <MyText
                  style={{
                    fontSize: 42,
                    fontWeight: "200",
                    alignSelf: "center",
                  }}
                >
                  +
                </MyText>
              </View>
            </Pressable>
          </View>
        )}

        {reviews && (
          <FlatList
            data={userreviews}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  marginTop: 20,
                  height: 91,
                  width: 345,
                  borderRadius: 5,
                  shadowColor: colors.Bluish,
                  elevation: 6,

                  backgroundColor: "white",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{
                      height: 32,
                      width: 32,
                      borderRadius: 50,
                      margin: 15,
                    }}
                    source={{ uri: item.avatar }}
                  />
                  <View style={{ flexDirection: "column", marginTop: 15 }}>
                    <MyText style={{ fontSize: 14, fontWeight: "700" }}>
                      {item.name}
                    </MyText>
                    <View style={{ flexDirection: "row" }}>
                      <StarRating
                        rating={getRating}
                        onChange={setRating}
                        starSize={14}
                        style={{
                          padding: 0,
                          margin: 0,
                          width: 10,
                          alignSelf: "flex-start",
                        }}
                      />
                      <MyText
                        style={{
                          fontSize: 10,
                          fontWeight: "700",
                          marginLeft: 50,
                        }}
                      >
                        5.0
                      </MyText>
                      <MyText
                        style={{
                          fontSize: 10,
                          fontWeight: "500",
                          color: "#23232380",
                          marginLeft: 150,
                        }}
                      >
                        {item.time}
                      </MyText>
                    </View>
                    <MyText
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        color: "#23232380",
                        marginRight: 90,
                      }}
                    >
                      {item.rev}
                    </MyText>
                  </View>
                </View>
              </View>
            )}
          />
        )}

        {about && (
          <View style={{ marginBottom: 30 }}>
            <View
              style={[
                styles.aboutbox,
                {
                  shadowColor: colors.Bluish,
                },
              ]}
            >
              <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
                <MyText style={styles.heading}>About me</MyText>
                <View
                  style={{
                    marginTop: 15,
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
                      navigation.navigate("EditProfile", {
                        userinfo: userinfo,
                      });
                    }}
                  />
                </View>
              </View>
              <MyText style={styles.content}>{userinfo.about.aboutMe}</MyText>
            </View>
            <View
              style={[
                styles.aboutbox,
                {
                  shadowColor: colors.Bluish,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <AntDesign
                  name="calendar"
                  size={26}
                  style={{ marginTop: 20, marginLeft: 15 }}
                  color={colors.iconGray}
                />

                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <MyText style={styles.heading}>Joined Date</MyText>
                  <MyText style={styles.content}>
                    {moment(userinfo.about.joinedData).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </MyText>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.aboutbox,
                {
                  shadowColor: colors.Bluish,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="clock-time-four-outline"
                  size={26}
                  style={{ marginTop: 20, marginLeft: 15 }}
                  color={colors.iconGray}
                />

                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <MyText style={styles.heading}>Last Active</MyText>
                  <MyText style={styles.content}>
                    {" "}
                    {userinfo.about.lastActive} Mins Ago
                  </MyText>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.aboutbox,
                {
                  shadowColor: colors.Bluish,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="language"
                  size={26}
                  style={{ marginTop: 20, marginLeft: 15 }}
                  color={colors.iconGray}
                />

                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <View
                    style={{ flexDirection: "row", alignSelf: "flex-start" }}
                  >
                    <MyText style={styles.heading}>Language</MyText>
                    <View
                      style={{
                        marginTop: 15,
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
                  <MyText style={styles.content}>
                    {userinfo.about.language}
                  </MyText>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.aboutbox,
                {
                  shadowColor: colors.Bluish,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={26}
                  style={{ marginTop: 20, marginLeft: 15 }}
                  color={colors.iconGray}
                />

                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <MyText style={styles.heading}>Response Time</MyText>
                  <MyText style={styles.content}>
                    {userinfo.about.responseTime} Mins Ago
                  </MyText>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.aboutbox,
                {
                  shadowColor: colors.Bluish,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <EvilIcons
                  name="calendar"
                  size={36}
                  style={{ marginTop: 20, marginLeft: 15 }}
                  color={colors.iconGray}
                />

                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <View
                    style={{ flexDirection: "row", alignSelf: "flex-start" }}
                  >
                    <MyText style={styles.heading}>Availibility</MyText>
                    <View
                      style={{
                        marginTop: 15,
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
                  <MyText style={styles.content}>
                    {userinfo.about.responseTime} Hrs/Week
                  </MyText>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.aboutbox,
                {
                  shadowColor: colors.Bluish,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                <Foundation
                  name="shopping-bag"
                  size={26}
                  style={{ marginTop: 20, marginLeft: 15 }}
                  color={colors.iconGray}
                />

                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <View
                    style={{ flexDirection: "row", alignSelf: "flex-start" }}
                  >
                    <MyText style={styles.heading}>Work Preference</MyText>
                    <View
                      style={{
                        marginTop: 15,
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
                  <MyText style={styles.content}>
                    Fixed Rate ({userinfo.userInfo.role})
                  </MyText>
                </View>
              </View>
            </View>
          </View>
        )}
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
  box: {
    height: 190,
    width: 345,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 4,
    backgroundColor: "white",
  },
  heading: {
    marginLeft: 20,
    marginTop: 15,
    marginRight: 5,
    fontSize: 11,
    fontWeight: "700",
  },
  content: {
    marginLeft: 20,
    marginRight: 5,
    marginTop: 2,
    fontSize: 10,
    fontWeight: "400",
    color: "#23232380",
  },
  aboutbox: {
    marginTop: 10,
    height: 70,
    width: 345,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "white",
  },
});

export default HomeService;
