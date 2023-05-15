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

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import Loader from "../../Components/Loader";
import { sendOTP, verifyOTP } from "../Profile/services/otpservice";
import Toast from "react-native-toast-message";
import { useTogglePasswordVisibility } from "../../Components/useTogglePasswordVisibility";
import { changePass } from "../Profile/services/authenticationServices";
const Forget = ({ route }) => {
  const isFocused = useIsFocused();
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const [email, setemail] = useState();
  const [otp, setotp] = useState();
  const [getcheck, setcheck] = useState(true);
  const [getcheck2, setcheck2] = useState(false);
  const [getcheck3, setcheck3] = useState(false);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [match, setMatch] = useState(false);
  const [getcondition, setcondition] = useState(false);

  const handlePasswordChange = (value) => {
    setpassword(value);
    setMatch(value === password2);
  };

  const handleConfirmPasswordChange = (value) => {
    setpassword2(value);
    setMatch(value === password);
  };

  const handlePress = () => {
    if (match) {
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Passwords match!",
        text2: ".",
      });
    } else {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Passwords do not match!",
        text2: ".",
      });
    }
  };

  const emailverify = async (channel) => {
    try {
      setcondition(true);
      const res = await sendOTP(email, channel);

      if (res.status == 200) {
        setcheck(false);
        setcheck2(true);
        setcondition(false);

        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "OTP Successfully sent to you email",
          text2: ".",
        });
      }
    } catch (err) {
      setcondition(false);

      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: ".",
      });
    }
  };
  const verifyotp = async (code) => {
    console.log("hh");
    // setcheck2(false);
    // setcheck3(true);
    try {
      setcondition(true);

      const res = await verifyOTP(email, code);
      console.log(res.status);

      if (res.status == 200) {
        setcheck2(false);
        setcheck3(true);
        setcondition(false);
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Successfull",
          text2: ".",
        });
        //navigation.navigate("OtpScreen2");
      }
    } catch (err) {
      setcondition(false);

      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: ".",
      });
    }
  };
  const change = async () => {
    try {
      setcondition(true);
      const res = await changePass(email, password, password2);

      if (res.status == 200) {
        setcondition(false);

        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "OTP Successfully sent to you email",
          text2: ".",
        });
        navigation.navigate("LoginScreen");
      }
    } catch (err) {
      setcondition(false);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: ".",
      });
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
                navigation.navigate("LoginScreen");
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
              Forget Password
            </MyText>
            {getcheck && (
              <View>
                <MyText
                  style={{
                    fontSize: 14,
                    alignSelf: "center",
                    color: colors.text,
                    fontWeight: "400",
                    marginTop: 20,
                  }}
                >
                  Enter email to get verification code
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
                      emailverify("email");
                    }}
                  >
                    <MyText
                      style={{
                        color: colors.white,
                        fontSize: 16,
                      }}
                    >
                      Get OTP
                    </MyText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {getcheck2 && (
              <View>
                <MyText
                  style={{
                    fontSize: 14,
                    alignSelf: "center",
                    color: colors.text,
                    fontWeight: "400",
                    marginTop: 20,
                  }}
                >
                  We have sent the code verification on your email{"\n"}
                  {email}
                </MyText>

                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(otp) => setotp(otp)}
                    placeholder="Enter your otp" //12345
                    placeholderTextColor="#ACA9A9"
                    keyboardType="number-pad"
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
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
                    verifyotp(otp);
                  }}
                >
                  <MyText
                    style={{
                      color: colors.white,
                      fontSize: 16,
                    }}
                  >
                    Verify
                  </MyText>
                </TouchableOpacity>
              </View>
            )}
            {getcheck3 && (
              <View>
                <MyText
                  style={{
                    fontSize: 14,
                    alignSelf: "center",
                    color: colors.text,
                    fontWeight: "400",
                    marginTop: 20,
                  }}
                >
                  Change your password
                </MyText>

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
                    onChangeText={(password) => handlePasswordChange(password)}
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
                    style={[
                      styles.inputStyle,
                      { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                    ]}
                    onChangeText={(password2) =>
                      handleConfirmPasswordChange(password2)
                    }
                    value={password2}
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
                    handlePress();
                    change();
                  }}
                >
                  <MyText
                    style={{
                      color: colors.white,
                      fontSize: 16,
                    }}
                  >
                    Change
                  </MyText>
                </TouchableOpacity>
              </View>
            )}
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

export default Forget;
