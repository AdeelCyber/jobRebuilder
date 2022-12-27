import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
// import SignIn from "./Screens/SignIn";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import Context from "../root/Context/Context";
import PinkButton from "./Components/PinkButton";
import SignIn from "./Screens/SignIn";
import Signup from "./Screens/Signup";
import Offset from "./GlobalStyles/Offset";

//screens
import Home from "./Screens/campaignHomeScreen/Home";
import SettingScreen from "./Screens/Profile/Settings/SettingScreen";
import ProfileScreen from "./Screens/Profile/ProfileScreen";
import JobRequestScreen from "./Screens/Profile/JobRequestScreen";
import PaymentMethodScreen from "./Screens/Profile/PaymentMethodScreen";
import ChangeEmailScreen from "./Screens/Profile/Settings/ChangeEmailScreen";
import ChangePhoneNumberScreen from "./Screens/Profile/Settings/ChangePhoneNumberScreen";
import ChangePasswordScreen from "./Screens/Profile/Settings/ChangePasswordScreen";
import DeleteAccountScreen from "./Screens/Profile/Settings/DeleteAccountScreen";
import FinancialReportScreen from "./Screens/Profile/FinancialReport/FinancialReportScreen";
import AddFinancialScreen from "./Screens/Profile/FinancialReport/AddFinancialScreen";
//screens out

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
Home;
import PinkAback from "./Components/PinkAback";
import CampaignMenu from "./Screens/campaignHomeScreen/CampaignMenu";

//Navigation out

// Creating Stacks
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// All stack Pages goes here
const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CampaignMenu"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CampaignMenu" component={CampaignMenu} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="JobRequests" component={JobRequestScreen} />
      <Stack.Screen name="FinancialReport" component={FinancialReportScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
      <Stack.Screen name="AddFinancialDetail" component={AddFinancialScreen} />

      <Stack.Screen
        name="ChangePhoneNumber"
        component={ChangePhoneNumberScreen}
      />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    </Stack.Navigator>
  );
};

// All bottom tabs pages goes here
const MyBottomTabs = () => {
  return <Tab.Navigator></Tab.Navigator>;
};

const Main = () => {
  const {
    theme: { colors },
  } = useContext(Context);
  return (
    <SafeAreaView
      style={[
        Offset.AndroidSafeArea,
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar style="auto" />
      {/* <SignIn /> */}
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:1,
    // backgroundColor: "#fff",

    // alignItems: "center",
    // justifyContent: "center",
  },
});
