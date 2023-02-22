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

const Progress = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  const navigation = useNavigation();
  const { accessToken } = useContext(CartProvider);
  const [getcondition, setcondition] = useState(false);

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
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    //alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 203,
  };
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

        navigation.navigate("HomeService");
      }
      console.log(res.data);
    } catch (err) {
      setcondition(false);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
      });
    }
  };
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
