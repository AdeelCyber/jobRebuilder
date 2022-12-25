import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
// import SignIn from "./Screens/SignIn";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import Context from "../root/Context/Context";
import PinkButton from "./Components/PinkButton";
import SignIn from "./Screens/SignIn";
import Signup from "./Screens/Signup";
import Offset from "./GlobalStyles/Offset";

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
//Navigation out

// Creating Stacks
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// All stack Pages goes here
const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={Signup} />
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
    backgroundColor: "#fff",

    // alignItems: "center",
    // justifyContent: "center",
  },
});
