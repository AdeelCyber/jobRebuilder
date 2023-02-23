import React, { useContext, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  Text,
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";
import { CountryPicker } from "react-native-country-codes-picker";

import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTogglePasswordVisibility } from "../../Components/useTogglePasswordVisibility";
import {
  createaccount,
  createfacebook,
  creategoogle,
} from "../Profile/services/authenticationServices";
import Toast from "react-native-toast-message";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import Loader from "../../Components/Loader";
const CreateAccount = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  WebBrowser.maybeCompleteAuthSession();
  const navigation = useNavigation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const { role } = route.params != undefined ? route.params : {};
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [googledis, setgoogledis] = useState();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [getcode, setcode] = useState(false);
  const [getcondition, setcondition] = useState(false);

  const [, , promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "253459265127-bgal1cs5eb1c8bcb8suso891fg9mm06m.apps.googleusercontent.com",
    iosClientId:
      "253459265127-lbj898i74the28o7f9et447h6e8m3rgi.apps.googleusercontent.com",
    androidClientId:
      "253459265127-nhli1d4c8fgubovogtstj3879aro6g6o.apps.googleusercontent.com",
    webClientId:
      "253459265127-bgal1cs5eb1c8bcb8suso891fg9mm06m.apps.googleusercontent.com",
  });
  const [, , fbpromptAsync] = Facebook.useAuthRequest({
    clientId: "1366866914064008",
  });
  const google = async () => {
    try {
      const r = await promptAsync();

      if (r.type === "success") {
        //  const { accesss_token } = r.params.access_token;
        console.log(r.params.id_token);
        const res = await creategoogle(r.params.id_token, role);
        console.log(res);
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You Successfully created the account",
            text2: ".",
          });
          navigation.navigate("LoginScreen");
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
        const res = await createfacebook(data, role);
        console.log(res.data);
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You Successfully created the account",
            text2: ".",
          });
          navigation.navigate("LoginScreen");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signUp = async () => {
    console.log(Phonenumber, email, name, password);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email == "" || password == "" || Phonenumber == "" || name == "") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Some Fields are missing",
        text2: "Please fill all the fields",
      });
    } else if (reg.test(email) === false) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Email is incorrect",
        text2: "Please enter a valid email",
      });
    } else if (password.length < 8) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Password is too short",
        text2: "It should be greater than 8 characters",
      });
    } else {
      // navigation.navigate('OtpScreen2', {
      //   email: email,
      //   Phonenumber: Phonenumber,
      //   password: password,
      //   name: name,
      //   role: role,
      // })
      try {
        setcondition(true);
        const response = await createaccount(
          email,
          password,
          Phonenumber,
          name,
          role
        );
        if (response.status == 201) {
          setcondition(false);
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "You Successfully created the account",
            text2: ".",
          });
          navigation.navigate("LoginScreen");
        }
      } catch (error) {
        setcondition(false);

        console.log(error.response);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: error.response.data.error.message,
          text2: error.response.data.error.name,
        });
      }
    }
  };
  if (getcondition) {
    return (
      <Loader visible={getcondition} color="white" indicatorSize="large" />
    );
  }
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
            <Pressable
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
                navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={20} color={colors.white} />
            </Pressable>

            <MyText
              style={{
                fontSize: 30,
                alignSelf: "center",
                color: colors.text,
                fontWeight: "bold",
              }}
            >
              Create an Account
            </MyText>
            <View style={{ marginTop: 30 }}>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(name) => setname(name)}
                  placeholder="Name"
                  placeholderTextColor="#ACA9A9"
                  underlineColorAndroid="#f000"
                />
              </View>
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
                    paddingTop: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name={rightIcon}
                    size={22}
                    color="#ACA9A9"
                  />
                </Pressable>
              </View>
              <View style={styles.SectionStyle}>
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  style={{
                    width: "20%",
                    height: 47,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    backgroundColor: "#EEEEEE",
                    padding: 10,
                  }}
                >
                  {getcode ? (
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {countryCode}
                    </Text>
                  ) : (
                    <AntDesign
                      name="caretdown"
                      size={20}
                      color={colors.iconGray}
                      onPress={() => {
                        setcode(true);
                      }}
                    />
                  )}
                </TouchableOpacity>
                <CountryPicker
                  show={show}
                  // when picker button press you will get the country object with dial code
                  pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setShow(false);
                  }}
                />
                <TextInput
                  style={[
                    styles.inputStyle,
                    { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                  ]}
                  onChangeText={(Phonenumber) =>
                    setPhonenumber(countryCode + Phonenumber)
                  }
                  placeholder="Phone Number" //12345
                  placeholderTextColor="#ACA9A9"
                  // keyboardType="number-pad"
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>

              <Pressable
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
                  // navigation.navigate("OtpScreen", {
                  //   email: email,
                  //   Phonenumber: Phonenumber,
                  //   password: password,
                  //   name: name,
                  //   role: role,
                  // });
                  //setPhonenumber(countryCode + Phonenumber);

                  signUp();
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

              <Pressable
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
              </Pressable>
              <Pressable
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
              </Pressable>
              <View
                style={{
                  justifyContent: "center",
                  marginTop: 20,
                  flexDirection: "row",
                }}
              >
                <MyText
                  style={{
                    fontSize: 13,
                    color: "#ACA9A9",
                  }}
                >
                  Already have an account?
                </MyText>
                <Pressable
                  onPress={() => {
                    navigation.navigate("LoginScreen");
                  }}
                >
                  <MyText
                    style={{
                      fontSize: 13,
                      color: colors.text,
                    }}
                  >
                    Login
                  </MyText>
                </Pressable>
              </View>
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

export default CreateAccount;
