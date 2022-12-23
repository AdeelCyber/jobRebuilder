import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
// import SignIn from "./Screens/SignIn";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import Context from "../root/Context/Context";
import PinkButton from "./Components/PinkButton";
import SignIn from "./Screens/SignIn";
import Signup from "./Screens/Signup";
import Offset from "./Offset";

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
      {/* <StatusBar /> */}
      {/* <SignIn /> */}
      <View>
        {/* <SignIn /> */}
        <Signup />
      </View>
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
