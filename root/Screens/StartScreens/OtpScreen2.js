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

const OtpScreen2 = ({ route }) => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const { email, Phonenumber, password, name, role } =
    route.params != undefined ? route.params : {};
  const { accessToken } = useContext(CartProvider);

  const phoneverify = async (channel) => {
    try {
      const res = await sendOTP(Phonenumber, channel);

      if (res.status == 200) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "OTP Successfully sent to you phone",
          text2: ".",
        });
      }
    } catch (err) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: ".",
      });
    }
  };
  const verifyotp = async (code) => {
    try {
      const res = await verifyOTP(Phonenumber, code);

      if (res.status == 200) {
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
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: ".",
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
                fontSize: 24,
                alignSelf: "center",
                color: colors.text,
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              Verify you email
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
              Send otp to mail
            </MyText>
            <View style={{ marginTop: 30 }}>
              <Pressable
                onPress={() => {
                  phoneverify("sms");
                }}
              >
                <MyText
                  style={{
                    fontSize: 14,
                    alignSelf: "center",
                    color: colors.text,
                    fontWeight: "400",
                    marginTop: 20,
                  }}
                >
                  Click here to send otp to you email
                </MyText>
              </Pressable>
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
