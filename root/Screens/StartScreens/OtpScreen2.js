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

import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import axios from "axios";
import CartProvider from "../../Context/CartProvider";
import { sendOTP, verifyOTP } from "../Profile/services/otpservice";
import { createaccount } from "../Profile/services/authenticationServices";
import Loader from "../../Components/Loader";
const OtpScreen2 = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const { email, Phonenumber, password, name, role } =
    route.params != undefined ? route.params : {};
  const { accessToken } = useContext(CartProvider);
  const [otp, setotp] = useState();
  const [getverify, setverify] = useState(false);
  const [getcondition, setcondition] = useState(false);

  const phoneverify = async (channel) => {
    console.log("jkh");
    console.log(Phonenumber);
    setcondition(true);
    try {
      const res = await sendOTP(Phonenumber, channel);
      console.log(res.data);

      if (res.status == 200) {
        setverify(true);
        setcondition(false);
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "OTP Successfully sent to you phone",
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
    setcondition(true);
    try {
      const res = await verifyOTP(Phonenumber, code);
      console.log(res.status);

      if (res.status == 200) {
        setcondition(false);
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Successfull",
          text2: ".",
        });
        //navigation.navigate("OtpScreen2");
        try {
          const response = await createaccount(
            email,
            password,
            Phonenumber,
            name,
            role
          );
          if (response.status == 201) {
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

          console.log(error.response.data);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: error.response.data.error.message,
            text2: error.response.data.error.name,
          });
        }
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
                fontSize: 24,
                alignSelf: "center",
                color: colors.text,
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              Verify your Phone number
            </MyText>
            <MyText
              style={{
                fontSize: 14,
                alignSelf: "center",
                color: colors.text,
                fontWeight: "400",
                marginTop: 20,
              }}
            >
              Send otp to number
            </MyText>
            <View style={{ marginTop: 30 }}>
              {getverify ? (
                <MyText
                  style={{
                    fontSize: 14,
                    alignSelf: "center",
                    color: colors.text,
                    fontWeight: "400",
                    marginTop: 20,
                  }}
                >
                  We have sent the code verification on your number
                  {Phonenumber}
                </MyText>
              ) : (
                <MyText
                  style={{
                    fontSize: 14,
                    alignSelf: "center",
                    color: colors.text,
                    fontWeight: "400",
                    marginTop: 20,
                  }}
                >
                  Get OTP on your number {Phonenumber}
                </MyText>
              )}
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
              {getverify ? (
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
                </Pressable>
              ) : (
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
                    phoneverify("sms");
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
                </Pressable>
              )}
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
    height: 57,
    marginTop: 14,
    marginBottom: 5,
  },
});

export default OtpScreen2;
