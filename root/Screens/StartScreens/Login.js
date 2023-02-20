import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";

import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTogglePasswordVisibility } from "../../Components/useTogglePasswordVisibility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { io } from "socket.io-client";
import {
  createfacebook,
  creategoogle,
  userLogin,
} from "../Profile/services/authenticationServices";
import Loader from "../../Components/Loader";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { useLayoutEffect } from "react";

const Login = () => {
  const isFocused = useIsFocused();
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { accessToken, setaccessToken } = useContext(CartProvider);
  const [refreshToken, setrefreshToken] = useState();
  const { userdetails, setuserdetails, setUserTab } = useContext(CartProvider);
  const logged = useContext(CartProvider);
  const [getcondition, setcondition] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const { socket, setsocket } = useContext(CartProvider);
  const { firstlogin, setfirstlogin } = useContext(CartProvider);

  useLayoutEffect(() => {
    console.log("2 times");
    console.log(userdetails);
    if (logged.islogin) {
      if (userdetails.role === "Freelancer") {
        navigation.navigate("HomeService");
      } else {
        navigation.navigate("CampaignHome");
      }
    }
  }, [navigation, isFocused]);
  const startsocket = useCallback(
    (accessToken) => {
      setsocket(
        io("https://stepdev.up.railway.app", {
          autoConnect: false,
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      );
    },
    [socket]
  );
  const [, , promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "253459265127-bgal1cs5eb1c8bcb8suso891fg9mm06m.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });
  const [, , fbpromptAsync] = Facebook.useAuthRequest({
    clientId: "1366866914064008",
  });
  const google = async () => {
    try {
      const r = await promptAsync();

      if (r.type === "success") {
        //  const { accesss_token } = r.params.access_token;
        //  console.log(r);
        const res = await creategoogle(r.params.id_token);
        console.log(res.status);
        if (res.status == 200) {
          setuserdetails(res.data.user);
          setaccessToken(res.data.accessToken);
          startsocket(res.data.accessToken);

          try {
            await AsyncStorage.setItem("@accessToken", res.data.accessToken);
            await AsyncStorage.setItem("@refreshToken", res.data.refreshToken);
            await AsyncStorage.setItem(
              "@userDetail",
              JSON.stringify(res.data.user)
            );

            //console.log("done");
          } catch (error) {
            //console.log(error);
          }
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You're Successfully Logged in",
            text2: ".",
          });

          setUserTab(false);
          if (!firstlogin) {
            if (res.data.user.role === "Freelancer") {
              setfirstlogin(true);
              navigation.navigate("ProgressScreen");
              logged.setislogin(true);
            } else {
              console.log("campaign");
              navigation.navigate("CampaignHome");
              logged.setislogin(true);
            }
          } else {
            if (res.data.user.role === "Freelancer") {
              navigation.navigate("HomeService");
            } else {
              navigation.navigate("CampaignHome");
            }
            logged.setislogin(true);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const facebook = async () => {
    try {
      const r = await fbpromptAsync();
      if (r.type === "success") {
        const { accesss_token } = r.params.access_token;
        console.log(r);
        const { data } = await axios({
          url: "https://graph.facebook.com/me",
          method: "get",
          params: {
            fields: ["id", "email", "first_name", "last_name", "picture"].join(
              ","
            ),
            access_token: r.params.access_token,
          },
        });
        //  console.log(data);
        const res = await createfacebook(data);
        // console.log(res.data);
        if (res.status == 200) {
          console.log(res.data.user);
          setuserdetails(res.data.user);
          setaccessToken(res.data.accessToken);
          startsocket(res.data.accessToken);

          try {
            await AsyncStorage.setItem("@accessToken", res.data.accessToken);
            await AsyncStorage.setItem("@refreshToken", res.data.refreshToken);
            await AsyncStorage.setItem(
              "@userDetail",
              JSON.stringify(res.data.user)
            );

            //console.log("done");
          } catch (error) {
            //console.log(error);
          }

          setUserTab(false);

          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You're Successfully Logged In",
            text2: ".",
          });
          if (!firstlogin) {
            if (res.data.user.role === "Freelancer") {
              setfirstlogin(true);
              navigation.navigate("ProgressScreen");
              logged.setislogin(true);
            } else {
              console.log("campaign");
              navigation.navigate("CampaignHome");
              logged.setislogin(true);
            }
          } else {
            if (res.data.user.role === "Freelancer") {
              navigation.navigate("HomeService");
            } else {
              navigation.navigate("CampaignHome");
            }

            logged.setislogin(true);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    if (email == "" || password == "") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Some Fields are missing",
        text2: "Please fill all the fields",
      });
    } else {
      setcondition(true);
      try {
        const response = await userLogin(email, password);
        console.log(response);
        //console.log(response.data);
        if (response.status == 200) {
          //console.log(response.data.user);
          setuserdetails(response.data.user);
          setaccessToken(response.data.accessToken);
          startsocket(response.data.accessToken);

          try {
            await AsyncStorage.setItem(
              "@accessToken",
              response.data.accessToken
            );
            await AsyncStorage.setItem(
              "@refreshToken",
              response.data.refreshToken
            );
            await AsyncStorage.setItem(
              "@userDetail",
              JSON.stringify(response.data.user)
            );
            console.log("async setting" + JSON.stringify(response.data.user));
          } catch (error) {
            //console.log(error);
          }
          setcondition(false);

          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You're Successfully Logged In",
            text2: ".",
          });

          setUserTab(false);
          if (!firstlogin) {
            if (response.data.user.role === "Freelancer") {
              setfirstlogin(true);
              navigation.navigate("ProgressScreen");
              logged.setislogin(true);
            } else {
              console.log("campaign");
              navigation.navigate("CampaignHome");
              logged.setislogin(true);
            }
          } else {
            if (response.data.user.role === "Freelancer") {
              navigation.navigate("HomeService");
            } else {
              navigation.navigate("CampaignHome");
            }
            logged.setislogin(true);
          }
        }
      } catch (error) {
        setcondition(false);

        console.log(error.response.data);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: error.response.data.errors[0].email
            ? error.response.data.errors[0].email
            : error.response.data.errors[0].password,
        });
      }
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View>
        <ImageBackground
          source={require("../../../assets/img/bg.png")}
          resizeMode="cover"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <View style={{ padding: 24 }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.Bluish,
                width: 40,
                height: 40,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 29,
              }}
              onPress={() => {
                navigation.navigate("StartScreen");
              }}
            >
              <AntDesign name="arrowleft" size={20} color={colors.white} />
            </TouchableOpacity>

            <MyText
              style={{
                fontSize: 24,
                alignSelf: "center",
                color: colors.text,
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              Welcome to
            </MyText>
            <MyText
              style={{
                fontSize: 32,
                alignSelf: "center",
                color: colors.text,
                fontWeight: "bold",
              }}
            >
              Job Rebuilder
            </MyText>
            <View style={{ marginTop: 30 }}>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  value={email}
                  onChangeText={(email) => setemail(email)}
                  placeholder="Email"
                  placeholderTextColor="#ACA9A9"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  clearButtonMode="always"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={[
                    styles.inputStyle,
                    { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                  ]}
                  onChangeText={(password) => setpassword(password)}
                  value={password}
                  placeholder="Password" //12345
                  placeholderTextColor="#ACA9A9"
                  keyboardType="default"
                  blurOnSubmit={false}
                  secureTextEntry={passwordVisibility}
                  enablesReturnKeyAutomatically
                  underlineColorAndroid="#f000"
                />
                <Pressable
                  onPress={handlePasswordVisibility}
                  style={{
                    backgroundColor: "#EEEEEE",
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    padding: 8,
                  }}
                >
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={22}
                    color="#ACA9A9"
                  />
                </Pressable>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.Bluish,
                  width: "100%",
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
                onPress={() => {
                  login();
                }}
              >
                {getcondition ? (
                  <Loader
                    visible={getcondition}
                    color="white"
                    indicatorSize="large"
                  />
                ) : (
                  <MyText
                    style={{
                      color: colors.white,
                      fontSize: 16,
                    }}
                  >
                    Login
                  </MyText>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center", marginTop: 20 }}
                onPress={() => {
                  navigation.navigate("Forget");
                }}
              >
                <MyText
                  style={{
                    fontSize: 13,
                    color: colors.text,
                  }}
                >
                  Forget Password?
                </MyText>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <View
                  style={{ flex: 1, height: 1, backgroundColor: "#ACA9A9" }}
                />
                <View>
                  <MyText
                    style={{
                      width: 50,
                      textAlign: "center",
                      color: "#ACA9A9",
                      fontSize: 13,
                    }}
                  >
                    Or
                  </MyText>
                </View>
                <View
                  style={{ flex: 1, height: 1, backgroundColor: "#ACA9A9" }}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.white,
                  width: "100%",
                  height: 50,
                  borderRadius: 10,
                  borderWidth: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
                onPress={() => {
                  google();
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../../assets/img/google.png")}
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: "center",
                      margin: 6,
                    }}
                  />
                  <MyText
                    style={{
                      fontSize: 13,
                      margin: 9,
                    }}
                  >
                    Continue with Google
                  </MyText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.white,
                  width: "100%",
                  height: 50,
                  borderRadius: 10,
                  borderWidth: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
                onPress={() => {
                  facebook();
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../../assets/img/fcebok.png")}
                    style={{
                      height: 25,
                      width: 25,
                      alignSelf: "center",
                      margin: 6,
                    }}
                  />
                  <MyText
                    style={{
                      fontSize: 13,
                      margin: 9,
                    }}
                  >
                    Continue with Facebook
                  </MyText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.text,
                  width: "100%",
                  height: 50,
                  borderRadius: 10,
                  borderWidth: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
                onPress={() => {
                  navigation.navigate("CreateAccount");
                }}
              >
                <MyText
                  style={{
                    fontSize: 13,
                    color: colors.white,
                  }}
                >
                  Create an Account
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 47,
    marginTop: 14,
    marginBottom: 5,
  },
});

export default Login;
