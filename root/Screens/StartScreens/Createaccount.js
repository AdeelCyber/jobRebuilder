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
} from "react-native";

import Context from "../../Context/Context";
import MyText from "../../Components/Text";

import Icon from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTogglePasswordVisibility } from "../../Components/useTogglePasswordVisibility";
import { createaccount } from "../Profile/services/authenticationServices";
import Toast from "react-native-toast-message";

const CreateAccount = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const { role } = route.params != undefined ? route.params : {};
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const signUp = async () => {
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
      navigation.navigate("OtpScreen", {
        email: email,
        Phonenumber: Phonenumber,
        password: password,
        name: name,
        role: role,
      });
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
            <Pressable
              style={{
                backgroundColor: colors.Bluish,
                width: 40,
                height: 40,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
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
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(Phonenumber) => setPhonenumber(Phonenumber)}
                  placeholder="Phone Number" //12345
                  placeholderTextColor="#ACA9A9"
                  keyboardType="number-pad"
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
                  navigation.navigate("LoginScreen");
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
                  navigation.navigate("LoginScreen");
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
