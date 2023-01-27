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
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import PersonalInfo from "./PersonalInfo";
import { useNavigation } from "@react-navigation/native";
import Skills from "./Skills";
import ProfilePic from "./ProfilePic";
import CustomHeader7 from "../../Components/CustomHeader7";
import CartProvider from "../../Context/CartProvider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Progress = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const { accessToken } = useContext(CartProvider);

  const progressStepsStyle = {
    activeStepIconBorderColor: colors.Bluish,
    activeLabelColor: colors.text,
    activeStepNumColor: colors.text,
    activeStepIconColor: colors.white,
    completedStepIconColor: colors.Bluish,
    completedProgressBarColor: colors.Bluish,
    completedCheckColor: colors.white,
    labelFontSize: 9,
  };

  const buttonTextStyle = {
    color: colors.white,
    fontSize: 14,
  };

  const buttonStyle = {
    backgroundColor: colors.Bluish,
    width: "111%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginRight: 233,
  };
  const retrieveData = async () => {
    console.log("hi");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${accessToken}`,
      },
    };
    try {
      const name = await AsyncStorage.getItem("@name");
      const email = await AsyncStorage.getItem("@email");
      const gender = await AsyncStorage.getItem("@gender");
      const country = await AsyncStorage.getItem("@country");
      const city = await AsyncStorage.getItem("@city");
      const language = await AsyncStorage.getItem("@language");
      const skill = await AsyncStorage.getItem("@skills");
      const workPreference = await AsyncStorage.getItem("@workPreference");
      const availibilityPerWeek = await AsyncStorage.getItem(
        "@availibilityPerWeek"
      );
      const jobTitle = await AsyncStorage.getItem("@jobTitle");
      const hourlyRate = await AsyncStorage.getItem("@hourlyRate");
      const description = await AsyncStorage.getItem("@description");
      const image = await AsyncStorage.getItem("@image");
      const skills = JSON.parse(skill);
      console.log(skills);

      if (
        name !== null &&
        email !== null &&
        gender !== null &&
        country !== null &&
        city !== null &&
        language !== null &&
        skills !== null &&
        workPreference !== null &&
        availibilityPerWeek !== null &&
        jobTitle !== null &&
        hourlyRate !== null &&
        description !== null &&
        image !== null
      ) {
        // We have data!!

        axios
          .post(
            "https://stepdev.up.railway.app/freelancer/onboarding",
            {
              gender: gender,
              country: country,
              city: city,
              language: language,
              skills: skills,
              workPreference: workPreference,
              availibilityPerWeek: availibilityPerWeek,
              jobTitle: jobTitle,
              hourlyRate: hourlyRate,
              description: description,
              image: image,
            },
            config
          )
          .then((res) => {
            console.log(res.data);
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Created successfully",
            });
          })
          .catch((err) => {
            console.log("error", err);
          });
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader7 />
      <View style={{ flex: 1 }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Personal Info"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            nextBtnText="Proceed"
            previousBtnDisabled={true}
          >
            <PersonalInfo />
          </ProgressStep>
          <ProgressStep
            label="Skills"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            nextBtnText="Proceed"
            previousBtnDisabled={true}
          >
            <Skills />
          </ProgressStep>
          <ProgressStep
            label="Profile Picture"
            nextBtnStyle={buttonStyle}
            nextBtnTextStyle={buttonTextStyle}
            nextBtnText="Finalize"
            previousBtnDisabled={true}
            onSubmit={retrieveData}
          >
            <ProfilePic />
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
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

export default Progress;
