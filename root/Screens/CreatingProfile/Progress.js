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
  ActivityIndicator,
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
import Toast from "react-native-toast-message";
import { setProfile } from "../Profile/services/ProfileServices";
import { useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import CartContext from "../../Context/CartProvider";

const Progress = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const { accessToken } = useContext(CartProvider);
  const [getcondition, setcondition] = useState(false);
  const contest = useContext(CartContext)
  // const [getdisable, setdisable] = useState(true);
  const progressStepsStyle = {
    activeStepIconBorderColor: colors.Bluish,
    activeLabelColor: colors.text,
    activeStepNumColor: colors.text,
    activeStepIconColor: colors.white,
    completedStepIconColor: colors.Bluish,
    completedProgressBarColor: colors.Bluish,
    completedCheckColor: colors.white,
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    //alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    marginRight: 233,
  };
  async function deleteTempStorage() {
    await AsyncStorage.removeItem("@name");
    await AsyncStorage.removeItem("@email");
    await AsyncStorage.removeItem("@gender");
    await AsyncStorage.removeItem("@country");
    await AsyncStorage.removeItem("@city");
    await AsyncStorage.removeItem("@language");
    await AsyncStorage.removeItem("@skills");
    await AsyncStorage.removeItem("@image");
    await AsyncStorage.removeItem("@description");
    await AsyncStorage.removeItem("@workPreference");
    await AsyncStorage.removeItem("@availibilityPerWeek");
    await AsyncStorage.removeItem("@jobTitle");
    await AsyncStorage.removeItem("@hourlyRate");
    await AsyncStorage.removeItem("@isComplete");

  }
  const retrieveData = async () => {
    try {
      setcondition(true);
      const res = await setProfile(accessToken);
      if (res.status == 201) {
        setcondition(false);
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Created successfully",
        });
        // delete all the data from async storage
        deleteTempStorage()


        navigation.navigate("HomeService");
      } else {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Please fill out the details",
        });
        navigation.navigate("ProgressScreen");
      }
      console.log(res.data);
    } catch (err) {
      setcondition(false);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please fill out the details",
      });
    }
  };
  const [activeStep, setActiveStep] = useState(0);
  async function getActiveStep() {
    const name = await AsyncStorage.getItem('@name')
    const email = await AsyncStorage.getItem('@email')
    const gender = await AsyncStorage.getItem('@gender')
    const country = await AsyncStorage.getItem('@country')
    const city = await AsyncStorage.getItem('@city')
    const language = await AsyncStorage.getItem('@language')
    const skill = await AsyncStorage.getItem('@skills')
    const workPreference = await AsyncStorage.getItem('@workPreference')
    const availibilityPerWeek = await AsyncStorage.getItem(
        '@availibilityPerWeek'
    )
    const jobTitle = await AsyncStorage.getItem('@jobTitle')
    const hourlyRate = await AsyncStorage.getItem('@hourlyRate')
    const description = await AsyncStorage.getItem('@description')
    const image = await AsyncStorage.getItem('@image')
    const skills = JSON.parse(skill)
    let step = 0;
    if (
        name !== null &&
        email !== null &&
        gender !== null &&
        country !== null &&
        city !== null &&
        language !== null)
    {
      step = 1;
    }
    if(
        skills !== null &&
        workPreference !== null &&
        availibilityPerWeek !== null &&
        jobTitle !== null &&
        hourlyRate !== null &&
        description !== null
    )
    {

      step = 2;
    }
    else if(image !== null)
    {

      await AsyncStorage.setItem('@isComplete',"true")
      contest.setComplete("true")
    }

    setActiveStep(step);
  }
    useEffect(() => {
        getActiveStep();
    }, []);
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader7 nav={navigation} />
      <View style={{ flex: 1 }}>
        <ProgressSteps activeStep={activeStep} {...progressStepsStyle}>
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
